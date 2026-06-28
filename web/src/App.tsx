import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TopBar } from './components/TopBar'
import { Translate } from './pages/Translate'
import { History } from './pages/History'
import { Settings } from './pages/Settings'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full bg-[var(--color-bg)]">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/translate" replace />} />
            <Route path="/translate" element={<Translate />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
