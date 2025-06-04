import Head from "next/head";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Briefcase, Code2, Leaf } from "lucide-react";

const programs = [
	{
		category: "Sciences de gestion",
		icon: Briefcase,
		color: "primary",
		fields: [
			"Gestion des Entreprises & des Administrations",
			"Gestion des Ressources Humaines",
			"Gestion de Projet",
			"Marketing & Communication",
			"Entreprenariat & Leadership",
			"Management de Qualité",
			"Finance, Comptabilité / Fiscalité",
			"Banque, Assurance & Micro Finance",
			"Audit & Contrôle de Gestion",
			"Communication d'Entreprise",
			"Transport - Logistique - Douane",
		],
	},
	{
		category: "Informatique",
		icon: Code2,
		color: "secondary",
		fields: [
			"Programmation, Réseaux & Télécommunication",
			"Programmation & Technologies Internet",
			"Réseaux, Sécurité & Téléphonie IP",
			"Intégration des Systèmes d'Information",
			"Intégration de Site Web",
		],
	},
	{
		category: "Environnement & Développement durable",
		icon: Leaf,
		color: "success",
		fields: [
			"Génie de l'Environnement",
			"Eau et Environnement",
			"Hygiène, Qualité, Sécurité et Santé Environnementale",
		],
	},
];

export default function ProgramsPage() {
	return (
		<>
			<Head>
				<title>Formations - SupIGA</title>
				<meta
					name="description"
					content="Découvrez l'ensemble des programmes de formation proposés par SupIGA : gestion, informatique, environnement et développement durable."
				/>
			</Head>
			<main className="container mx-auto px-4 py-24 space-y-24">
				<section aria-labelledby="titre-formations">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="text-center max-w-3xl mx-auto"
					>
						<Badge variant="outline" className="glass mb-4">
							Nos formations
						</Badge>
						<h1
							id="titre-formations"
							className="text-4xl md:text-5xl font-bold mb-6"
						>
							Des parcours d'excellence pour tous les talents
						</h1>
						<p className="text-lg text-muted-foreground">
							SupIGA propose un large éventail de programmes adaptés aux besoins du
							marché et aux ambitions de chaque étudiant. Découvrez nos filières en
							gestion, informatique et environnement.
						</p>
					</motion.div>
				</section>
				<section
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					aria-label="Liste des domaines de formation"
				>
					{programs.map((prog) => {
						const Icon = prog.icon;
						return (
							<GlassCard
								key={prog.category}
								className="flex flex-col h-full p-8 items-center text-center"
							>
								<Icon
									className={`h-10 w-10 mb-4 text-${prog.color}`}
									aria-hidden="true"
								/>
								<h2 className="text-2xl font-bold mb-4">{prog.category}</h2>
								<ul className="space-y-2 text-left mx-auto max-w-xs">
									{prog.fields.map((field) => (
										<li key={field} className="flex items-start gap-2">
											<span className="mt-1 text-primary">•</span>
											<span className="text-muted-foreground">{field}</span>
										</li>
									))}
								</ul>
							</GlassCard>
						);
					})}
				</section>
			</main>
		</>
	);
}