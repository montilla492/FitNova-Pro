import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthGuard } from './AuthContext';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Routines from './pages/Routines';
import Progress from './pages/Progress';
import Gyms from './pages/Gyms';
import Community from './pages/Community';
import Goals from './pages/Goals';
import Coach from './pages/Coach';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthGuard>
          <div className="flex min-h-screen bg-background text-on-surface font-body">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <TopBar />
              <main className="flex-1 ml-64 pt-20">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/rutinas" element={<Routines />} />
                  <Route path="/progreso" element={<Progress />} />
                  <Route path="/gimnasios" element={<Gyms />} />
                  <Route path="/comunidad" element={<Community />} />
                  <Route path="/objetivos" element={<Goals />} />
                  <Route path="/coach" element={<Coach />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        </AuthGuard>
      </Router>
    </AuthProvider>
  );
}
