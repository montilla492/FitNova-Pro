import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { 
  LayoutGrid as GridIcon, 
  Dumbbell, 
  LineChart, 
  MapPin, 
  Users, 
  Trophy, 
  Headset 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const { user } = useAuth();

  const navItems = [
    { to: '/', icon: GridIcon, label: 'Inicio' },
    { to: '/rutinas', icon: Dumbbell, label: 'Rutinas' },
    { to: '/progreso', icon: LineChart, label: 'Progreso' },
    { to: '/gimnasios', icon: MapPin, label: 'Gimnasios' },
    { to: '/comunidad', icon: Users, label: 'Comunidad' },
    { to: '/objetivos', icon: Trophy, label: 'Objetivos' },
    { to: '/coach', icon: Headset, label: 'Coach' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 z-[60] bg-[#131313] border-r border-white/5 flex flex-col py-10 px-4">
      <div className="font-headline text-3xl font-black text-primary-container mb-12">FitNova Pro</div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
              isActive 
                ? "bg-primary-container text-black font-bold shadow-[0_0_20px_rgba(218,249,0,0.3)]" 
                : "text-zinc-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <img 
            src={user?.photoURL || "https://picsum.photos/seed/user/100/100"} 
            className="w-10 h-10 rounded-full object-cover" 
            alt="User avatar"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="text-sm font-bold text-white">{user?.displayName || 'FitNova Pro'}</p>
            <p className="text-xs text-zinc-500">Estado: Activo</p>
          </div>
        </div>
        <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-primary-container rounded-xl font-bold transition-all text-sm border border-primary-container/20">
          Entrenar Ahora
        </button>
      </div>
    </aside>
  );
}
