"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme/mode-toggle';
import Image from 'next/image';

const navItems = [
	{ name: 'Accueil', href: '/' },
	{ name: 'À propos', href: '/about' },
	{ name: 'Formations', href: '/programs' },
	{ name: 'Bibliothèque', href: '/library' },
	{ name: 'Galerie', href: '/gallery' },
	{ name: 'Actualités', href: '/news' },
	{ name: 'Contact', href: '/contact' },
];

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled ? 'glass py-2' : 'bg-transparent py-4'
			}`}
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<div className="relative h-24 w-24 md:h-32 md:w-32 flex-shrink-0 rounded-full shadow-md bg-white/10 backdrop-blur">
							<Image
								src="/logo-supiga.png"
								alt="Logo Université SupIGA"
								fill
								style={{ objectFit: 'contain' }}
								sizes="(max-width: 768px) 48px, 64px"
								priority
							/>
						</div>
						<span className="text-xl md:text-2xl font-bold text-gradient">SupIGA</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`font-medium transition-colors hover:text-primary ${
									pathname === item.href
										? 'text-primary'
										: 'text-foreground/80'
								}`}
							>
								{item.name}
							</Link>
						))}
					</nav>

					{/* Right Section */}
					<div className="hidden md:flex items-center space-x-4">
						<ModeToggle />
						<Button asChild variant="outline" className="glass-button">
							<Link href="/login">Connexion</Link>
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<div className="flex md:hidden items-center space-x-4">
						<ModeToggle />
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? <X /> : <Menu />}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					className="md:hidden glass mt-2"
				>
					<div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`font-medium px-4 py-2 rounded-md transition-colors ${
									pathname === item.href
										? 'bg-primary/10 text-primary'
										: 'hover:bg-primary/5'
								}`}
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
						<Button asChild className="glass-button w-full">
							<Link href="/login">Connexion</Link>
						</Button>
					</div>
				</motion.div>
			)}
		</header>
	);
}