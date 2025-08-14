"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, User, Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState("login");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const email = (e.currentTarget as any).email.value;
    const password = (e.currentTarget as any).password.value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    if (error) setError(error.message);
    else {
      // Récupérer le rôle de l'utilisateur connecté
      const { data: userData } = await supabase.auth.getUser();
      const role = userData?.user?.user_metadata?.role;
      if (role === "admin") window.location.href = "/admin";
      else if (role === "prof") window.location.href = "/prof";
      else if (role === "parent") window.location.href = "/parent";
      else window.location.href = "/dashboard";
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const email = (e.currentTarget as any)["register-email"].value;
    const password = (e.currentTarget as any)["register-password"].value;
    const name = (e.currentTarget as any)["register-name"].value;
    // Dans handleRegister, si jamais quelqu'un tente d'envoyer 'admin', on force le rôle à 'etudiant' par défaut
    const roleRaw = (e.currentTarget as any)["register-role"].value;
    const role = ["prof", "parent", "etudiant", "admin"].includes(roleRaw) ? roleRaw : "etudiant";
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role } }
    });
    setIsLoading(false);
    if (error) setError(error.message);
    else {
      // Redirection dynamique selon le rôle après inscription
      if (role === "admin") window.location.href = "/admin";
      else if (role === "prof") window.location.href = "/prof";
      else if (role === "parent") window.location.href = "/parent";
      else window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto px-6 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard variant="prominent" className="max-w-md w-full mx-auto">
            <div className="flex justify-center mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-1">Bienvenue à SupIGA</h1>
            <p className="text-center text-muted-foreground mb-6">Connectez-vous pour accéder à votre espace</p>

            <Tabs defaultValue="login" className="w-full" onValueChange={setTab}>
              <TabsList className="grid w-full grid-cols-2 glass mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        type="email"
                        id="email"
                        placeholder="nom@supiga.edu"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                        Mot de passe oublié?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connexion en cours...
                      </div>
                    ) : (
                      <>Se connecter</>
                    )}
                  </Button>
                  
                  <div className="relative flex items-center justify-center my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative z-10 px-4 bg-card text-xs text-muted-foreground">ou continuer avec</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button" className="glass-button">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="glass-button">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 4.23 2.58 7.85 6.23 9.32v-6.36H5.9v-2.96h2.33V9.99c0-2.26 1.34-3.5 3.37-3.5.97 0 1.8.07 2.05.1v2.82h-1.4c-1.1 0-1.31.52-1.31 1.29v1.69h2.61l-.34 2.96h-2.27v6.38C17.4 19.97 20 16.35 20 12.06c0-5.53-4.5-10.02-10-10.02z" />
                      </svg>
                      Microsoft
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nom complet</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        type="text"
                        id="register-name"
                        placeholder="John Doe"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        type="email"
                        id="register-email"
                        placeholder="nom@supiga.edu"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Mot de passe</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        type="password"
                        id="register-password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-role">Rôle</Label>
                    <select id="register-role" name="register-role" className="pl-3 py-2 border rounded w-full" required>
                      <option value="etudiant">Étudiant</option>
                      <option value="prof">Professeur</option>
                      <option value="parent">Parent</option>
                      {process.env.NEXT_PUBLIC_ALLOW_ADMIN_SIGNUP === 'true' && (
                        <option value="admin">Admin</option>
                      )}
                    </select>
                  </div>

                  {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Création en cours...
                      </div>
                    ) : (
                      <>Créer un compte</>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              En vous connectant, vous acceptez nos{' '}
              <Link href="/terms" className="text-primary hover:underline">
                conditions d&apos;utilisation
              </Link>{' '}
              et notre{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                politique de confidentialité
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}