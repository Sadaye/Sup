"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-24 space-y-24">
      <section aria-labelledby="titre-contact">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Badge variant="outline" className="glass mb-4">Contact</Badge>
          <h1 id="titre-contact" className="text-4xl md:text-5xl font-bold mb-6">
            Entrer en contact avec SupIGA
          </h1>
          <p className="text-lg text-muted-foreground">
            Notre équipe est à votre écoute pour toute question sur nos formations, l'admission ou la vie à SupIGA.
          </p>
        </motion.div>
      </section>
      <section aria-label="Coordonnées SupIGA" className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard className="flex flex-col items-center text-center p-8">
          <MapPin className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
          <h2 className="font-semibold mb-2">Adresse</h2>
          <p className="text-sm text-muted-foreground">Banankabougou près de la Cour Suprême</p>
        </GlassCard>
        <GlassCard className="flex flex-col items-center text-center p-8">
          <Phone className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
          <h2 className="font-semibold mb-2">Téléphone</h2>
          <p className="text-sm text-muted-foreground">
            <a href="tel:+22375134715" className="hover:underline">+223 75 13 47 15</a><br />
            <a href="tel:+22376443820" className="hover:underline">+223 76 44 38 20</a>
          </p>
        </GlassCard>
        <GlassCard className="flex flex-col items-center text-center p-8">
          <Mail className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
          <h2 className="font-semibold mb-2">Email</h2>
          <p className="text-sm text-muted-foreground">
            <a href="mailto:traoremohamedarsike@yahoo.fr" className="hover:underline">traoremohamedarsike@yahoo.fr</a>
          </p>
        </GlassCard>
      </section>
      <section aria-label="Formulaire de contact">
        <GlassCard className="max-w-xl mx-auto p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Formulaire de contact</h2>
          
          {/* Message de statut */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 text-sm">{submitMessage}</p>
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-800 text-sm">{submitMessage}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Nom complet</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-lg border px-4 py-2 bg-background" 
                required 
                autoComplete="off" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border px-4 py-2 bg-background" 
                required 
                autoComplete="off" 
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                value={formData.message}
                onChange={handleInputChange}
                className="w-full rounded-lg border px-4 py-2 bg-background" 
                required 
                autoComplete="off" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Envoyer
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </section>
    </main>
  );
}
