import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import DataCollection from './pages/DataCollection'
import MLTraining from './pages/MLTraining'
import Prediction from './pages/Prediction'
import PredictionInterface from './pages/PredictionInterface'
import Analytics from './pages/CalculadoraGestos'   // ✅ tu calculadora

import PrivateRoute from './components/PrivateRoute'
import Voz from './components/voz'   // ✅ Botón de voz

import './index.css'

function App() {
  return (
    <Router>
      <div className="app">
        {/* 🎤 Botón de control de voz */}
        <Voz />

        <Routes>
          {/* 🟢 Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/prediction" element={<Prediction />} />   
          <Route path="/prediction/:model" element={<PredictionInterface />} />

          {/* 🔒 Rutas protegidas */}
          <Route
            path="/data-collection"
            element={
              <PrivateRoute>
                <DataCollection />
              </PrivateRoute>
            }
          />
          <Route
            path="/ml-training"
            element={
              <PrivateRoute>
                <MLTraining />
              </PrivateRoute>
            }
          />

          {/* ✅ Ruta calculadora corregida */}
          <Route path="/analytics" element={<Analytics />} />
          
          {/* ❌ Ruta catch-all para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
