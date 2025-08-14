"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';
import { formations } from '@/data/formations';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type ChatMessage = { role: 'bot' | 'user'; text: string };

const SUGGESTIONS = [
	"Quelles sont vos formations en informatique ?",
	"Comment s'inscrire à SupIGA ?",
	"Quels sont les frais et la durée ?",
	"Avez-vous des partenariats entreprises ?",
];

function answerQuestion(q: string): string {
	const query = q.toLowerCase();
	if (query.includes('inscri')) {
		return "Pour vous inscrire: créez un compte, choisissez une formation, puis finalisez votre dossier auprès du secrétariat. Nous vous accompagnons à chaque étape.";
	}
	if (query.includes('frais') || query.includes('coût') || query.includes('prix')) {
		return "Les frais varient selon le niveau (Licence/Master) et la filière. Contactez-nous via la page Contact pour un devis personnalisé.";
	}
	if (query.includes('parten') || query.includes('entreprise')) {
		return "Oui, SupIGA collabore avec 150+ partenaires académiques et entreprises pour stages et insertion pro.";
	}
	if (query.includes('informatique') || query.includes('développement') || query.includes('réseau')) {
		const list = formations.filter(f => f.category.toLowerCase().includes('informatique')).slice(0, 4);
		return `Formations en informatique: ${list.map(l => `${l.title} (${l.level}, ${l.duration})`).join(' • ')}. Voir la page Formations pour plus.`;
	}
	if (query.includes('gestion')) {
		const list = formations.filter(f => f.category.toLowerCase().includes('gestion')).slice(0, 4);
		return `En gestion: ${list.map(l => `${l.title} (${l.level})`).join(' • ')}.`;
	}
	if (query.includes('horaire') || query.includes('contact')) {
		return "Horaires et contact: rendez-vous sur la page Contact. Nous répondons rapidement par email et téléphone.";
	}
	// fallback
	return "Je peux vous guider sur les formations, l'inscription, les frais, et les partenariats. Posez-moi votre question.";
}

export function Chatbot() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([{
		role: 'bot',
		text: "Bonjour! Je suis votre assistant SupIGA. Posez-moi vos questions (inscription, formations, frais, etc.).",
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
						<div className="glass-card w-[340px] max-w-[90vw] h-[440px] rounded-2xl shadow-xl flex flex-col overflow-hidden mb-3">
							<div className="flex items-center justify-between px-3 py-2 border-b">
								<div className="flex items-center gap-2">
									<div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
										<MessageCircle className="h-4 w-4 text-primary" />
									</div>
									<p className="font-semibold">Assistant SupIGA</p>
								</div>
								<button onClick={() => setOpen(false)} className="p-1 hover:opacity-70" aria-label="Fermer">
									<X className="h-4 w-4" />
								</button>
							</div>
							<div className="flex-1 p-3 space-y-3 overflow-y-auto">
								{messages.map((m, i) => (
									<div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
										<div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}>
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
											<button key={s} className="text-left text-xs px-2 py-2 rounded-md bg-background border hover:bg-primary/10" onClick={() => send(s)}>
												{s}
											</button>
										))}
									</div>
								)}
							</div>
							<div className="border-t p-2 flex items-center gap-2">
								<input
									className="flex-1 bg-transparent outline-none h-10 px-3 rounded-md border"
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

					<Button size="icon" variant="default" className="h-12 w-12 rounded-full shadow-lg" onClick={() => setOpen((v) => !v)} aria-label="Chat">
						<MessageCircle className="h-5 w-5" />
					</Button>
				</div>
			</div>

			{/* Ajout de l'image du chatbot */}
			<div className="fixed bottom-5 right-[370px] z-[80]">
				<Image
					src="/public/chatbot-image.png"
					alt="Chatbot"
					width={100}
					height={100}
					className="rounded-full shadow-lg"
				/>
			</div>
		</>
	);
}


