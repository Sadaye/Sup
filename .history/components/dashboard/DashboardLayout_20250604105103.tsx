"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  BookMarked,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";

// Définition du type pour les items du sidebar
type SidebarItem =
  | { divider: true }
  | { icon: React.ComponentType<{ className?: string }>; label: string; href: string };

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard" },
  { icon: BookOpen, label: "Cours", href: "/dashboard/courses" },
  { icon: FileText, label: "Notes", href: "/dashboard/grades" },
  { icon: Calendar, label: "Emploi du temps", href: "/dashboard/schedule" },
  { icon: BookMarked, label: "Bibliothèque", href: "/dashboard/library" },
  { divider: true },
  { icon: Settings, label: "Paramètres", href: "/dashboard/settings" },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="glass border-b border-white/20 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-gradient hidden sm:inline-block">
              SupIGA
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 px-1.5 py-px min-w-4 min-h-4 text-xs flex items-center justify-center">
              3
            </Badge>
          </Button>

          <div className="hidden sm:flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://supiga.net/wp-content/uploads/2023/05/director.jpg" alt="Directeur SupIGA" />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Directeur SupIGA</p>
              <p className="text-xs text-muted-foreground">Administration • Université SupIGA</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 glass border-r border-white/20 p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item, i) => {
              if ('divider' in item) {
                return <div key={i} className="my-4 border-t border-white/10" />;
              }
              const { icon: Icon, label, href } = item;
              return (
                <Link
                  key={i}
                  href={href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === href
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-primary/5 text-foreground/80"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              );
            })}

            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive mt-6">
              <LogOut className="h-5 w-5 mr-3" />
              Déconnexion
            </Button>
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ ease: "easeOut", duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 w-3/4 max-w-xs glass border-r border-white/20 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="font-bold text-gradient">SupIGA</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-3 mb-6 p-3 glass-card">
              <Avatar>
                <AvatarImage src="https://supiga.net/wp-content/uploads/2023/05/director.jpg" alt="Directeur SupIGA" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Directeur SupIGA</p>
                <p className="text-xs text-muted-foreground">Administration • Université SupIGA</p>
              </div>
              </div>

              <nav className="space-y-2">
                {sidebarItems.map((item, i) => {
                  if ('divider' in item) {
                    return <div key={i} className="my-4 border-t border-white/10" />;
                  }
                  const { icon: Icon, label, href } = item;
                  return (
                    <Link
                      key={i}
                      href={href}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
                        pathname === href
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-primary/5 text-foreground/80"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span>{label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  );
                })}

                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive mt-6">
                  <LogOut className="h-5 w-5 mr-3" />
                  Déconnexion
                </Button>
              </nav>
            </motion.div>
          </motion.div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}