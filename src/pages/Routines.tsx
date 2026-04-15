import { motion } from 'motion/react';
import { PlusCircle, Zap, Dumbbell, Info, Play, RefreshCw, TrendingUp, Heart } from 'lucide-react';

export default function Routines() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 min-h-screen bg-surface-container-low"
    >
      <div className="grid grid-cols-12 gap-8">
        {/* Header Section */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="w-12 h-1 bg-primary-container"></span>
            <h2 className="font-headline text-5xl font-black text-on-surface uppercase italic tracking-tighter">Entrenamientos</h2>
          </div>
          <p className="text-on-surface-variant max-w-xl mb-8 leading-relaxed">
            Organiza tus bloques de fuerza y resistencia. Optimiza cada set con seguimiento en tiempo real y métricas avanzadas de recuperación.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4 flex justify-end items-start">
          <button className="bg-primary-container text-black px-6 py-4 rounded-xl font-headline font-bold text-sm uppercase flex items-center gap-3 shadow-[0_0_30px_rgba(218,249,0,0.2)] hover:shadow-[0_0_45px_rgba(218,249,0,0.4)] transition-all transform hover:-translate-y-1 active:scale-95">
            <PlusCircle className="w-5 h-5" />
            Crear Rutina Personalizada
          </button>
        </div>

        {/* Active Routines */}
        <div className="col-span-12">
          <h3 className="font-headline text-xl font-bold mb-6 flex items-center gap-2 uppercase tracking-tight">
            <span className="text-secondary">⚡</span> Rutinas Activas
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            {/* Routine Card 1 */}
            <div className="min-w-[320px] bg-surface-container-high p-6 rounded-xl relative overflow-hidden group cursor-pointer transition-all hover:bg-surface-container-highest border border-white/5">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Dumbbell className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-primary-container/10 text-primary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Fuerza</span>
                </div>
                <h4 className="font-headline text-2xl font-bold mb-1 uppercase">Hipertrofia A</h4>
                <p className="text-on-surface-variant text-xs mb-6">Pierna y Espalda • 65 min</p>
                <div className="flex -space-x-2">
                  {['L', 'M', 'V'].map((day, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-surface-container-high flex items-center justify-center text-[10px] font-bold ${day === 'V' ? 'bg-primary-container text-black' : 'bg-zinc-800 text-white'}`}>
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Routine Card 2 */}
            <div className="min-w-[320px] bg-surface-container-high p-6 rounded-xl relative overflow-hidden group cursor-pointer transition-all hover:bg-surface-container-highest border border-white/5">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-8xl">⚡</span>
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Resistencia</span>
                </div>
                <h4 className="font-headline text-2xl font-bold mb-1 uppercase">Cardio HIIT</h4>
                <p className="text-on-surface-variant text-xs mb-6">Cuerpo Completo • 35 min</p>
                <div className="flex -space-x-2">
                  {['M', 'J', 'S'].map((day, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-surface-container-high flex items-center justify-center text-[10px] font-bold ${day === 'J' ? 'bg-primary-container text-black' : 'bg-zinc-800 text-white'}`}>
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Add New */}
            <div className="min-w-[320px] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-6 hover:border-primary-container/50 transition-colors group cursor-pointer">
              <PlusCircle className="w-10 h-10 text-zinc-600 group-hover:text-primary-container transition-colors mb-2" />
              <p className="font-headline text-sm font-bold text-zinc-600 group-hover:text-primary-container transition-colors uppercase">Explorar Plantillas</p>
            </div>
          </div>
        </div>

        {/* Detailed Section */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          <div className="bg-surface-container-high rounded-xl p-6 border border-white/5">
            <h4 className="font-headline font-bold text-lg mb-6 uppercase tracking-wider">Foco Muscular</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Piernas', val: '42%', active: false },
                { label: 'Espalda', val: '28%', active: true },
                { label: 'Pecho', val: '15%', active: false },
                { label: 'Brazos', val: '15%', active: false },
              ].map((m, i) => (
                <div key={i} className={`p-4 bg-surface-container-highest rounded-lg flex flex-col items-center text-center ${m.active ? 'border-b-2 border-primary-container' : ''}`}>
                  <span className={`text-xs font-bold uppercase tracking-tighter ${m.active ? 'text-primary-container' : 'text-zinc-400'}`}>{m.label}</span>
                  <span className="text-[10px] text-on-surface-variant">{m.val} del volumen</span>
                </div>
              ))}
            </div>
            <div className="mt-8 relative aspect-square rounded-xl overflow-hidden bg-surface-container-highest flex items-center justify-center">
              <img 
                src="https://picsum.photos/seed/anatomy/400/400" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" 
                alt="Muscle map"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 text-center">
                <div className="text-primary-container text-5xl mb-2">🎯</div>
                <p className="font-headline font-bold text-xs uppercase text-primary-container">Mapa de Fatiga</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Exercise */}
        <div className="col-span-12 xl:col-span-8 bg-surface-container-high rounded-xl overflow-hidden flex flex-col md:flex-row border border-white/5">
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-secondary font-headline font-bold text-xs uppercase tracking-widest mb-2 block">Siguiente Ejercicio</span>
                <h3 className="font-headline text-4xl font-black italic tracking-tighter uppercase">Sentadillas</h3>
              </div>
              <div className="bg-surface-container-highest w-12 h-12 rounded-full flex items-center justify-center">
                <Info className="w-5 h-5 text-on-surface" />
              </div>
            </div>
            <div className="space-y-6 mb-10">
              {[
                { label: 'Series totales', val: '4' },
                { label: 'Repeticiones', val: '10' },
                { label: 'Peso objetivo', val: '85', unit: 'kg', highlight: true },
                { label: 'Descanso', val: '90', unit: 's' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-on-surface-variant font-medium">{stat.label}</span>
                  <span className={`font-headline font-bold text-xl ${stat.highlight ? 'text-primary-container' : ''}`}>
                    {stat.val} {stat.unit && <small className="text-xs uppercase">{stat.unit}</small>}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-background/50 rounded-xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Cronómetro de Descanso</span>
                <RefreshCw className="w-4 h-4 text-primary-container" />
              </div>
              <div className="flex items-center gap-6">
                <div className="font-headline text-5xl font-black tabular-nums tracking-tighter">01:30</div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-primary-container text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                    <Play className="w-5 h-5 fill-current" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center hover:bg-surface-variant active:scale-95 transition-colors">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary-container w-[100%]"></div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative bg-surface-container-highest min-h-[300px]">
            <img 
              src="https://picsum.photos/seed/squat/800/1000" 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Exercise"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-white/60 mb-1 tracking-widest">Tempo</span>
                  <span className="font-headline text-lg font-bold">3 - 0 - 1 - 0</span>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-white/60 mb-1 tracking-widest">RPE</span>
                  <span className="font-headline text-lg font-bold text-primary-container">8.5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Última vez', val: 'Hace 3 días', icon: RefreshCw, color: 'bg-secondary/10', text: 'text-secondary' },
            { label: 'Progreso Volumen', val: '+12.5% vs Mes ant.', icon: TrendingUp, color: 'bg-primary/10', text: 'text-primary-container' },
            { label: 'HR Promedio', val: '142 BPM', icon: Heart, color: 'bg-error/10', text: 'text-error' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-container p-6 rounded-xl flex items-center gap-4 border border-white/5">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.text}`} />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium uppercase tracking-tight">{stat.label}</p>
                <p className={`font-bold ${stat.text === 'text-primary-container' ? 'text-primary-container' : 'text-white'}`}>{stat.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
