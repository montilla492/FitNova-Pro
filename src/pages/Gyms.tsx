import { motion } from 'motion/react';
import { MapPin, Star, Navigation, Filter, Search, ChevronRight, Info, Clock, Phone, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Gyms() {
  const [selectedGym, setSelectedGym] = useState<any>(null);

  const gyms = [
    {
      id: 1,
      name: 'FitNova Elite Center',
      type: 'Premium Gym',
      rating: 4.9,
      distance: '0.8 km',
      address: 'Av. de la Constitución, 45',
      status: 'Abierto',
      closingTime: '23:00',
      image: 'https://picsum.photos/seed/gym1/800/600',
      features: ['Piscina', 'Sauna', 'Crossfit', 'Parking'],
      coords: { x: 30, y: 40 }
    },
    {
      id: 2,
      name: 'Iron Temple Box',
      type: 'Crossfit & Powerlifting',
      rating: 4.7,
      distance: '1.2 km',
      address: 'Calle del Deporte, 12',
      status: 'Abierto',
      closingTime: '22:00',
      image: 'https://picsum.photos/seed/gym2/800/600',
      features: ['Halterofilia', 'Open Box', 'Nutrición'],
      coords: { x: 60, y: 25 }
    },
    {
      id: 3,
      name: 'Zenith Yoga Studio',
      type: 'Wellness & Yoga',
      rating: 4.8,
      distance: '2.5 km',
      address: 'Paseo de la Castellana, 102',
      status: 'Cerrado',
      closingTime: '21:00',
      image: 'https://picsum.photos/seed/gym3/800/600',
      features: ['Yoga', 'Pilates', 'Meditación'],
      coords: { x: 45, y: 70 }
    }
  ];

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-background overflow-hidden">
      {/* Sidebar List */}
      <aside className="w-96 bg-surface-container-low border-r border-white/5 flex flex-col z-20 shadow-2xl">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-xl font-bold uppercase tracking-tight">Gimnasios Cercanos</h2>
            <button className="p-2 bg-surface-container-high rounded-lg text-zinc-400 hover:text-primary-container transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o zona..." 
              className="w-full bg-surface-container-high border-none rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary-container"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
          {gyms.map((gym) => (
            <motion.div
              key={gym.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedGym(gym)}
              className={cn(
                "p-4 rounded-xl cursor-pointer transition-all border border-transparent",
                selectedGym?.id === gym.id 
                  ? "bg-surface-container-highest border-primary-container/30 shadow-lg" 
                  : "bg-surface-container-high hover:bg-surface-container-highest"
              )}
            >
              <div className="flex gap-4">
                <img 
                  src={gym.image} 
                  className="w-20 h-20 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" 
                  alt={gym.name}
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-white leading-tight mb-1">{gym.name}</h3>
                    <div className="flex items-center gap-1 text-tertiary">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-[10px] font-bold">{gym.rating}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-medium uppercase mb-2">{gym.type}</p>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                    <MapPin className="w-3 h-3" />
                    <span>{gym.distance} • {gym.address}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </aside>

      {/* Map Area */}
      <main className="flex-1 relative bg-[#1a1a1a] overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000">
            <path d="M0,100 L1000,100 M0,200 L1000,200 M0,300 L1000,300 M0,400 L1000,400 M0,500 L1000,500 M0,600 L1000,600 M0,700 L1000,700 M0,800 L1000,800 M0,900 L1000,900" stroke="#444" strokeWidth="0.5" />
            <path d="M100,0 L100,1000 M200,0 L200,1000 M300,0 L300,1000 M400,0 L400,1000 M500,0 L500,1000 M600,0 L600,1000 M700,0 L700,1000 M800,0 L800,1000 M900,0 L900,1000" stroke="#444" strokeWidth="0.5" />
            <path d="M100,100 L400,400 L800,200 L900,600 L500,800 L100,700 Z" fill="none" stroke="#daf900" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* Map Pins */}
        {gyms.map((gym) => (
          <motion.button
            key={gym.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setSelectedGym(gym)}
            style={{ left: `${gym.coords.x}%`, top: `${gym.coords.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
          >
            <div className={cn(
              "p-2 rounded-full transition-all shadow-xl",
              selectedGym?.id === gym.id ? "bg-primary-container text-black scale-125" : "bg-surface-container-highest text-primary-container"
            )}>
              <MapPin className="w-6 h-6 fill-current" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {gym.name}
            </div>
          </motion.button>
        ))}

        {/* Floating Controls */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          <button className="p-3 bg-surface-container-high/80 backdrop-blur rounded-xl text-white hover:bg-primary-container hover:text-black transition-all shadow-lg">
            <Navigation className="w-5 h-5" />
          </button>
          <div className="flex flex-col bg-surface-container-high/80 backdrop-blur rounded-xl overflow-hidden shadow-lg">
            <button className="p-3 text-white hover:bg-white/10 transition-colors border-b border-white/5 font-bold">+</button>
            <button className="p-3 text-white hover:bg-white/10 transition-colors font-bold">-</button>
          </div>
        </div>

        {/* Detail Card Overlay */}
        {selectedGym && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-surface-container-low/95 backdrop-blur-xl rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex gap-8 z-30"
          >
            <button 
              onClick={() => setSelectedGym(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              ✕
            </button>
            <div className="w-1/3">
              <img 
                src={selectedGym.image} 
                className="w-full aspect-square rounded-xl object-cover" 
                alt={selectedGym.name}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-headline text-2xl font-black uppercase italic tracking-tighter text-white">{selectedGym.name}</h3>
                  <p className="text-primary-container text-xs font-bold uppercase tracking-widest">{selectedGym.type}</p>
                </div>
                <div className="flex items-center gap-1 bg-tertiary/10 text-tertiary px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{selectedGym.rating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 my-4">
                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                  <Clock className="w-4 h-4" />
                  <span>{selectedGym.status} • Cierra {selectedGym.closingTime}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedGym.distance} de ti</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedGym.features.map((f: string) => (
                  <span key={f} className="bg-white/5 px-2 py-1 rounded text-[10px] font-medium text-zinc-300 uppercase tracking-tighter border border-white/5">{f}</span>
                ))}
              </div>

              <div className="mt-auto flex gap-3">
                <button className="flex-1 bg-primary-container text-black py-3 rounded-xl font-bold text-sm uppercase flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                  <Navigation className="w-4 h-4" /> Cómo llegar
                </button>
                <div className="flex gap-2">
                  <button className="p-3 bg-surface-container-highest rounded-xl text-white hover:bg-white/10 transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-surface-container-highest rounded-xl text-white hover:bg-white/10 transition-colors">
                    <Globe className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
