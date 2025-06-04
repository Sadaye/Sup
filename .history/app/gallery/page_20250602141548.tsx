import Head from "next/head";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    alt: "Cérémonie de remise de diplômes SupIGA",
    legend: "Cérémonie de remise de diplômes 2024"
  },
  {
    src: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    alt: "Salle informatique moderne SupIGA",
    legend: "Salle informatique moderne"
  },
  {
    src: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg",
    alt: "Étudiants en projet collaboratif SupIGA",
    legend: "Projet collaboratif étudiants"
  },
  {
    src: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    alt: "Conférence innovation numérique SupIGA",
    legend: "Conférence innovation numérique"
  },
  {
    src: "https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg",
    alt: "Campus SupIGA Bamako",
    legend: "Campus SupIGA Bamako"
  }
];

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>Galerie photos - SupIGA</title>
        <meta name="description" content="Découvrez la vie du campus SupIGA en images : événements, infrastructures, étudiants et moments forts de l'année." />
      </Head>
      <main className="container mx-auto px-4 py-24 space-y-24">
        <section aria-labelledby="titre-galerie">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="glass mb-4">Galerie</Badge>
            <h1 id="titre-galerie" className="text-4xl md:text-5xl font-bold mb-6">
              La vie à SupIGA en images
            </h1>
            <p className="text-lg text-muted-foreground">
              Plongez dans l'ambiance du campus, découvrez nos événements, nos infrastructures et la diversité de la communauté SupIGA.
            </p>
          </motion.div>
        </section>
        <section aria-label="Galerie photos SupIGA">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {galleryImages.map((img, idx) => (
              <GlassCard key={img.src} className="overflow-hidden p-0 flex flex-col">
                <div className="relative w-full h-56">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx < 2}
                  />
                </div>
                <div className="p-4 text-center">
                  <span className="text-sm text-muted-foreground">{img.legend}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
