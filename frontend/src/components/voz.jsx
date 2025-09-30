import React, { useState, useEffect } from 'react'
import annyang from 'annyang'
import { useNavigate } from 'react-router-dom'

export default function Voz() {
  const [active, setActive] = useState(false)
  const navigate = useNavigate()

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'es-MX'
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (annyang) {
      const commands = {
        'inicio': () => {
          speak('Dirigiendo a inicio ')
          setTimeout(() => navigate('/'), 200)
        },
        'calculadora': () => {
          speak('Dirigiendo a calculadora') 
          setTimeout(() => navigate('/analytics'), 200)
        },
        'entrenamiento': () => {
          speak('Dirigiendo a entrenamiento')
          setTimeout(() => navigate('/ml-training'), 200)
        },
        'recolección': () => {
          speak('Dirigiendo a recolección de datos')
          setTimeout(() => navigate('/data-collection'), 200)
        },
        'predicción': () => {
          speak('Dirigiendo a predicción')
          setTimeout(() => navigate('/prediction'), 200)
        }
      }

      annyang.addCommands(commands)
      annyang.setLanguage('es-MX')
      annyang.debug(true)
    }
  }, [navigate])

  const toggleVoice = () => {
    if (!active) {
      annyang.start()
      setActive(true)
      document.body.classList.add('voz-activa')
      speak('Bienvenido al modo voz')
    } else {
      speak('Has salido del modo voz')
      annyang.abort()
      setActive(false)
      document.body.classList.remove('voz-activa')
    }
  }

  return (
    <div style={{ margin: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Toggle switch estilizado */}
        <label
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '60px',
            height: '34px',
            cursor: 'pointer'
          }}
        >
          <input
            type="checkbox"
            checked={active}
            onChange={toggleVoice}
            style={{ display: 'none' }}
          />
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: active ? '#4CAF50' : '#ccc',
              transition: '0.4s',
              borderRadius: '34px'
            }}
          ></span>
          <span
            style={{
              position: 'absolute',
              content: '""',
              height: '26px',
              width: '26px',
              left: active ? '30px' : '4px',
              bottom: '4px',
              backgroundColor: 'white',
              transition: '0.4s',
              borderRadius: '50%'
            }}
          ></span>
        </label>

        {/* Texto al lado del toggle */}
        <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
          Modo voz
        </span>
      </div>

      {/* Leyenda cuando está activo */}
      {active && (
        <div
          style={{
            fontSize: '12px',
            color: '#555',
            backgroundColor: '#e0f0ff',
            padding: '8px 12px',
            borderRadius: '6px',
            maxWidth: '300px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Para navegar entre pestañas usa estas palabras “inicio”, “predicción”, “calculadora”, “entrenamiento” o“recolección”.
        </div>
      )}
    </div>
  )
}