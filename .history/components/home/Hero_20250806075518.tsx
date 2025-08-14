

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, BookOpen, Users, Award, GraduationCap, ChevronRight } from 'lucide-react';
import StatsSection from './StatsSection';
import DirectorMessage from './DirectorMessage';
import NewsSection from './NewsSection';

interface HeroProps {
  onSectionChange?: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSectionChange }) => {
  return (
    <>
      <section className="relative pt-0 pb-16 overflow-hidden min-h-[120vh] flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('/bg-supiga.jpg')"}}>
        {/* Overlay bleu foncé pour lisibilité */}
        <div className="absolute inset-0 bg-blue-900/80 z-0"></div>
        {/* Background Elements décoratifs */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/3"></div>
        </div>
        <div className="container relative z-20 mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm"
            >
              <span className="bg-primary/20 p-1 rounded-full mr-2">
                <GraduationCap className="h-4 w-4 text-white" />
              </span>
              <span className="text-white font-medium">Excellence académique depuis 2012</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-lg"
            >
              <span>Bienvenue à SupIGA </span>
              <span className="text-primary-400">le pôle de l&apos;Excellence</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                <span className="text-base text-gray-100 font-medium">Une formation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                <span className="text-base text-gray-100 font-medium">Un métier</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                <span className="text-base text-gray-100 font-medium">Un emploi</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => onSectionChange && onSectionChange('formations')}
                className="rounded-full px-6 py-3 bg-primary-600 hover:bg-yellow-400 hover:text-black text-white font-semibold text-lg flex items-center transition-colors shadow-lg"
              >
                Découvrir nos formations <ChevronRight className="ml-2 h-4 w-4 group-hover:text-black transition-colors" />
              </button>
              <button
                onClick={() => onSectionChange && onSectionChange('inscriptions')}
                className="rounded-full px-6 py-3 bg-white text-primary-600 border border-primary-400 hover:bg-yellow-400 hover:text-black font-semibold text-lg flex items-center transition-colors shadow-lg"
              >
                S'inscrire maintenant
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary-400 group-hover:text-yellow-400 transition-colors" />
                <span className="text-sm text-gray-100">+30 Formations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary-400 group-hover:text-yellow-400 transition-colors" />
                <span className="text-sm text-gray-100">+1000 Étudiants</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary-400 group-hover:text-yellow-400 transition-colors" />
                <span className="text-sm text-gray-100">80% d&apos;insertion</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white/30 backdrop-blur aspect-video rounded-2xl overflow-hidden w-full max-w-lg mx-auto shadow-lg">
              <img 
                src="/UNIVERSITE SUP-IGA.jpg" 
                alt="Bâtiment principal de SupIGA" 
                className="w-full h-full object-cover" 
              />
            </div>
            {/* Floating Stats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="bg-white/60 backdrop-blur glass-card absolute -bottom-6 -left-6 p-4 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium text-primary-600">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-gray-700">Classement national</p>
                  <p className="font-semibold text-gray-900">Top 10 des écoles</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <NewsSection />
      <DirectorMessage />
      <StatsSection />
    </>
  );
};

export default Hero;