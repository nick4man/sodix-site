
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from '@/i18n.config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string {
  try {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales
    
    // Проверяем, есть ли заголовок Accept-Language
    if (!negotiatorHeaders['accept-language']) {
      return i18n.defaultLocale
    }

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    
    // Фильтруем только поддерживаемые языки
    const validLanguages = languages.filter(lang => {
      try {
        return locales.includes(lang) || locales.includes(lang.split('-')[0])
      } catch {
        return false
      }
    })

    if (validLanguages.length === 0) {
      return i18n.defaultLocale
    }

    const locale = matchLocale(validLanguages, locales, i18n.defaultLocale)
    return locale
  } catch (error) {
    console.warn('Error in getLocale:', error)
    return i18n.defaultLocale
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
