"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, BookOpen, Users, Building, GraduationCap, Briefcase, Globe, Target
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-24 space-y-24">
        {/* Présentation */}
        <section aria-labelledby="titre-presentation">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="glass mb-4">Notre histoire</Badge>
            <h1 id="titre-presentation" className="text-4xl md:text-5xl font-bold mb-6">
              <span>SupIGA&nbsp;: </span>
              <span className="text-gradient">l'excellence académique depuis 2005</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Fondé en 2005, SupIGA s'est imposé comme une référence dans la formation supérieure en informatique, gestion et affaires. Notre engagement&nbsp;: offrir un enseignement innovant, professionnalisant et tourné vers l'avenir.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8" aria-labelledby="titre-mission-vision">
          <motion.article
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <GlassCard className="h-full">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <Target className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h2 id="titre-mission-vision" className="text-2xl font-bold mb-4">Notre mission</h2>
              <p className="text-muted-foreground mb-4">
                Former des professionnels compétents, responsables et innovants, capables de s'adapter aux évolutions du monde numérique et économique.
              </p>
              <p className="text-muted-foreground">
                SupIGA s'engage à transmettre des savoirs actualisés, à encourager l'esprit critique et à promouvoir l'éthique dans tous les parcours.
              </p>
            </GlassCard>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <GlassCard className="h-full">
              <div className="inline-flex p-3 rounded-full bg-secondary/10 mb-4">
                <Globe className="h-6 w-6 text-secondary" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Notre vision</h2>
              <p className="text-muted-foreground mb-4">
                Être un institut de référence en Afrique et à l'international, reconnu pour la qualité de ses formations, l'accompagnement de ses étudiants et son ouverture sur le monde professionnel.
              </p>
              <p className="text-muted-foreground">
                Nous aspirons à créer un environnement où l'innovation, l'excellence et l'éthique convergent pour former les leaders de demain.
              </p>
            </GlassCard>
          </motion.article>
        </section>

        {/* Valeurs */}
        <section aria-labelledby="titre-valeurs">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="glass mb-4">Nos valeurs</Badge>
            <h2 id="titre-valeurs" className="text-3xl font-bold mb-4">Des principes qui nous guident</h2>
            <p className="text-muted-foreground">
              Excellence, innovation, responsabilité, ouverture et engagement sont au cœur de notre projet éducatif.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard className="flex flex-col items-center text-center p-6">
              <Award className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
              <h3 className="font-semibold mb-2">Excellence</h3>
              <p className="text-sm text-muted-foreground">Nous visons l'excellence dans l'enseignement, la recherche et l'accompagnement de nos étudiants.</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <BookOpen className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">Nous encourageons la créativité, l'esprit d'initiative et l'adaptation aux nouveaux défis.</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <Users className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
              <h3 className="font-semibold mb-2">Ouverture</h3>
              <p className="text-sm text-muted-foreground">Nous favorisons la diversité, l'inclusion et l'ouverture sur le monde professionnel et international.</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <Briefcase className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
              <h3 className="font-semibold mb-2">Engagement</h3>
              <p className="text-sm text-muted-foreground">Nous nous engageons pour la réussite de chaque étudiant et pour un impact positif sur la société.</p>
            </GlassCard>
          </div>
        </section>

        {/* Chiffres clés */}
        <section aria-labelledby="titre-chiffres">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="glass mb-4">Chiffres clés</Badge>
            <h2 id="titre-chiffres" className="text-3xl font-bold mb-4">SupIGA en quelques chiffres</h2>
            <p className="text-muted-foreground">Des indicateurs qui témoignent de notre dynamisme et de notre rayonnement.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard className="flex flex-col items-center text-center p-6">
              <GraduationCap className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
              <h3 className="font-semibold mb-2">+2000</h3>
              <p className="text-sm text-muted-foreground">Diplômés depuis la création</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <Building className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
              <h3 className="font-semibold mb-2">3</h3>
              <p className="text-sm text-muted-foreground">Campus modernes à Bamako</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <Users className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
              <h3 className="font-semibold mb-2">+50</h3>
              <p className="text-sm text-muted-foreground">Enseignants et intervenants experts</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <BookOpen className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
              <h3 className="font-semibold mb-2">+20</h3>
              <p className="text-sm text-muted-foreground">Programmes de formation</p>
            </GlassCard>
          </div>
        </section>
      </main>
    </>
  );
}