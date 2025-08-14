"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Loader2, Brain, Sparkles } from 'lucide-react';
import { formations } from '@/data/formations';
import { Button } from '@/components/ui/button';

type ChatMessage = { role: 'bot' | 'user'; text: string };

const SUGGESTIONS = [
  "Formations informatique",
  "Processus d'inscription", 
  "Frais de scolarité",
  "Localisation SupIGA"
];

function answerQuestion(q: string): string {
  const query = q.toLowerCase();
  
  if (query.includes('où') || query.includes('adresse')) {
    return `📍 SupIGA se trouve à Banankabougou près de la Cour Suprême, Bamako, Mali. 3 campus modernes.`;
  }
  
  if (query.includes('inscri')) {
    return `🎓 Processus : 1. Créer un compte 2. Choisir formation 3. Finaliser dossier 4. Accompagnement personnalisé. Prérequis : Baccalauréat.`;
  }
  
  if (query.includes('frais') || query.includes('coût')) {
    return "💰 Frais variables selon niveau (Licence/Master) et filière. Contactez-nous pour devis personnalisé et facilités de paiement.";
  }
  
  if (query.includes('informatique')) {
    const infoFormations = formations.filter(f => f.category.toLowerCase().includes('informatique'));
    const list = infoFormations.map(f => `• ${f.title} (${f.level})`).join('\n');
    return `💻 Formations informatique :\n${list}`;
  }
  
  return `👋 Bonjour ! Je suis l'assistant IA de SupIGA. Posez-moi votre question ou choisissez une suggestion.`;
}

export function FloatingAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: 'bot',
    text: `👋 Salut ! Je suis votre assistant IA SupIGA. Comment puis-je vous aider ?`,
  }]);

  useEffect(() => {
    const k = 'supiga_floating_assistant_seen';
    if (typeof window === 'undefined') return;
    const isAuth = pathname?.startsWith('/login') || pathname?.startsWith('/register');
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const alreadySeen = localStorage.getItem(k) === '1';
    if (!isAuth && !isMobile && !alreadySeen) {
      const t = setTimeout(() => {
        setOpen(true);
        localStorage.setItem(k, '1');
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;
    setMessages(prev => [...prev, { role: 'user', text: content }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const reply = answerQuestion(content);
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
      setLoading(false);
    }, 500);
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[80]">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <div className="glass-card w-[400px] max-w-[90vw] h-[500px] rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 backdrop-blur-sm border-b border-white/10">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Brain className="h-5 w-5 text-white" />
                      </motion.div>
                      <div>
                        <p className="font-bold text-sm">Assistant IA SupIGA</p>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                          <p className="text-xs text-muted-foreground">En ligne</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setOpen(false)} 
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      aria-label="Fermer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Chat Content */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[350px]">
                  {messages.map((m, i) => (
                    <motion.div 
                      key={i} 
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                        m.role === 'user' 
                          ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                          : 'bg-white/10 backdrop-blur-sm border border-white/20'
                      }`}>
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                  
                  {loading && (
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>L'assistant réfléchit...</span>
                    </motion.div>
                  )}
                  
                  {!loading && (
                    <motion.div 
                      className="grid grid-cols-2 gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {SUGGESTIONS.map((s) => (
                        <button 
                          key={s} 
                          className="text-left text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 hover:scale-105" 
                          onClick={() => send(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Input */}
                <div className="border-t border-white/10 p-4">
                  <div className="flex items-center gap-2">
                    <input
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground"
                      placeholder="Posez votre question..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
                    />
                    <Button 
                      size="icon" 
                      className="h-12 w-12 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 hover:scale-105" 
                      onClick={() => send()}
                      aria-label="Envoyer"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="icon" 
            className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-primary via-secondary to-primary hover:from-primary/90 hover:via-secondary/90 hover:to-primary/90 transition-all duration-300 border-2 border-white/20" 
            onClick={() => setOpen((v) => !v)} 
            aria-label="Assistant IA"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Sparkles className="h-7 w-7" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </>
  );
}
