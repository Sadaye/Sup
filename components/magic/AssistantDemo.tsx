"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Chatbot } from './Chatbot';
import { FloatingAssistant } from './FloatingAssistant';
import { EnhancedChatbot } from './EnhancedChatbot';
import { HolographicIcon, SupIGAAssistantIcon } from './HolographicIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Sparkles, 
  Brain, 
  GraduationCap, 
  Zap,
  CheckCircle,
  Star
} from 'lucide-react';

const assistantOptions = [
  {
    id: 'classic',
    name: 'Assistant Classique',
    description: 'Version simple et efficace avec icône traditionnelle',
    component: Chatbot,
    icon: MessageCircle,
    features: ['Interface simple', 'Réponses rapides', 'Design épuré'],
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'floating',
    name: 'Assistant Flottant',
    description: 'Design moderne avec icône animée et effets visuels',
    component: FloatingAssistant,
    icon: Sparkles,
    features: ['Animations fluides', 'Effets holographiques', 'Interface moderne'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'enhanced',
    name: 'Assistant IA Avancé',
    description: 'Version premium avec icône holographique et IA améliorée',
    component: EnhancedChatbot,
    icon: Brain,
    features: ['IA avancée', 'Icône holographique', 'Effets premium'],
    color: 'from-cyan-500 to-blue-500'
  }
];

export function AssistantDemo() {
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const SelectedComponent = assistantOptions.find(opt => opt.id === selectedAssistant)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 glass">Démonstration</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Assistant SupIGA
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez nos différentes options d'assistant virtuel pour votre site SupIGA
            </p>
          </motion.div>
        </div>

        {/* Options d'assistant */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {assistantOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedAssistant(option.id)}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <div className={`h-16 w-16 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center mx-auto shadow-lg`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{option.name}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {option.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    onClick={() => {
                      setSelectedAssistant(option.id);
                      setShowDemo(true);
                    }}
                  >
                    Tester cet assistant
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Icônes holographiques de démonstration */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Icônes Holographiques
          </h2>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="text-center">
              <HolographicIcon size="md" variant="holographic" icon="brain" />
              <p className="text-sm text-gray-300 mt-2">Brain</p>
            </div>
            <div className="text-center">
              <HolographicIcon size="md" variant="holographic" icon="sparkles" />
              <p className="text-sm text-gray-300 mt-2">Sparkles</p>
            </div>
            <div className="text-center">
              <HolographicIcon size="md" variant="holographic" icon="zap" />
              <p className="text-sm text-gray-300 mt-2">Zap</p>
            </div>
            <div className="text-center">
              <HolographicIcon size="md" variant="holographic" icon="message" />
              <p className="text-sm text-gray-300 mt-2">Message</p>
            </div>
            <div className="text-center">
              <HolographicIcon size="md" variant="holographic" icon="graduation" />
              <p className="text-sm text-gray-300 mt-2">Graduation</p>
            </div>
          </div>
        </div>

        {/* Icône spéciale SupIGA */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Icône Spéciale SupIGA
          </h2>
          <div className="flex justify-center">
            <div className="text-center">
              <SupIGAAssistantIcon />
              <p className="text-sm text-gray-300 mt-4">Assistant IA SupIGA avec indicateur de statut</p>
            </div>
          </div>
        </div>

        {/* Comparaison des fonctionnalités */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Comparaison des Fonctionnalités
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="glass-card p-4 text-center">
              <h3 className="font-semibold mb-2">Assistant Classique</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Simple et efficace</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Performance optimale</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Compatibilité maximale</span>
                </div>
              </div>
            </div>
            <div className="glass-card p-4 text-center">
              <h3 className="font-semibold mb-2">Assistant Flottant</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Design moderne</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Animations fluides</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Expérience utilisateur</span>
                </div>
              </div>
            </div>
            <div className="glass-card p-4 text-center">
              <h3 className="font-semibold mb-2">Assistant IA Avancé</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>IA améliorée</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Icône holographique</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Effets premium</span>
                </div>
              </div>
            </div>
            <div className="glass-card p-4 text-center">
              <h3 className="font-semibold mb-2">Icônes Holographiques</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Effets visuels</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Animations avancées</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Personnalisation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions d'utilisation */}
        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Comment Utiliser
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="font-semibold mb-2 text-primary">1. Choisir un Assistant</h3>
              <p className="text-gray-300 text-sm">
                Sélectionnez l'assistant qui correspond le mieux à vos besoins et à l'identité visuelle de SupIGA.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">2. Intégrer le Composant</h3>
              <p className="text-gray-300 text-sm">
                Importez et utilisez le composant choisi dans votre layout principal ou vos pages.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">3. Personnaliser</h3>
              <p className="text-gray-300 text-sm">
                Adaptez les couleurs, les réponses et les fonctionnalités selon vos besoins spécifiques.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Affichage de l'assistant sélectionné */}
      {showDemo && SelectedComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-2">
                Démonstration de l'assistant
              </h3>
              <p className="text-gray-300 text-sm">
                Testez l'assistant sélectionné
              </p>
            </div>
            <div className="relative h-96">
              <SelectedComponent />
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => setShowDemo(false)}
            >
              Fermer la démonstration
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
