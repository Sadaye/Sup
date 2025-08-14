import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { formations } from "@/data/formations";
import Image from "next/image";

type Module = { name: string; credits: number; semester: number };

function buildProgramDetails(category: string, level: string) {
  const commonRequirements = level === 'Master'
    ? [
        "Licence ou équivalent",
        "Solides bases disciplinaires",
        "Motivation pour la spécialisation"
      ]
    : [
        "Baccalauréat ou équivalent",
        "Motivation et curiosité",
        "Capacité de travail personnel"
      ];

  if (category === 'Informatique') {
    return {
      image: "/photo_2025-06-02_15-13-12.jpg",
      objectives: [
        "Maîtriser les langages de programmation",
        "Concevoir des applications web et mobiles",
        "Administrer des systèmes et réseaux",
        "Appliquer les bonnes pratiques de sécurité",
      ],
      modules: [
        { name: "Programmation Web", credits: 6, semester: 1 },
        { name: "Bases de Données", credits: 5, semester: 1 },
        { name: "Algorithmes et Structures", credits: 5, semester: 2 },
        { name: "Administration Réseau", credits: 4, semester: 2 },
        { name: "Intelligence Artificielle", credits: 6, semester: 3 },
        { name: "Cybersécurité", credits: 4, semester: 3 },
      ] as Module[],
      career: [
        "Développeur Full-Stack",
        "Administrateur Systèmes & Réseaux",
        "Ingénieur Sécurité",
        "Data Engineer",
      ],
      requirements: commonRequirements,
    };
  }

  if (category === 'Sciences de gestion') {
    return {
      image: "/photo_2025-06-02_15-13-18.jpg",
      objectives: [
        "Maîtriser les fondamentaux du management",
        "Piloter la performance et la finance",
        "Déployer des stratégies marketing",
        "Manager les ressources humaines",
      ],
      modules: [
        { name: "Comptabilité Générale", credits: 5, semester: 1 },
        { name: "Marketing Fondamental", credits: 4, semester: 1 },
        { name: "Gestion Financière", credits: 5, semester: 2 },
        { name: "Contrôle de Gestion", credits: 4, semester: 2 },
        { name: "Management Stratégique", credits: 5, semester: 3 },
        { name: "Gestion de Projet", credits: 3, semester: 3 },
      ] as Module[],
      career: [
        "Contrôleur de Gestion",
        "Chef de Projet",
        "Responsable Marketing",
        "Analyste Financier",
      ],
      requirements: commonRequirements,
    };
  }

  // Environnement & développement durable
  return {
    image: "/photo_2025-06-02_15-13-21.jpg",
    objectives: [
      "Comprendre les enjeux environnementaux",
      "Mettre en place des systèmes QHSE",
      "Gérer l'eau et les ressources naturelles",
      "Conduire des projets durables",
    ],
    modules: [
      { name: "Écologie et Développement Durable", credits: 4, semester: 1 },
      { name: "Gestion de l'Eau", credits: 5, semester: 1 },
      { name: "Qualité-Hygiène-Sécurité", credits: 5, semester: 2 },
      { name: "Énergies Renouvelables", credits: 4, semester: 2 },
      { name: "Gestion des Déchets", credits: 4, semester: 3 },
      { name: "Réglementations et Normes", credits: 3, semester: 3 },
    ] as Module[],
    career: [
      "Chargé QHSE",
      "Chef de projet Environnement",
      "Consultant Développement Durable",
      "Technicien Eau & Assainissement",
    ],
    requirements: commonRequirements,
  };
}

export function generateStaticParams() {
  return formations.map((f) => ({ id: f.id }));
}

export default function ProgramPage({ params }: { params: { id: string } }) {
  const formation = formations.find((f) => f.id === params.id);
  if (!formation) {
    notFound();
  }

  const details = buildProgramDetails(formation.category, formation.level);

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/programs" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux programmes
          </Link>
          <Badge variant="outline" className="glass mb-4">{formation.level}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{formation.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">{formation.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
              <Image src={details.image} alt={formation.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <GlassCard>
              <h2 className="text-2xl font-bold mb-4">Objectifs du programme</h2>
              <ul className="space-y-2">
                {details.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard>
              <h2 className="text-2xl font-bold mb-4">Modules de formation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.modules.map((module, index) => (
                  <div key={index} className="p-4 bg-background/50 rounded-lg">
                    <h3 className="font-semibold mb-2">{module.name}</h3>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>20h</span>
                      <span>Semestre {module.semester}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="text-2xl font-bold mb-4">Débouchés professionnels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {details.career.map((career, index) => (
                  <div key={index} className="flex items-center p-3 bg-background/50 rounded-lg">
                    <GraduationCap className="h-4 w-4 text-primary mr-3" />
                    <span>{career}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard>
              <h3 className="text-lg font-semibold mb-4">Prérequis</h3>
              <ul className="space-y-2">
                {details.requirements.map((req, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-semibold mb-4">Nous contacter</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">+223 75 13 47 15 / +223 76 44 38 20</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">traoremohamedarsike@yahoo.fr</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">Banankabougou près de la Cour Suprême</span>
                </div>
              </div>
              <div className="w-full mt-4">
                <Button className="w-full" asChild>
                  <Link href="/contact">Demander plus d'informations</Link>
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
