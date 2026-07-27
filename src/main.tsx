import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { NotFound } from './pages/NotFound'
import './styles/tokens.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:projectId" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  </StrictMode>,
)
