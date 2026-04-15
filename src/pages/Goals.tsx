import { motion } from 'motion/react';
import { Target, CheckCircle2, Circle, Trophy, Calendar, ArrowRight, Plus, Flag } from 'lucide-react';

export default function Goals() {
  const goals = [
    { id: 1, title: 'Ganar 3kg de Masa Muscular', deadline: '30 Jun 2026', progress: 65, category: 'Físico', status: 'active' },
    { id: 2, title: 'Correr 10km en < 50 min', deadline: '15 May 2026', progress: 40, category: 'Resistencia', status: 'active' },
    { id: 3, title: 'Beber 3L de agua diarios', deadline: 'Diario', progress: 100, category: 'Hábito', status: 'completed' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 min-h-screen bg-background"
    >
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="font-headline text-5xl font-black italic tracking-tighter uppercase text-white mb-2">Mis Objetivos</h2>
          <p className="text-on-surface-variant font-medium">Define tu norte, nosotros trazamos el camino.</p>
        </div>
        <button className="bg-primary-container text-black px-8 py-4 rounded-xl font-headline font-bold text-sm uppercase flex items-center gap-3 shadow-[0_0_30px_rgba(218,249,0,0.2)] hover:scale-105 transition-all">
          <Plus className="w-5 h-5" />
          Nuevo Objetivo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Active Goals List */}
        <div className="lg:col-span-8 space-y-8">
          {goals.map((goal) => (
            <motion.div 
              key={goal.id}
              whileHover={{ x: 10 }}
              className="bg-surface-container-low rounded-2xl p-8 border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target className="w-32 h-32" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-white/5 text-zinc-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 inline-block border border-white/5">
                      {goal.category}
                    </span>
                    <h3 className="font-headline text-3xl font-black text-white uppercase italic tracking-tighter">{goal.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Fecha Límite</p>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-container" /> {goal.deadline}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-zinc-500 uppercase">Progreso Actual</span>
                    <span className="text-2xl font-headline font-black text-primary-container">{goal.progress}%</span>
                  </div>
                  <div className="h-3 bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary-container shadow-[0_0_15px_rgba(218,249,0,0.5)]"
                    />
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-xs uppercase transition-all border border-white/5">
                    Ver Plan de Acción
                  </button>
                  <button className="px-6 bg-primary-container/10 text-primary-container hover:bg-primary-container hover:text-black py-3 rounded-xl font-bold text-xs uppercase transition-all border border-primary-container/20">
                    Actualizar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Milestones & Achievements */}
        <div className="lg:col-span-4 space-y-10">
          <section>
            <h3 className="font-headline text-xl font-bold text-white uppercase tracking-tight mb-6 flex items-center gap-3">
              <Flag className="w-5 h-5 text-secondary" /> Próximos Hitos
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Completar 12 entrenos', date: 'En 4 días', done: true },
                { label: 'Alcanzar 82kg de peso', date: 'Estimado: 2 semanas', done: false },
                { label: 'Nueva PR en Sentadilla', date: 'Próximo lunes', done: false },
              ].map((h, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-surface-container-high rounded-xl border border-white/5">
                  {h.done ? (
                    <CheckCircle2 className="w-5 h-5 text-primary-container shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={cn("text-sm font-bold", h.done ? "text-zinc-500 line-through" : "text-white")}>{h.label}</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1">{h.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-headline text-xl font-bold text-white uppercase tracking-tight mb-6 flex items-center gap-3">
              <Trophy className="w-5 h-5 text-tertiary" /> Logros Recientes
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Madrugador', icon: '☀️' },
                { label: 'Bestia PR', icon: '🦍' },
                { label: 'Hidratado', icon: '💧' },
                { label: '7 Días Streak', icon: '🔥' },
              ].map((a, i) => (
                <div key={i} className="bg-surface-container-high p-4 rounded-xl border border-white/5 flex flex-col items-center text-center group hover:bg-tertiary/5 transition-all cursor-pointer">
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{a.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-tertiary">{a.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
