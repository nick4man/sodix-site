# Руководство по React в проекте Содикс

## 🚀 React уже интегрирован!

Ваш проект уже полностью настроен для работы с React. Вот что у вас есть:

### ✅ Установленные зависимости
- `react: ^19.1.1` - основная библиотека React
- `react-dom: ^19.1.1` - React для веб-платформы
- `@types/react: ^19.1.10` - TypeScript типы для React
- `next: ^15.4.6` - Next.js фреймворк с поддержкой React

### 🏗️ Архитектура проекта
- **App Router** - современная система маршрутизации Next.js
- **TypeScript** - полная поддержка типизации
- **Tailwind CSS** - стилизация компонентов
- **Framer Motion** - анимации и переходы

### 📁 Структура компонентов
```
components/
├── react-test.tsx      # Тестовый компонент с хуками
├── react-features.tsx  # Демонстрация возможностей React
├── hero.tsx           # Главный баннер
├── services.tsx       # Услуги
├── about.tsx          # О компании
├── portfolio.tsx      # Портфолио
├── equipment.tsx      # Оборудование
├── contacts.tsx       # Контакты
└── ui/                # UI компоненты
    ├── button.tsx
    └── card.tsx
```

## 🎯 Как использовать React

### 1. Создание компонента
```tsx
"use client" // Для клиентских компонентов

import React, { useState, useEffect } from 'react'

export const MyComponent: React.FC = () => {
  const [state, setState] = useState('')
  
  useEffect(() => {
    // Побочные эффекты
  }, [])
  
  return <div>Мой компонент</div>
}
```

### 2. Хуки React
- **useState** - управление состоянием
- **useEffect** - побочные эффекты
- **useCallback** - мемоизация функций
- **useMemo** - мемоизация значений
- **useContext** - контекст приложения

### 3. Типизация TypeScript
```tsx
interface Props {
  title: string
  count?: number
}

export const TypedComponent: React.FC<Props> = ({ title, count = 0 }) => {
  return <div>{title}: {count}</div>
}
```

## 🔧 Доступные команды

```bash
# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Запуск продакшн версии
npm run start

# Проверка кода
npm run lint
```

## 🌐 Тестирование React

На главной странице добавлены два тестовых компонента:

1. **ReactTest** - простой счетчик с хуками
2. **ReactFeatures** - демонстрация различных возможностей React

Эти компоненты показывают, что:
- ✅ React хуки работают корректно
- ✅ Состояние обновляется
- ✅ Компоненты интерактивны
- ✅ Анимации плавные
- ✅ TypeScript типизация активна

## 📱 Адаптивность

Все компоненты используют Tailwind CSS для адаптивного дизайна:
- `md:` - планшеты и выше
- `lg:` - десктопы и выше
- `xl:` - большие экраны

## 🎨 Стилизация

- **Tailwind CSS** для утилитарных классов
- **CSS Modules** для компонентных стилей
- **Framer Motion** для анимаций
- **CSS Variables** для темизации

## 🚀 Готово к разработке!

Ваш проект полностью готов для создания современных React приложений. Все необходимые зависимости установлены, конфигурация настроена, и вы можете сразу начинать разработку!

## 📚 Полезные ссылки

- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
