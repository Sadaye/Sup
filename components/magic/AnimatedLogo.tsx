"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Trophy, Star, Award, CheckCircle } from "lucide-react";

export default function AnimatedLogo() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const letters = "SupIGA".split("");

  useEffect(() => {
    // Déclencher l'animation après un court délai
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 500);

    // Déclencher l'icône après l'animation des lettres
    const iconTimer = setTimeout(() => {
      setShowIcon(true);
    }, 500 + (letters.length * 0.15 * 1000) + 300); // Après toutes les lettres + 300ms

    return () => {
      clearTimeout(timer);
      clearTimeout(iconTimer);
    };
  }, [letters.length]);

  return (
    <div className="flex items-center">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ 
            y: -50, 
            opacity: 0,
            rotateX: -90,
            scale: 0.5
          }}
          animate={hasAnimated ? {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1
          } : {}}
          transition={{
            delay: index * 0.15,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          whileHover={{
            y: -5,
            scale: 1.1,
            transition: { type: "spring", stiffness: 400 }
          }}
          className="inline-block text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
        >
          {letter}
        </motion.span>
      ))}
      
      {/* Icône de réussite qui apparaît après l'animation */}
      <motion.div
        initial={{ 
          scale: 0, 
          rotate: -180,
          opacity: 0,
          x: -10
        }}
        animate={showIcon ? {
          scale: [0, 1.2, 1],
          rotate: 0,
          opacity: 1,
          x: 0
        } : {}}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
        className="ml-2 relative"
      >
        <motion.div
          animate={showIcon ? {
            x: [-2, 2, -2],
            y: [-1, 1, -1],
            rotate: [-3, 3, -3],
            scale: [1, 1.05, 1]
          } : {}}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
          className="text-yellow-500 drop-shadow-lg"
        >
          <Trophy className="w-6 h-6 md:w-7 md:h-7" />
        </motion.div>
        
        {/* Particules autour de l'icône */}
        {showIcon && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: Math.cos(i * 60 * Math.PI / 180) * 20,
                  y: Math.sin(i * 60 * Math.PI / 180) * 20,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </div>
  );
}
