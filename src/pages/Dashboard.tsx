import { motion } from 'motion/react';
import { Bolt, Target, PlayCircle, ChevronRight, Heart, Moon, Droplets, ArrowRight, Dumbbell } from 'lucide-react';
import { useAuth } from '../AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-8 min-h-screen bg-background"
    >
      {/* Welcome Section */}
      <motion.section variants={itemVariants} className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="font-headline text-5xl font-black italic tracking-tighter mb-2 text-white">
            ¡Hola, {user?.displayName?.split(' ')[0] || 'Atleta'}!
          </h1>
          <p className="text-on-surface-variant font-medium text-lg">Hoy es un gran día para entrenar</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 border border-white/5">
          <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Objetivo Activo</p>
            <p className="text-white font-bold">Ganar Masa Muscular</p>
          </div>
        </div>
      </motion.section>

      {/* Bento Grid: Vitals & Action */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Health Rings Card */}
        <motion.div variants={itemVariants} className="md:col-span-4 bg-surface-container-low rounded-xl p-8 flex items-center justify-center relative overflow-hidden border border-white/5">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="45" stroke="#262626" strokeWidth="8" />
              <circle cx="50" cy="50" fill="none" r="35" stroke="#262626" strokeWidth="8" />
              <circle cx="50" cy="50" fill="none" r="25" stroke="#262626" strokeWidth="8" />
              
              <circle className="ring-gradient-primary" cx="50" cy="50" fill="none" r="45" strokeWidth="8" />
              <circle className="ring-gradient-secondary" cx="50" cy="50" fill="none" r="35" strokeWidth="8" />
              <circle className="ring-gradient-tertiary" cx="50" cy="50" fill="none" r="25" strokeWidth="8" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Bolt className="text-primary-container w-6 h-6 fill-current" />
            </div>
          </div>
          <div className="absolute top-4 left-6">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Actividad</p>
          </div>
          <div className="absolute bottom-6 left-6 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-container"></div>
              <span className="text-[10px] font-bold text-on-surface uppercase tracking-tight">Calorías</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-[10px] font-bold text-on-surface uppercase tracking-tight">Minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-tertiary"></div>
              <span className="text-[10px] font-bold text-on-surface uppercase tracking-tight">Pasos</span>
            </div>
          </div>
        </motion.div>

        {/* Training Action Cards */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden bg-primary-container rounded-xl p-8 flex flex-col justify-between cursor-pointer"
          >
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <PlayCircle className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <Dumbbell className="text-black w-10 h-10 mb-4" />
              <h3 className="font-headline text-3xl font-black text-black leading-none mb-2 uppercase">Entrenar ahora</h3>
              <p className="text-black/70 text-sm font-medium">Inicia tu rutina programada</p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-black font-black uppercase text-xs tracking-widest">
              Empezar <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden bg-surface-container-high rounded-xl p-8 flex flex-col justify-between border border-white/5 group hover:border-secondary/30 transition-all"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-surface-container-high/60 to-transparent z-10"></div>
              <img 
                src="https://picsum.photos/seed/legs/800/600" 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                alt="Leg workout"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10">
              <span className="inline-block px-2 py-1 rounded bg-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest mb-4">Recomendación</span>
              <h3 className="font-headline text-2xl font-black text-white leading-tight uppercase">Día de Piernas</h3>
              <p className="text-on-surface-variant text-sm mt-1">Enfoque: Cuádriceps y Glúteos</p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-secondary font-black uppercase text-xs tracking-widest pt-4 cursor-pointer">
              Ver Detalles <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Weekly Summary & Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-surface-container-low rounded-xl p-8 border border-white/5">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="font-headline text-xl font-bold text-white uppercase tracking-tight">Resumen Semanal</h2>
              <p className="text-on-surface-variant text-xs">Calorías quemadas vs Objetivo</p>
            </div>
            <div className="text-right">
              <p className="font-headline text-2xl font-black text-primary-container">12,450</p>
              <p className="text-[10px] text-on-surface-variant uppercase font-bold">Kcal Totales</p>
            </div>
          </div>
          <div className="flex items-end justify-between h-48 gap-2">
            {[
              { day: 'LUN', val: 65 },
              { day: 'MAR', val: 80, active: true },
              { day: 'MIE', val: 45 },
              { day: 'JUE', val: 95, active: true },
              { day: 'VIE', val: 30 },
              { day: 'SAB', val: 70 },
              { day: 'DOM', val: 10, empty: true },
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full bg-surface-container-highest rounded-t-lg relative group h-40">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${d.val}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className={cn(
                      "absolute bottom-0 left-0 w-full rounded-t-lg transition-all",
                      d.empty ? "bg-zinc-800" : "bg-primary-container",
                      d.active && "shadow-[0_0_15px_rgba(218,249,0,0.4)]"
                    )}
                  />
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          {[
            { label: 'Ritmo Cardíaco', val: '72', unit: 'BPM', icon: Heart, color: 'text-secondary', border: 'border-secondary' },
            { label: 'Sueño Profundo', val: '6h 20m', unit: '', icon: Moon, color: 'text-tertiary', border: 'border-tertiary' },
            { label: 'Hidratación', val: '1.8', unit: 'LITROS', icon: Droplets, color: 'text-error', border: 'border-error' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className={cn(
                "bg-surface-container-high p-6 rounded-xl flex items-center justify-between border-l-4",
                stat.border
              )}
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">{stat.label}</p>
                <p className="text-2xl font-headline font-black text-white">
                  {stat.val} <span className="text-xs font-medium text-on-surface-variant">{stat.unit}</span>
                </p>
              </div>
              <stat.icon className={cn("w-8 h-8 fill-current", stat.color)} />
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
