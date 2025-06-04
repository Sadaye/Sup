"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Image } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
    alt: "Campus SupIGA",
    category: "Campus"
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg",
    alt: "Laboratoire informatique",
    category: "Installations"
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
    alt: "Travail d'équipe étudiant",
    category: "Étudiants"
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/5428008/pexels-photo-5428008.jpeg",
    alt: "Cérémonie de remise des diplômes",
    category: "Événements"
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg",
    alt: "Conférence internationale",
    category: "Conférences"
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg",
    alt: "Vie étudiante",
    category: "Vie étudiante"
  }
];

export default function GalleryPreview() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Galerie</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Découvrez la vie sur le campus de SupIGA à travers notre galerie d&apos;images.
            </p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0" asChild>
            <Link href="/gallery">
              Galerie complète
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={index === 0 ? "col-span-2 row-span-2" : ""}
            >
              <div className="relative group h-full">
                <div className="relative h-full overflow-hidden rounded-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="ghost" className="glass-button" asChild>
                      <Link href="/gallery">
                        <Image className="h-5 w-5 mr-2" />
                        Voir plus
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 glass px-3 py-1 rounded-full text-xs font-medium">
                  {image.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}