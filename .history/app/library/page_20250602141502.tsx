"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  BookOpen,
  FileText,
  Download,
  Filter,
  BookMarked,
  GraduationCap,
  Building2,
  Code2,
  ChevronRight,
} from "lucide-react";
import Head from 'next/head';
import Image from 'next/image';

const categories = [
  { id: "info", name: "Informatique", icon: Code2 },
  { id: "business", name: "Gestion", icon: Building2 },
  { id: "general", name: "Culture générale", icon: BookOpen },
];

const documents = [
  {
    id: 1,
    title: "Introduction aux Algorithmes",
    category: "info",
    type: "course",
    author: "Dr. Marie Laurent",
    date: "2025-03-15",
    size: "2.4 MB",
    downloads: 156,
    thumbnail: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg"
  },
  {
    id: 2,
    title: "Fondamentaux du Marketing Digital",
    category: "business",
    type: "course",
    author: "Prof. Jean Martin",
    date: "2025-03-10",
    size: "1.8 MB",
    downloads: 89,
    thumbnail: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg"
  },
  {
    id: 3,
    title: "Intelligence Artificielle - Concepts Avancés",
    category: "info",
    type: "research",
    author: "Dr. Sophie Dubois",
    date: "2025-03-05",
    size: "3.2 MB",
    downloads: 234,
    thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg"
  },
  {
    id: 4,
    title: "Gestion de Projet Agile",
    category: "business",
    type: "course",
    author: "Prof. Michel Lefèvre",
    date: "2025-03-01",
    size: "1.5 MB",
    downloads: 167,
    thumbnail: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
  },
  {
    id: 5,
    title: "Cybersécurité et Protection des Données",
    category: "info",
    type: "research",
    author: "Dr. Marie Laurent",
    date: "2025-02-28",
    size: "2.8 MB",
    downloads: 198,
    thumbnail: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg"
  },
  {
    id: 6,
    title: "Économie Numérique",
    category: "general",
    type: "course",
    author: "Prof. Jean Martin",
    date: "2025-02-25",
    size: "2.1 MB",
    downloads: 145,
    thumbnail: "https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg"
  },
];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Head>
        <title>Bibliothèque numérique - SupIGA</title>
        <meta name="description" content="Accédez à la bibliothèque numérique de SupIGA : supports de cours, publications de recherche et ressources pédagogiques pour réussir vos études." />
      </Head>
      <main className="container mx-auto px-4 py-24 space-y-24">
        {/* Présentation éditoriale */}
        <section aria-labelledby="titre-bibliotheque">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="glass mb-4">Bibliothèque numérique</Badge>
            <h1 id="titre-bibliotheque" className="text-4xl md:text-5xl font-bold mb-6">
              Un espace de ressources pour votre réussite
            </h1>
            <p className="text-lg text-muted-foreground">
              La bibliothèque numérique de SupIGA met à votre disposition un large choix de supports de cours, publications de recherche et ressources pédagogiques, accessibles à tout moment pour accompagner votre parcours académique et professionnel.
            </p>
          </motion.div>
        </section>

        {/* Search and Filter Section */}
        <section>
          <GlassCard className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher par titre ou auteur..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  className="glass-button"
                  onClick={() => setSelectedCategory("all")}
                >
                  Tout
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="glass-button hidden md:flex"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Documents Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="h-full flex flex-col">
                  <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={doc.thumbnail}
                      alt={`Miniature du document : ${doc.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
                    <Badge className="absolute top-3 left-3 bg-primary">
                      {doc.type === "course" ? "Cours" : "Recherche"}
                    </Badge>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-semibold mb-1">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground">{doc.author}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{doc.date}</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Button variant="ghost" className="w-full justify-between">
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        <span>Télécharger</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{doc.downloads} dl</span>
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard variant="prominent" className="text-center py-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Besoin d'aide pour vos recherches ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Notre équipe de bibliothécaires est là pour vous aider à trouver les 
                ressources dont vous avez besoin pour vos études et recherches.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <a href="mailto:bibliotheque@supiga.edu">
                    Contacter un bibliothécaire
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="glass-button">
                  Guide d'utilisation
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </section>
      </main>
    </>
  );
}