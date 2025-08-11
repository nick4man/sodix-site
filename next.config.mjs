/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        i18n: {
            locales: ['en', 'ru'],
            defaultLocale: 'en'
        }
    }
};

export default nextConfig;