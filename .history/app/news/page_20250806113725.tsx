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
		excerpt:
			"SupIGA ouvre un nouveau cursus en Data Science, alliant théorie et pratique pour répondre aux besoins du marché du numérique.",
		link: "#",
	},
	{
		title: "Conférence : Innovation et entrepreneuriat au Mali",
		date: "10 avril 2025",
		image: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg",
		excerpt:
			"Une conférence exceptionnelle sur l'innovation et l'entrepreneuriat au Mali, avec des intervenants de renom.",
		link: "#",
	},
	{
		title: "Remise des diplômes 2024",
		date: "20 mars 2025",
		image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
		excerpt:
			"Félicitations à nos nouveaux diplômés ! Découvrez les temps forts de la cérémonie et les témoignages des lauréats.",
		link: "#",
	},
];

export default function NewsPage() {
	return (
		<>
			<Head>
				<title>Actualités - SupIGA</title>
				<meta
					name="description"
					content="Retrouvez toutes les actualités de SupIGA : événements, conférences, innovations, vie du campus et réussites étudiantes."
				/>
			</Head>
			<main className="container mx-auto px-4 py-24 space-y-24">
				<section aria-labelledby="titre-actus">
					<motion.h1
						id="titre-actus"
						initial={{ opacity: 0, y: -40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-5xl font-extrabold text-white text-center mb-12 drop-shadow-lg"
					>
						Actualités SupIGA
					</motion.h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
						{news.map((item) => (
							<GlassCard key={item.title} className="relative">
								<Image
									src={item.image}
									alt={item.title}
									width={400}
									height={300}
									className="rounded-lg object-cover"
								/>
								<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
									<h3 className="text-lg font-bold text-white">
										{item.title}
									</h3>
									<p className="text-sm text-gray-300">{item.date}</p>
									<p className="text-sm text-gray-400 mt-2">
										{item.excerpt}
									</p>
									<Badge className="mt-4">En savoir plus</Badge>
								</div>
							</GlassCard>
						))}
					</div>
				</section>
			</main>
		</>
	);
}
