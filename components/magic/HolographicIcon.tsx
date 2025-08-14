"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Zap, MessageCircle, GraduationCap } from 'lucide-react';

interface HolographicIconProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'holographic';
  icon?: 'brain' | 'sparkles' | 'zap' | 'message' | 'graduation';
}

export function HolographicIcon({ 
  onClick, 
  size = 'md', 
  variant = 'holographic',
  icon = 'brain'
}: HolographicIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20'
  };

  const iconComponents = {
    brain: Brain,
    sparkles: Sparkles,
    zap: Zap,
    message: MessageCircle,
    graduation: GraduationCap
  };

  const IconComponent = iconComponents[icon];

  const baseClasses = `${sizeClasses[size]} rounded-full shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden`;

  const variantClasses = {
    default: 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90',
    gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600',
    holographic: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700'
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} border-2 border-white/20`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, 5, -5, 0],
        boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
      }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: isPulsing 
          ? ["0 0 20px rgba(59, 130, 246, 0.3)", "0 0 40px rgba(59, 130, 246, 0.6)", "0 0 20px rgba(59, 130, 246, 0.3)"]
          : "0 0 20px rgba(59, 130, 246, 0.3)"
      }}
      transition={{ duration: 1 }}
    >
      {/* Holographic effect layers */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.3, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"
              transition={{ duration: 0.3 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.2, scale: 1.4 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-600/30 rounded-full"
              transition={{ duration: 0.4 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Floating particles */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.cos(i * 60 * Math.PI / 180) * 30,
                  y: Math.sin(i * 60 * Math.PI / 180) * 30
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-1 h-1 bg-white rounded-full" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main icon */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          animate={{ 
            rotate: isHovered ? [0, 360] : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.3 }
          }}
        >
          <IconComponent className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} text-white`} />
        </motion.div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: [
            "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
}

// Variant spécial pour l'assistant SupIGA
export function SupIGAAssistantIcon({ onClick }: { onClick?: () => void }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Cercle de fond animé */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20"
        animate={{
          scale: isActive ? [1, 1.3, 1] : 1,
          opacity: isActive ? [0.5, 0.8, 0.5] : 0.5
        }}
        transition={{ duration: 2 }}
      />

      {/* Icône principale */}
      <HolographicIcon
        onClick={onClick}
        size="lg"
        variant="holographic"
        icon="graduation"
      />

      {/* Indicateur de statut */}
      <motion.div
        className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"
        animate={{
          scale: isActive ? [1, 1.2, 1] : 1,
          boxShadow: isActive 
            ? ["0 0 5px rgba(34, 197, 94, 0.5)", "0 0 15px rgba(34, 197, 94, 0.8)", "0 0 5px rgba(34, 197, 94, 0.5)"]
            : "0 0 5px rgba(34, 197, 94, 0.3)"
        }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
}
