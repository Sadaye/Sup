import Link from 'next/link';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass mt-20 border-t border-white/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gradient">SupIGA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Institut Supérieur d&apos;Informatique et de Gestion des Affaires. Une institution d&apos;excellence pour former les leaders de demain.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-foreground/60 hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="text-foreground/60 hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-foreground/60 hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">À propos</Link>
              </li>
              <li>
                <Link href="/programs" className="text-foreground/70 hover:text-primary transition-colors">Formations</Link>
              </li>
              <li>
                <Link href="/admissions" className="text-foreground/70 hover:text-primary transition-colors">Admissions</Link>
              </li>
              <li>
                <Link href="/library" className="text-foreground/70 hover:text-primary transition-colors">Bibliothèque</Link>
              </li>
              <li>
                <Link href="/news" className="text-foreground/70 hover:text-primary transition-colors">Actualités</Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold mb-4">Formations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/programs/informatique" className="text-foreground/70 hover:text-primary transition-colors">Informatique</Link>
              </li>
              <li>
                <Link href="/programs/gestion" className="text-foreground/70 hover:text-primary transition-colors">Gestion</Link>
              </li>
              <li>
                <Link href="/programs/commerce" className="text-foreground/70 hover:text-primary transition-colors">Commerce</Link>
              </li>
              <li>
                <Link href="/programs/marketing" className="text-foreground/70 hover:text-primary transition-colors">Marketing Digital</Link>
              </li>
              <li>
                <Link href="/programs/data-science" className="text-foreground/70 hover:text-primary transition-colors">Data Science</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground/70">Banankabougou près de la Cour Suprême</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/70">+223 75 13 47 15 / +223 76 44 38 20</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/70">traoremohamedarsike@yahoo.fr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SupIGA. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}