"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const news = [
  {
    title: "Lancement du nouveau programme Data Science",
    date: "15 mai 2025",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    excerpt: "SupIGA ouvre un nouveau cursus en Data Science, alliant théorie et pratique pour répondre aux besoins du marché du numérique.",
    link: "#"
  },
  {
    title: "Conférence : Innovation et entrepreneuriat au Mali",
    date: "2 avril 2025",
    image: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg",
    excerpt: "Retour sur la conférence organisée par SupIGA avec des intervenants du monde de l'entreprise et de l'innovation.",
    link: "#"
  },
  {
    title: "Remise des diplômes 2024",
    date: "20 mars 2025",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    excerpt: "Félicitations à nos nouveaux diplômés ! Découvrez les temps forts de la cérémonie et les témoignages des lauréats.",
    link: "#"
  }
];

export default function NewsPage() {
  return (
    <>
      <Head>
        <title>Actualités - SupIGA</title>
        <meta name="description" content="Retrouvez toutes les actualités de SupIGA : événements, conférences, innovations, vie du campus et réussites étudiantes." />
      </Head>
      <main className="container mx-auto px-4 py-24 space-y-24">
        <section aria-labelledby="titre-actus">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="glass mb-4">Actualités</Badge>
            <h1 id="titre-actus" className="text-4xl md:text-5xl font-bold mb-6">
              L'actualité de SupIGA
            </h1>
            <p className="text-lg text-muted-foreground">
              Suivez les événements, les innovations et la vie du campus pour rester informé de tout ce qui fait la richesse de SupIGA.
            </p>
          </motion.div>
        </section>
        <section aria-label="Liste des actualités SupIGA">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <GlassCard key={item.title} className="flex flex-col overflow-hidden p-0">
                <div className="relative w-full h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs text-muted-foreground mb-2">{item.date}</span>
                  <h2 className="text-lg font-bold mb-2">{item.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{item.excerpt}</p>
                  <a href={item.link} className="text-primary text-sm font-semibold hover:underline mt-auto">Lire la suite</a>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
