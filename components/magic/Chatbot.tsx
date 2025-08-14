"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, Send, X, Loader2, GraduationCap, Building, Users, Globe, Award, BookOpen, MapPin, Phone, Mail } from 'lucide-react';
import { formations } from '@/data/formations';
import { Button } from '@/components/ui/button';

type ChatMessage = { role: 'bot' | 'user'; text: string };

const SUGGESTIONS = [
  "Quelles sont vos formations en informatique ?",
  "Comment s'inscrire à SupIGA ?",
  "Quels sont les frais et la durée ?",
  "Avez-vous des partenariats entreprises ?",
  "Où se trouve SupIGA ?",
  "Quels sont vos chiffres clés ?",
];

// Base de connaissances enrichie pour SupIGA
const KNOWLEDGE_BASE = {
  // Informations générales
  general: {
    name: "SupIGA (Institut Supérieur d'Informatique et de Gestion des Affaires)",
    founded: "2005",
    location: "Banankabougou près de la Cour Suprême, Bamako, Mali",
    phone: ["+223 75 13 47 15", "+223 76 44 38 20"],
    email: "traoremohamedarsike@yahoo.fr",
    campuses: "3 campus modernes à Bamako",
    teachers: "Plus de 50 enseignants et intervenants experts",
    graduates: "Plus de 2000 diplômés depuis la création",
    programs: "Plus de 20 programmes de formation",
    partners: "150+ partenaires académiques et entreprises"
  },
  
  // Valeurs et mission
  values: {
    mission: "Former des professionnels compétents, responsables et innovants, capables de s'adapter aux évolutions du monde numérique et économique.",
    vision: "Être un institut de référence en Afrique et à l'international, reconnu pour la qualité de ses formations.",
    values: ["Excellence", "Innovation", "Ouverture", "Engagement"]
  },
  
  // Processus d'inscription
  admission: {
    steps: [
      "Créer un compte sur notre plateforme",
      "Choisir une formation adaptée à votre profil",
      "Finaliser votre dossier auprès du secrétariat",
      "Accompagnement personnalisé à chaque étape"
    ],
    requirements: "Baccalauréat ou équivalent selon le niveau d'études visé"
  }
};

