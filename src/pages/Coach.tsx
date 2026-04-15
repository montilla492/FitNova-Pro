import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Zap, Brain, Target, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from '../AuthContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Coach() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `¡Hola ${user?.displayName?.split(' ')[0] || 'Atleta'}! Soy tu Coach de IA. Estoy aquí para analizar tu progreso, optimizar tus rutinas y ayudarte a alcanzar tus objetivos de forma bio-adaptativa. ¿En qué puedo ayudarte hoy?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', content: userMessage }].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `Eres FitNova AI Coach, un experto en fitness, nutrición y bio-hacking. 
          Tu tono es motivador, profesional, técnico pero accesible, y premium. 
          Hablas español de España/Latinoamérica neutro. 
          Tus respuestas deben ser concisas y enfocadas en resultados basados en ciencia. 
          El usuario actual es ${user?.displayName}. Su objetivo es Ganar Masa Muscular.
          Usa emojis de forma moderada para enfatizar puntos clave.`,
          temperature: 0.7,
        },
      });

      const assistantContent = response.text || "Lo siento, tuve un problema procesando tu solicitud. ¿Podrías repetirlo?";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);
    } catch (error) {
      console.error("AI Coach Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error de conexión con el núcleo de IA. Por favor, inténtalo de nuevo." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="p-8 h-[calc(100vh-5rem)] bg-background flex gap-8">
      {/* Chat Interface */}
      <div className="flex-1 flex flex-col bg-surface-container-low rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-black shadow-[0_0_20px_rgba(218,249,0,0.3)]">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-headline text-xl font-black uppercase italic tracking-tighter text-white">FitNova AI Coach</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                <span className="text-[10px] font-bold text-primary-container uppercase tracking-widest">Núcleo Activo</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-zinc-500 hover:text-white transition-colors"><Sparkles className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  msg.role === 'assistant' ? "bg-primary-container text-black" : "bg-surface-container-highest text-white"
                )}>
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'assistant' 
                    ? "bg-surface-container-high text-zinc-200 rounded-tl-none border border-white/5" 
                    : "bg-primary-container text-black font-medium rounded-tr-none"
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary-container text-black flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-surface-container-high p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="p-6 bg-surface-container-high border-t border-white/5">
          <div className="relative flex items-center gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pregunta sobre tu entrenamiento, dieta o progreso..." 
              className="flex-1 bg-background border-none rounded-xl px-6 py-4 text-sm text-white focus:ring-1 focus:ring-primary-container transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="bg-primary-container text-black p-4 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Insights Sidebar */}
      <aside className="w-80 space-y-6">
        <div className="bg-surface-container-low rounded-2xl p-6 border border-white/5 shadow-xl">
          <h3 className="font-headline text-lg font-bold mb-6 uppercase tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-container" /> Insights de IA
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-surface-container-highest rounded-xl border-l-2 border-primary-container">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary-container mb-1">Recomendación</p>
              <p className="text-xs text-white font-medium">Aumenta el consumo de proteína en 20g hoy para compensar el volumen de pierna.</p>
            </div>
            <div className="p-4 bg-surface-container-highest rounded-xl border-l-2 border-secondary">
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Análisis</p>
              <p className="text-xs text-white font-medium">Tu HRV indica que estás listo para una sesión de alta intensidad.</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-6 border border-white/5 shadow-xl">
          <h3 className="font-headline text-lg font-bold mb-6 uppercase tracking-tight">Capacidades</h3>
          <div className="space-y-2">
            {[
              { icon: Target, label: 'Ajuste de Macros' },
              { icon: Brain, label: 'Análisis de Fatiga' },
              { icon: Zap, label: 'Optimización de Sets' },
            ].map((cap, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg group hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <cap.icon className="w-4 h-4 text-zinc-500 group-hover:text-primary-container" />
                  <span className="text-xs font-bold text-zinc-400 group-hover:text-white">{cap.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-700" />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
