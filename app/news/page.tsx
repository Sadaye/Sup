"use client";

import Image from "next/image";

const news = [
	{
		title: "Lancement du nouveau programme Data Science",
		date: "15 mai 2025",
		image: "/photo_2025-06-02_15-13-12.jpg",
		excerpt:
			"SupIGA ouvre un nouveau cursus en Data Science, alliant théorie et pratique pour répondre aux besoins du marché du numérique.",
	},
	{
		title: "Conférence : Innovation et entrepreneuriat au Mali",
		date: "10 avril 2025",
		image: "/photo_2025-06-02_15-13-13.jpg",
		excerpt:
			"Une conférence exceptionnelle sur l'innovation et l'entrepreneuriat au Mali, avec des intervenants de renom.",
	},
	{
		title: "Remise des diplômes 2024",
		date: "20 mars 2025",
		image: "/photo_2025-06-02_15-13-14.jpg",
		excerpt:
			"Félicitations à nos nouveaux diplômés ! Découvrez les temps forts de la cérémonie et les témoignages des lauréats.",
	},
];

export default function NewsPage() {
	return (
		<main className="container mx-auto px-4 py-24 space-y-24">
			<section>
				<h1 className="text-5xl font-extrabold text-center mb-12">
					Actualités SupIGA
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{news.map((item) => (
						<div key={item.title} className="relative border rounded-lg overflow-hidden">
							<Image
								src={item.image}
								alt={item.title}
								width={400}
								height={300}
								className="object-cover"
							/>
							<div className="p-4">
								<h3 className="text-lg font-bold">{item.title}</h3>
								<p className="text-sm text-gray-500">{item.date}</p>
								<p className="text-sm mt-2">{item.excerpt}</p>
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
