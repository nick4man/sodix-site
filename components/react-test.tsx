"use client"

import React, { useState, useEffect } from 'react'

export const ReactTest: React.FC = () => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleIncrement = () => {
    setCount(prev => prev + 1)
  }

  const handleReset = () => {
    setCount(0)
  }

  return (
    <div className={`p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h3 className="text-xl font-bold mb-4">Тест React функциональности</h3>
      
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Счетчик: {count}</p>
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={handleIncrement}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition-colors"
            >
              Увеличить
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition-colors"
            >
              Сбросить
            </button>
          </div>
        </div>
        
        <div className="text-sm text-center">
          <p>✅ React хуки работают</p>
          <p>✅ Состояние обновляется</p>
          <p>✅ Компонент интерактивен</p>
        </div>
      </div>
    </div>
  )
}
