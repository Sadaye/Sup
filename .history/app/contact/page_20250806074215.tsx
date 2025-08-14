"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact - SupIGA</title>
        <meta name="description" content="Contactez SupIGA : adresse, téléphone, email, formulaire de contact et accès au campus à Bamako." />
      </Head>
      <main className="container mx-auto px-4 py-24 space-y-24 bg-background">
        <section aria-labelledby="titre-contact">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="glass mb-4">Contact</Badge>
            <h1 id="titre-contact" className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Entrer en contact avec SupIGA
            </h1>
            <p className="text-lg text-muted-foreground">
              Notre équipe est à votre écoute pour toute question sur nos formations, l'admission ou la vie à SupIGA.
            </p>
          </motion.div>
        </section>
        <section aria-label="Coordonnées SupIGA" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard className="flex flex-col items-center text-center p-8 bg-card">
            <MapPin className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
            <h2 className="font-semibold mb-2 text-foreground">Adresse</h2>
            <p className="text-sm text-muted-foreground">123 Avenue de l'Éducation<br />Bamako, Mali</p>
          </GlassCard>
          <GlassCard className="flex flex-col items-center text-center p-8 bg-card">
            <Phone className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
            <h2 className="font-semibold mb-2 text-foreground">Téléphone</h2>
            <p className="text-sm text-muted-foreground">
              <a href="tel:+22375134715" className="hover:underline">+223 75 13 47 15</a><br />
              <a href="tel:+22365671515" className="hover:underline">+223 65 67 15 15</a>
            </p>
          </GlassCard>
          <GlassCard className="flex flex-col items-center text-center p-8 bg-card">
            <Mail className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
            <h2 className="font-semibold mb-2 text-foreground">Email</h2>
            <p className="text-sm text-muted-foreground">
              <a href="mailto:info@supiga.net" className="hover:underline">info@supiga.net</a>
            </p>
          </GlassCard>
        </section>
        <section aria-label="Formulaire de contact">
          <GlassCard className="max-w-xl mx-auto p-8 bg-card">
            <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Formulaire de contact</h2>
            <form className="space-y-6" autoComplete="off">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-foreground">Nom complet</label>
                <input type="text" id="name" name="name" className="w-full rounded-lg border border-input px-4 py-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-blue-500 focus:border-blue-500" required autoComplete="off" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-foreground">Email</label>
                <input type="email" id="email" name="email" className="w-full rounded-lg border border-input px-4 py-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-blue-500 focus:border-blue-500" required autoComplete="off" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-foreground">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full rounded-lg border border-input px-4 py-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-blue-500 focus:border-blue-500" required autoComplete="off" />
              </div>
              <button type="submit" className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 transition">Envoyer</button>
            </form>
          </GlassCard>
        </section>
      </main>
    </>
  );
}
