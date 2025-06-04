"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Placeholder data
const courseProgress = [
  { name: "Programmation Web", progress: 85 },
  { name: "Analyse de données", progress: 72 },
  { name: "Gestion de projet", progress: 95 },
  { name: "Marketing digital", progress: 60 },
  { name: "Bases de données", progress: 78 },
];

const gradesData = [
  { course: "Programmation Web", grade: 18, max: 20 },
  { course: "Analyse de données", grade: 15, max: 20 },
  { course: "Gestion de projet", grade: 19, max: 20 },
  { course: "Marketing digital", grade: 14, max: 20 },
  { course: "Bases de données", grade: 16, max: 20 },
];

const upcomingEvents = [
  { id: 1, title: "Examen final - Programmation Web", date: "15 Juin 2025", time: "14:00 - 16:00", location: "Salle A305" },
  { id: 2, title: "Remise du projet - Gestion de projet", date: "20 Juin 2025", time: "23:59", location: "En ligne" },
  { id: 3, title: "Conférence - Tendances IA", date: "25 Juin 2025", time: "10:00 - 12:00", location: "Amphithéâtre B" },
];

export default function DashboardPage() {
  const [period, setPeriod] = useState("semester");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const role = data?.user?.user_metadata?.role;
      if (role && role !== "etudiant") router.replace("/login");
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/login");
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue, Thomas Dupont</p>
          </motion.div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" className="glass-button">
              Exporter les notes
            </Button>
            <Button>
              Mon emploi du temps
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <GlassCard>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-xl font-semibold">Performances académiques</h2>
                <Tabs value={period} onValueChange={setPeriod} className="mt-2 sm:mt-0">
                  <TabsList className="glass h-8">
                    <TabsTrigger value="semester" className="text-xs h-7">Semestre</TabsTrigger>
                    <TabsTrigger value="year" className="text-xs h-7">Année</TabsTrigger>
                    <TabsTrigger value="all" className="text-xs h-7">Tous</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="h-60 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                <div className="text-center">
                  <BarChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Graphique des performances académiques</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard className="h-full">
              <h2 className="text-xl font-semibold mb-6">Moyenne générale</h2>
              <div className="flex flex-col items-center justify-center h-60">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <p className="text-5xl font-bold text-center">16.4</p>
                      <p className="text-sm text-muted-foreground text-center">/ 20</p>
                    </div>
                  </div>
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      className="text-muted/10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset="45"
                      className="text-primary"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground mt-4">Excellent</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard>
              <h2 className="text-xl font-semibold mb-6">Progression des cours</h2>
              <div className="space-y-4">
                {courseProgress.map((course, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{course.name}</span>
                      <span className="text-sm text-muted-foreground">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlassCard>
              <h2 className="text-xl font-semibold mb-6">Notes récentes</h2>
              <div className="space-y-3">
                {gradesData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-background/50 transition-colors">
                    <span className="text-sm font-medium">{item.course}</span>
                    <span className="text-sm font-semibold">
                      {item.grade}/{item.max}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <GlassCard>
              <h2 className="text-xl font-semibold mb-6">Évènements à venir</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg hover:bg-background/50 transition-colors">
                    <h3 className="font-medium text-sm">{event.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <span>{event.date}</span>
                      <span className="mx-2">•</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{event.location}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <GlassCard>
            <h2 className="text-xl font-semibold mb-6">Répartition des notes par catégorie</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="h-60 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg">
                <PieChart className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Répartition par matière</p>
              </div>
              <div className="h-60 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg">
                <BarChart className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Comparaison avec la moyenne</p>
              </div>
              <div className="h-60 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg">
                <LineChart className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Évolution sur le semestre</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}