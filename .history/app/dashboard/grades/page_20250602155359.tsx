"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DownloadIcon } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Placeholder data
const gradesData = [
  {
    module: "Module 1: Développement Web",
    courses: [
      { name: "HTML/CSS Avancé", coefficients: 2, grade: 17, status: "success" },
      { name: "JavaScript & React", coefficients: 3, grade: 16, status: "success" },
      { name: "Backend Node.js", coefficients: 2, grade: 15, status: "success" },
      { name: "Projet Web", coefficients: 4, grade: 18, status: "success" },
    ],
  },
  {
    module: "Module 2: Bases de Données",
    courses: [
      { name: "Conception de BDD", coefficients: 2, grade: 14, status: "warning" },
      { name: "SQL Avancé", coefficients: 2, grade: 16, status: "success" },
      { name: "NoSQL", coefficients: 2, grade: 13, status: "warning" },
      { name: "Administration BDD", coefficients: 3, grade: 15, status: "success" },
    ],
  },
  {
    module: "Module 3: Gestion de Projet",
    courses: [
      { name: "Méthodologies Agiles", coefficients: 2, grade: 19, status: "success" },
      { name: "Outils de Gestion", coefficients: 2, grade: 17, status: "success" },
      { name: "Management d'équipe", coefficients: 3, grade: 16, status: "success" },
      { name: "Projet de Gestion", coefficients: 4, grade: 18, status: "success" },
    ],
  },
];

export default function GradesPage() {
  const [semester, setSemester] = useState("1");
  const [year, setYear] = useState("2024-2025");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/login");
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-success/20 text-success";
      case "warning":
        return "bg-warning/20 text-warning";
      case "error":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const calculateModuleAverage = (courses: any[]) => {
    const totalWeightedGrade = courses.reduce((sum, course) => sum + (course.grade * course.coefficients), 0);
    const totalCoefficients = courses.reduce((sum, course) => sum + course.coefficients, 0);
    return (totalWeightedGrade / totalCoefficients).toFixed(2);
  };

  const calculateOverallAverage = () => {
    let totalWeightedGrade = 0;
    let totalCoefficients = 0;
    
    gradesData.forEach(module => {
      module.courses.forEach(course => {
        totalWeightedGrade += course.grade * course.coefficients;
        totalCoefficients += course.coefficients;
      });
    });
    
    return (totalWeightedGrade / totalCoefficients).toFixed(2);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold">Mes notes</h1>
            <p className="text-muted-foreground">Consultez et exportez vos relevés de notes</p>
          </motion.div>
          
          <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[180px] glass-button">
                <SelectValue placeholder="Année académique" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger className="w-[150px] glass-button">
                <SelectValue placeholder="Semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Semestre 1</SelectItem>
                <SelectItem value="2">Semestre 2</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="glass-button">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Exporter PDF
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard>
            <h2 className="text-2xl font-bold mb-2">Relevé de notes {semester === "1" ? "Premier" : "Deuxième"} Semestre</h2>
            <div className="flex items-center mb-6">
              <p className="text-muted-foreground">Année académique {year}</p>
              <div className="ml-auto flex items-center space-x-2">
                <span className="text-sm font-medium">Moyenne générale:</span>
                <Badge variant="outline" className="bg-primary/20 text-primary">
                  {calculateOverallAverage()}/20
                </Badge>
              </div>
            </div>

            <div className="space-y-8">
              {gradesData.map((module, moduleIndex) => (
                <div key={moduleIndex}>
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{module.module}</h3>
                    <Badge variant="outline" className="bg-primary/20 text-primary">
                      Moyenne: {calculateModuleAverage(module.courses)}/20
                    </Badge>
                  </div>
                  
                  <div className="rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-background/50">
                        <TableRow>
                          <TableHead>Matière</TableHead>
                          <TableHead className="text-center">Coefficients</TableHead>
                          <TableHead className="text-center">Note</TableHead>
                          <TableHead className="text-center">Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {module.courses.map((course, courseIndex) => (
                          <TableRow key={courseIndex}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell className="text-center">{course.coefficients}</TableCell>
                            <TableCell className="text-center font-semibold">{course.grade}/20</TableCell>
                            <TableCell className="text-center">
                              <Badge className={getStatusColor(course.status)}>
                                {course.status === "success" ? "Validé" : 
                                 course.status === "warning" ? "À améliorer" : "Échec"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}