import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AnimatedBackground } from '@/components/magic/AnimatedBackground';
import { ClientEffects } from '@/components/magic/ClientEffects';
import dynamic from 'next/dynamic';
const RouteProgressBar = dynamic(() => import('@/components/magic/RouteProgressBar'), { ssr: false });
const Chatbot = dynamic(() => import('@/components/magic/Chatbot'), { ssr: false });

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'SupIGA - Institut Supérieur d\'Informatique et de Gestion des Affaires',
  description: "SupIGA, institut d'enseignement supérieur en informatique, gestion et affaires. Contact: +223 75 13 47 15 / +223 76 44 38 20 – traoremohamedarsike@yahoo.fr – Banankabougou près de la Cour Suprême.",
  icons: { icon: '/logo-supiga.png' },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${outfit.className} min-h-screen flex flex-col`}>
        <RouteProgressBar />
        <AnimatedBackground />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ClientEffects />
          <div className="w-full max-w-site mx-auto">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}