function answerQuestion(q: string): string {
  const query = q.toLowerCase();
  
  // Informations de contact
  if (query.includes('où') || query.includes('adresse') || query.includes('localisation')) {
    return `SupIGA se trouve à ${KNOWLEDGE_BASE.general.location}. Nous disposons de 3 campus modernes à Bamako pour accueillir nos étudiants dans les meilleures conditions.`;
  }
  
  if (query.includes('téléphone') || query.includes('phone') || query.includes('appeler')) {
    return `Vous pouvez nous joindre au ${KNOWLEDGE_BASE.general.phone[0]} ou ${KNOWLEDGE_BASE.general.phone[1]}. Notre équipe est disponible pour répondre à toutes vos questions.`;
  }
  
  if (query.includes('email') || query.includes('mail') || query.includes('courriel')) {
    return `Notre adresse email : ${KNOWLEDGE_BASE.general.email}. N'hésitez pas à nous écrire pour toute demande d'information.`;
  }
  
  // Chiffres clés
  if (query.includes('chiffre') || query.includes('statistique') || query.includes('nombre')) {
    return `SupIGA en chiffres : ${KNOWLEDGE_BASE.general.graduates} diplômés, ${KNOWLEDGE_BASE.general.campuses}, ${KNOWLEDGE_BASE.general.teachers}, ${KNOWLEDGE_BASE.general.programs} programmes, ${KNOWLEDGE_BASE.general.partners} partenaires.`;
  }
  
  // Inscription
  if (query.includes('inscri') || query.includes('admission') || query.includes('inscription')) {
    const steps = KNOWLEDGE_BASE.admission.steps.map((step, i) => `${i + 1}. ${step}`).join('\n');
    return `Processus d'inscription à SupIGA :\n\n${steps}\n\nPrérequis : ${KNOWLEDGE_BASE.admission.requirements}\n\nNotre équipe vous accompagne à chaque étape pour garantir votre réussite.`;
  }
  
  // Frais et coûts
  if (query.includes('frais') || query.includes('coût') || query.includes('prix') || query.includes('tarif')) {
    return "Les frais de scolarité varient selon le niveau (Licence/Master) et la filière choisie. Pour un devis personnalisé et détaillé, contactez-nous directement par téléphone ou email. Nous proposons également des facilités de paiement.";
  }
  
  // Partenariats
  if (query.includes('parten') || query.includes('entreprise') || query.includes('collaboration')) {
    return `SupIGA collabore avec ${KNOWLEDGE_BASE.general.partners} pour offrir des stages, des opportunités d'emploi et des formations adaptées aux besoins du marché. Ces partenariats garantissent l'insertion professionnelle de nos diplômés.`;
  }
  
  // Formations informatique
  if (query.includes('informatique') || query.includes('développement') || query.includes('réseau') || query.includes('programmation')) {
    const infoFormations = formations.filter(f => f.category.toLowerCase().includes('informatique'));
    const list = infoFormations.map(f => `• ${f.title} (${f.level}, ${f.duration})`).join('\n');
    return `Nos formations en informatique :\n\n${list}\n\nCes programmes couvrent la programmation, les réseaux, la cybersécurité et l'intégration de systèmes d'information.`;
  }
  
  // Formations gestion
  if (query.includes('gestion') || query.includes('management') || query.includes('commerce')) {
    const gestionFormations = formations.filter(f => f.category.toLowerCase().includes('gestion'));
    const list = gestionFormations.map(f => `• ${f.title} (${f.level}, ${f.duration})`).join('\n');
    return `Nos formations en sciences de gestion :\n\n${list}\n\nCes programmes préparent aux carrières en management, finance, marketing et entrepreneuriat.`;
  }
  
  // Environnement
  if (query.includes('environnement') || query.includes('développement durable') || query.includes('écologie')) {
    const envFormations = formations.filter(f => f.category.toLowerCase().includes('environnement'));
    const list = envFormations.map(f => `• ${f.title} (${f.level}, ${f.duration})`).join('\n');
    return `Nos formations en environnement et développement durable :\n\n${list}\n\nCes programmes répondent aux défis environnementaux actuels.`;
  }
  
  // Mission et valeurs
  if (query.includes('mission') || query.includes('vision') || query.includes('valeur')) {
    return `Notre mission : ${KNOWLEDGE_BASE.values.mission}\n\nNotre vision : ${KNOWLEDGE_BASE.values.vision}\n\nNos valeurs : ${KNOWLEDGE_BASE.values.values.join(', ')}`;
  }
  
  // Horaires et contact
  if (query.includes('horaire') || query.includes('contact') || query.includes('disponible')) {
    return "Notre équipe est disponible du lundi au vendredi de 8h à 17h. Pour un rendez-vous ou des informations urgentes, contactez-nous par téléphone ou email. Nous répondons rapidement à toutes vos demandes.";
  }
  
  // Réponse par défaut
  return `Bonjour ! Je suis l'assistant virtuel de SupIGA. Je peux vous informer sur nos formations, l'inscription, les frais, les partenariats, notre localisation et bien plus encore. Posez-moi votre question ou choisissez une suggestion ci-dessous.`;
}

export function Chatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: 'bot',
    text: `Bonjour ! 👋 Je suis votre assistant SupIGA virtuel. Je peux vous guider sur nos formations, l'inscription, les frais, les partenariats et toutes les informations pratiques. Comment puis-je vous aider aujourd'hui ?`,
  }]);

  // Auto open first visit (desktop only), skip on auth routes
  useEffect(() => {
    const k = 'supiga_chatbot_seen';
    if (typeof window === 'undefined') return;
    const isAuth = pathname?.startsWith('/login') || pathname?.startsWith('/register');
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const alreadySeen = localStorage.getItem(k) === '1';
    const neverShow = localStorage.getItem('supiga_chatbot_never_show') === '1';
    if (!isAuth && !isMobile && !alreadySeen && !neverShow) {
      const t = setTimeout(() => {
        setOpen(true);
        localStorage.setItem(k, '1');
      }, 800);
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
    }, 400);
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[80]">
        <div className="relative">
          {open && (
            <div className="glass-card w-[380px] max-w-[90vw] h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden mb-3">
              <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Assistant SupIGA</p>
                    <p className="text-xs text-muted-foreground">En ligne</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="p-1 hover:opacity-70" aria-label="Fermer">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-line ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> L'assistant écrit...
                  </div>
                )}
                {!loading && (
                  <div className="grid grid-cols-2 gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} className="text-left text-xs px-3 py-2 rounded-md bg-background border hover:bg-primary/10 transition-colors" onClick={() => send(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t p-3 flex items-center gap-2">
                <input
                  className="flex-1 bg-transparent outline-none h-10 px-3 rounded-md border text-sm"
                  placeholder="Écrivez votre question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
                />
                <Button size="icon" className="h-10 w-10" onClick={() => send()} aria-label="Envoyer">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <Button 
            size="icon" 
            variant="default" 
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 hover:scale-110" 
            onClick={() => setOpen((v) => !v)} 
            aria-label="Chat"
          >
            <GraduationCap className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  );
}


