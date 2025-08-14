"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { ScrollReveal } from "@/components/magic/ScrollReveal";
import { Tilt3D } from "@/components/magic/Tilt3D";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    id: 1,
    title: "Informatique",
    level: "Licence & Master",
    description: "Formation complète en développement logiciel, IA, cybersécurité et gestion de projet informatique.",
    image: "/photo_2025-06-02_15-13-12.jpg",
    students: 250,
    duration: "3-5 ans",
    courses: 24,
    href: "/programs/12", // Programmation, réseaux & télécommunication (catégorie Informatique)
  },
  {
    id: 2,
    title: "Gestion d'entreprise",
    level: "Licence & Master",
    description: "Expertise en management, stratégie, finance, ressources humaines et marketing.",
    image: "/photo_2025-06-02_15-13-18.jpg",
    students: 180,
    duration: "3-5 ans",
    courses: 22,
    href: "/programs/1", // Gestion des entreprises & des administrations
  },
  {
    id: 3,
    title: "Data Science",
    level: "Master",
    description: "Maîtrise de l'analyse de données, du machine learning et des statistiques avancées.",
    image: "/photo_2025-06-02_15-13-20.jpg",
    students: 120,
    duration: "2 ans",
    courses: 18,
    href: "/programs", // Redirige vers la liste complète en attendant une fiche dédiée
  },
];

export default function FeaturedPrograms() {
  return (
    <section className="py-20">
      <div className="w-full max-w-site mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="glass mb-4">Formations</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos programmes d&apos;excellence</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos formations conçues pour vous préparer aux défis du monde professionnel moderne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <ScrollReveal key={program.id} delay={index * 80}>
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Tilt3D>
              <GlassCard className="h-full flex flex-col group">
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-primary">{program.level}</Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 title-wow title-underline">{program.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">{program.description}</p>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex flex-col items-center p-2 bg-background/50 rounded-lg">
                    <Users className="h-4 w-4 mb-1 text-primary" />
                    <span className="text-xs">{program.students}</span>
                    <span className="text-[10px] text-muted-foreground">Étudiants</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-background/50 rounded-lg">
                    <Clock className="h-4 w-4 mb-1 text-primary" />
                    <span className="text-xs">{program.duration}</span>
                    <span className="text-[10px] text-muted-foreground">Durée</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-background/50 rounded-lg">
                    <BookOpen className="h-4 w-4 mb-1 text-primary" />
                    <span className="text-xs">{program.courses}</span>
                    <span className="text-[10px] text-muted-foreground">Cours</span>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full justify-between group" asChild>
                  <Link href={program.href}>
                    Découvrir ce programme
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </GlassCard>
              </Tilt3D>
            </motion.div>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button variant="outline" className="glass-button" asChild>
            <Link href="/programs">
              Voir tous les programmes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}