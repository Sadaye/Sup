"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/magic/ScrollReveal";
import { GlassCard } from "@/components/ui/glass-card";
import { GraduationCap, Award, BookOpen, Building } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: GraduationCap,
    value: "2000+",
    label: "Étudiants",
    description: "diplômés chaque année",
    color: "text-primary",
  },
  {
    id: 2,
    icon: Award,
    value: "95%",
    label: "Taux d'emploi",
    description: "dans les 6 mois suivant l'obtention du diplôme",
    color: "text-secondary",
  },
  {
    id: 3,
    icon: BookOpen,
    value: "50+",
    label: "Programmes",
    description: "de formation spécialisés",
    color: "text-accent",
  },
  {
    id: 4,
    icon: Building,
    value: "150+",
    label: "Partenaires",
    description: "entreprises et institutions académiques",
    color: "text-success",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-site mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">SupIGA en chiffres</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre institut en quelques chiffres clés qui témoignent de notre engagement envers l'excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.id} delay={index * 80}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="text-center h-full">
                <div className={`inline-flex p-3 rounded-full ${stat.color} bg-background/50 mb-4`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-lg font-medium">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </GlassCard>
            </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}