import { motion } from 'motion/react';
import { MessageSquare, Heart, Share2, MoreHorizontal, Plus, Search, Filter, Flame } from 'lucide-react';
import { useState } from 'react';

export default function Community() {
  const [activeTab, setActiveTab] = useState('trending');

  const posts = [
    {
      id: 1,
      author: 'Carlos Ruiz',
      avatar: 'https://picsum.photos/seed/user1/100/100',
      time: 'Hace 2 horas',
      content: '¡Nueva PR en peso muerto! 180kg x 3 reps. La constancia es la clave. #fitness #powerlifting #goals',
      image: 'https://picsum.photos/seed/deadlift/800/600',
      likes: 124,
      comments: 18,
      category: 'Logro'
    },
    {
      id: 2,
      author: 'Elena Fitness',
      avatar: 'https://picsum.photos/seed/user2/100/100',
      time: 'Hace 5 horas',
      content: 'Preparando el meal prep de la semana. 🥑 Pollo, quinoa y muchos vegetales. ¿Cuál es vuestra comida post-entreno favorita?',
      image: 'https://picsum.photos/seed/meal/800/600',
      likes: 89,
      comments: 32,
      category: 'Nutrición'
    }
  ];

  return (
    <div className="p-8 min-h-screen bg-background flex gap-8">
      {/* Main Feed */}
      <div className="flex-1 max-w-2xl mx-auto">
        {/* Feed Tabs */}
        <div className="flex items-center gap-8 mb-8 border-b border-white/5 pb-4">
          {[
            { id: 'trending', label: 'Tendencias', icon: Flame },
            { id: 'recent', label: 'Recientes', icon: MessageSquare },
            { id: 'following', label: 'Siguiendo', icon: Heart },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all relative pb-4",
                activeTab === tab.id ? "text-primary-container" : "text-zinc-500 hover:text-white"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary-container rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Create Post */}
        <div className="bg-surface-container-low rounded-2xl p-6 mb-8 border border-white/5 shadow-xl">
          <div className="flex gap-4">
            <img src="https://picsum.photos/seed/user/100/100" className="w-12 h-12 rounded-full object-cover" alt="User" referrerPolicy="no-referrer" />
            <div className="flex-1">
              <textarea 
                placeholder="¿Qué tienes en mente, Atleta?" 
                className="w-full bg-transparent border-none resize-none text-white placeholder:text-zinc-600 focus:ring-0 text-lg"
                rows={2}
              ></textarea>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                <div className="flex gap-4">
                  <button className="text-zinc-500 hover:text-primary-container transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <button className="bg-primary-container text-black px-6 py-2 rounded-full font-bold text-sm uppercase hover:scale-105 transition-transform active:scale-95">
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-8">
          {posts.map((post) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container-low rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <img src={post.avatar} className="w-10 h-10 rounded-full object-cover" alt={post.author} referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{post.author}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{post.time} • <span className="text-secondary">{post.category}</span></p>
                    </div>
                  </div>
                  <button className="text-zinc-600 hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">{post.content}</p>
              </div>
              <div className="aspect-video relative overflow-hidden group">
                <img 
                  src={post.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Post content"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex items-center justify-between border-t border-white/5">
                <div className="flex gap-6">
                  <button className="flex items-center gap-2 text-zinc-500 hover:text-error transition-colors group">
                    <Heart className="w-5 h-5 group-hover:fill-current" />
                    <span className="text-xs font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-zinc-500 hover:text-secondary transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-xs font-bold">{post.comments}</span>
                  </button>
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Sidebar Info */}
      <aside className="hidden xl:block w-80 space-y-8">
        <div className="bg-surface-container-low rounded-2xl p-6 border border-white/5 shadow-xl">
          <h3 className="font-headline text-lg font-bold mb-6 uppercase tracking-tight">Atletas Destacados</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={`https://picsum.photos/seed/top${i}/100/100`} className="w-8 h-8 rounded-full object-cover" alt="User" referrerPolicy="no-referrer" />
                  <span className="text-sm font-bold text-white">Atleta_{i}</span>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary-container border border-primary-container/20 px-3 py-1 rounded-full hover:bg-primary-container hover:text-black transition-all">
                  Seguir
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-6 border border-white/5 shadow-xl">
          <h3 className="font-headline text-lg font-bold mb-6 uppercase tracking-tight">Retos de la Comunidad</h3>
          <div className="space-y-6">
            <div className="p-4 bg-surface-container-highest rounded-xl border-l-4 border-tertiary">
              <p className="text-[10px] font-black uppercase tracking-widest text-tertiary mb-1">Activo</p>
              <h4 className="font-bold text-sm text-white mb-2">30 Días de Plancha</h4>
              <div className="flex justify-between items-center text-[10px] text-zinc-500">
                <span>1,240 Participantes</span>
                <span className="text-white font-bold">Día 12/30</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
