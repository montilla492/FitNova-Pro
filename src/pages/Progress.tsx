import { motion } from 'motion/react';
import { LineChart, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, Activity, Zap, Target } from 'lucide-react';

export default function Progress() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 min-h-screen bg-background"
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-1 bg-secondary"></div>
            <span className="text-secondary font-black uppercase tracking-widest text-xs">Rendimiento</span>
          </div>
          <h2 className="font-headline text-5xl font-black italic tracking-tighter uppercase text-white">Análisis de Progreso</h2>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container-high text-white px-4 py-2 rounded-lg text-xs font-bold uppercase border border-white/5">Últimos 30 días</button>
          <button className="bg-primary-container text-black px-4 py-2 rounded-lg text-xs font-bold uppercase">Exportar PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Main Chart Placeholder */}
        <div className="md:col-span-8 bg-surface-container-low rounded-2xl p-8 border border-white/5 relative overflow-hidden">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="font-headline text-xl font-bold text-white uppercase tracking-tight">Evolución de Cargas</h3>
              <p className="text-on-surface-variant text-xs">Volumen total por sesión (kg)</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Fuerza</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Hipertrofia</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${20 + Math.random() * 60}%` }}
                  className="w-full bg-primary-container/20 group-hover:bg-primary-container transition-colors rounded-t-sm"
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${10 + Math.random() * 40}%` }}
                  className="w-full bg-secondary/20 group-hover:bg-secondary transition-colors rounded-t-sm"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            <span>01 MAR</span>
            <span>15 MAR</span>
            <span>30 MAR</span>
          </div>
        </div>

        {/* PRs Sidebar */}
        <div className="md:col-span-4 space-y-6">
          <h3 className="font-headline text-lg font-bold text-white uppercase tracking-tight mb-4">Récords Personales (PR)</h3>
          {[
            { exercise: 'Sentadilla', weight: '145', unit: 'kg', date: '12 Mar', trend: 'up' },
            { exercise: 'Press Banca', weight: '105', unit: 'kg', date: '08 Mar', trend: 'up' },
            { exercise: 'Peso Muerto', weight: '185', unit: 'kg', date: '28 Feb', trend: 'stable' },
          ].map((pr, i) => (
            <div key={i} className="bg-surface-container-high p-5 rounded-xl border border-white/5 flex items-center justify-between group hover:border-primary-container/30 transition-all">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{pr.exercise}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-headline font-black text-white">{pr.weight}</span>
                  <span className="text-xs font-bold text-zinc-500 uppercase">{pr.unit}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold mb-1",
                  pr.trend === 'up' ? "text-primary-container" : "text-zinc-500"
                )}>
                  {pr.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  <span>{pr.trend === 'up' ? '+5kg' : 'Estable'}</span>
                </div>
                <p className="text-[10px] text-zinc-600 font-bold uppercase">{pr.date}</p>
              </div>
            </div>
          ))}
          <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-zinc-500 font-bold text-xs uppercase hover:border-primary-container/50 hover:text-primary-container transition-all">
            Ver Historial Completo
          </button>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Composición Corporal', val: '14.2%', sub: 'Grasa Corporal', icon: Activity, color: 'text-primary-container' },
          { label: 'Volumen Total Semana', val: '42,500', sub: 'kg levantados', icon: Zap, color: 'text-secondary' },
          { label: 'Consistencia', val: '95%', sub: 'Entrenos completados', icon: Calendar, color: 'text-tertiary' },
          { label: 'Puntos de Esfuerzo', val: '840', sub: 'Nivel: Avanzado', icon: Target, color: 'text-error' },
        ].map((m, i) => (
          <div key={i} className="bg-surface-container-low p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5", m.color)}>
                <m.icon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-700" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{m.label}</p>
            <h4 className="text-2xl font-headline font-black text-white mb-1">{m.val}</h4>
            <p className="text-[10px] text-zinc-600 font-bold uppercase">{m.sub}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
