"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const galleryImages = [
	{
		src: "/photo_2025-06-02_15-13-12.jpg",
		alt: "Vie étudiante SupIGA 1",
		legend: "Vie étudiante SupIGA 1",
	},
	{
		src: "/photo_2025-06-02_15-13-13.jpg",
		alt: "Vie étudiante SupIGA 2",
		legend: "Vie étudiante SupIGA 2",
	},
	{
		src: "/photo_2025-06-02_15-13-14.jpg",
		alt: "Vie étudiante SupIGA 3",
		legend: "Vie étudiante SupIGA 3",
	},
	{
		src: "/photo_2025-06-02_15-13-15.jpg",
		alt: "Vie étudiante SupIGA 4",
		legend: "Vie étudiante SupIGA 4",
	},
	{
		src: "/photo_2025-06-02_15-13-16.jpg",
		alt: "Vie étudiante SupIGA 5",
		legend: "Vie étudiante SupIGA 5",
	},
	{
		src: "/photo_2025-06-02_15-13-17.jpg",
		alt: "Vie étudiante SupIGA 6",
		legend: "Vie étudiante SupIGA 6",
	},
	{
		src: "/photo_2025-06-02_15-13-18.jpg",
		alt: "Vie étudiante SupIGA 7",
		legend: "Vie étudiante SupIGA 7",
	},
	{
		src: "/photo_2025-06-02_15-13-19.jpg",
		alt: "Vie étudiante SupIGA 8",
		legend: "Vie étudiante SupIGA 8",
	},
	{
		src: "/photo_2025-06-02_15-13-20.jpg",
		alt: "Vie étudiante SupIGA 9",
		legend: "Vie étudiante SupIGA 9",
	},
	{
		src: "/photo_2025-06-02_15-13-20 (2).jpg",
		alt: "Vie étudiante SupIGA 10",
		legend: "Vie étudiante SupIGA 10",
	},
	{
		src: "/photo_2025-06-02_15-13-21.jpg",
		alt: "Vie étudiante SupIGA 11",
		legend: "Vie étudiante SupIGA 11",
	},
	{
		src: "/photo_2025-06-02_15-13-21 (2).jpg",
		alt: "Vie étudiante SupIGA 12",
		legend: "Vie étudiante SupIGA 12",
	},
	{
		src: "/photo_2025-06-02_15-13-22.jpg",
		alt: "Vie étudiante SupIGA 13",
		legend: "Vie étudiante SupIGA 13",
	},
	{
		src: "/photo_2025-06-02_15-13-22 (2).jpg",
		alt: "Vie étudiante SupIGA 14",
		legend: "Vie étudiante SupIGA 14",
	},
	{
		src: "/photo_2025-06-02_15-13-23.jpg",
		alt: "Vie étudiante SupIGA 15",
		legend: "Vie étudiante SupIGA 15",
	},
	{
		src: "/photo_2025-06-02_15-13-24.jpg",
		alt: "Vie étudiante SupIGA 16",
		legend: "Vie étudiante SupIGA 16",
	},
	{
		src: "/photo_2025-06-02_15-13-24 (2).jpg",
		alt: "Vie étudiante SupIGA 17",
		legend: "Vie étudiante SupIGA 17",
	},
	{
		src: "/photo_2025-06-02_15-13-25.jpg",
		alt: "Vie étudiante SupIGA 18",
		legend: "Vie étudiante SupIGA 18",
	},
	{
		src: "/photo_2025-06-02_15-13-26.jpg",
		alt: "Vie étudiante SupIGA 19",
		legend: "Vie étudiante SupIGA 19",
	},
];

export default function GalleryPage() {
	return (
		<>
			<Head>
				<title>Galerie photos - SupIGA</title>
				<meta
					name="description"
					content="Découvrez la vie du campus SupIGA en images : événements, infrastructures, étudiants et moments forts de l'année."
				/>
			</Head>
			<main className="container mx-auto px-4 py-24 space-y-24">
				<section aria-labelledby="titre-galerie">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="text-center max-w-3xl mx-auto"
					>
						<Badge variant="outline" className="glass mb-4">
							Galerie
						</Badge>
						<h1
							id="titre-galerie"
							className="text-4xl md:text-5xl font-bold mb-6"
						>
							La vie à SupIGA en images
						</h1>
						<p className="text-lg text-muted-foreground">
							Plongez dans l'ambiance du campus, découvrez nos événements, nos
							infrastructures et la diversité de la communauté SupIGA.
						</p>
					</motion.div>
				</section>
				<section aria-label="Galerie photos SupIGA">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{galleryImages.map((img, idx) => (
							<GlassCard
								key={img.src}
								className="overflow-hidden p-0 flex flex-col"
							>
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
									<span className="text-sm text-muted-foreground">
										{img.legend}
									</span>
								</div>
							</GlassCard>
						))}
					</div>
				</section>
			</main>
		</>
	);
}
