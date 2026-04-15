import { Bell, Settings, Search } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useLocation } from 'react-router-dom';

export default function TopBar() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/rutinas') return 'Gestión de Rutinas';
    if (path === '/progreso') return 'Resumen de Rendimiento';
    if (path === '/gimnasios') return 'Cerca de ti';
    if (path === '/comunidad') return 'Comunidad';
    if (path === '/objetivos') return 'Gestión de Metas';
    if (path === '/coach') return 'Asistente de IA Avanzado';
    return 'Dashboard';
  };

  return (
    <header className="fixed top-0 right-0 z-50 w-[calc(100%-16rem)] bg-[#0e0e0e]/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex justify-between items-center px-8 h-20">
      <div className="flex items-center gap-6">
        <span className="font-headline uppercase tracking-widest text-sm text-primary-container font-bold">
          {getTitle()}
        </span>
        {location.pathname === '/gimnasios' && (
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="BUSCAR GIMNASIO..." 
              className="bg-surface-container-high border-none rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:ring-1 focus:ring-primary-container w-64 transition-all"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="text-zinc-500 hover:text-primary transition-colors active:scale-95">
            <Bell className="w-5 h-5" />
          </button>
          <button 
            onClick={signOut}
            className="text-zinc-500 hover:text-primary transition-colors active:scale-95"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <img 
          src={user?.photoURL || "https://picsum.photos/seed/avatar/100/100"} 
          className="w-10 h-10 rounded-full border-2 border-primary-container/20 object-cover" 
          alt="User avatar"
          referrerPolicy="no-referrer"
        />
      </div>
    </header>
  );
}
