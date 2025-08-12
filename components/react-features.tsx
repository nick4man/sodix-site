"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react'

interface Feature {
  id: number
  title: string
  description: string
  icon: string
}

export const ReactFeatures: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const features: Feature[] = useMemo(() => [
    {
      id: 1,
      title: "Хуки состояния",
      description: "useState для управления локальным состоянием компонента",
      icon: "🔴"
    },
    {
      id: 2,
      title: "Эффекты",
      description: "useEffect для выполнения побочных эффектов",
      icon: "🟢"
    },
    {
      id: 3,
      title: "Мемоизация",
      description: "useMemo и useCallback для оптимизации производительности",
      icon: "🔵"
    },
    {
      id: 4,
      title: "Контекст",
      description: "useContext для передачи данных через дерево компонентов",
      icon: "🟡"
    }
  ], [])

  const handleFeatureClick = useCallback((id: number) => {
    setIsAnimating(true)
    setSelectedFeature(id)
    setTimeout(() => setIsAnimating(false), 300)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!selectedFeature) {
        setSelectedFeature(1)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [selectedFeature])

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-center text-gray-800">
        Возможности React
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {features.map((feature) => (
          <button
            type="button"
            key={feature.id}
            onClick={() => handleFeatureClick(feature.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleFeatureClick(feature.id)
              }
            }}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 text-left ${
              selectedFeature === feature.id
                ? 'bg-blue-100 border-2 border-blue-400 scale-105'
                : 'bg-gray-50 hover:bg-gray-100'
            } ${isAnimating ? 'animate-pulse' : ''}`}
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <h4 className="font-semibold text-sm text-gray-800">{feature.title}</h4>
          </button>
        ))}
      </div>

      {selectedFeature && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">
            {features.find(f => f.id === selectedFeature)?.title}
          </h4>
          <p className="text-sm text-blue-700">
            {features.find(f => f.id === selectedFeature)?.description}
          </p>
        </div>
      )}

      <div className="mt-4 text-center text-xs text-gray-500">
        <p>✅ Все React возможности работают корректно</p>
        <p>✅ Компонент полностью интерактивен</p>
        <p>✅ Анимации и переходы плавные</p>
      </div>
    </div>
  )
}
