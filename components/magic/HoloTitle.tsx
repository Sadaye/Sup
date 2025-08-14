"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { launchConfetti } from "@/lib/confetti";

type HoloTitleProps = {
  leadingText: string;
  emphasisText: string;
  className?: string;
};

export default function HoloTitle({ leadingText, emphasisText, className }: HoloTitleProps) {
  const hasFiredRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Motion values for interactive light
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasFiredRef.current && isInView) {
        hasFiredRef.current = true;
        launchConfetti(800);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isInView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Split "métiers d'avenir" into individual words for animation
  const words = emphasisText.split(' ');

  return (
    <div ref={containerRef} className="relative">
      {/* Time running effect - animated line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { 
          scaleX: 1,
          transition: { 
            delay: 0.3, 
            duration: 1.5, 
            ease: "easeInOut" 
          }
        } : {}}
        className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-purple-600 rounded-full mb-4"
        style={{ transformOrigin: "left" }}
      />

      {/* Floating time particles */}
      <div className="absolute top-0 left-0 w-full h-8 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            initial={{
              x: -20,
              y: Math.random() * 20,
              opacity: 0,
              scale: 0
            }}
            animate={isInView ? {
              x: "100vw",
              y: Math.random() * 20,
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            } : {}}
            transition={{
              delay: 0.5 + i * 0.1,
              duration: 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8, 
            ease: "easeOut",
            staggerChildren: 0.1
          }
        } : {}}
        className={[
          "font-bold leading-tight",
          "text-4xl md:text-6xl lg:text-7xl",
          "text-foreground",
          className || "",
        ].join(" ")}
      >
        {/* Leading text */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { 
            opacity: 1, 
            x: 0,
            transition: { delay: 0.6, duration: 0.6 }
          } : {}}
          className="block"
        >
          {leadingText}
        </motion.span>
        
        {/* Emphasis text with interactive effects */}
        <div className="relative">
          {words.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: { 
                  delay: 1.2 + wordIndex * 0.3, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }
              } : {}}
              className="inline-block mr-4 relative"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent relative z-10">
                {word}
              </span>
              
              {/* Floating particles around each word */}
              {[...Array(3)].map((_, particleIndex) => (
                <motion.div
                  key={particleIndex}
                  className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                  initial={{
                    x: Math.random() * 60 - 30,
                    y: Math.random() * 40 - 20,
                    opacity: 0,
                    scale: 0
                  }}
                  animate={isInView ? {
                    x: Math.random() * 60 - 30,
                    y: Math.random() * 40 - 20,
                    opacity: [0, 0.6, 0],
                    scale: [0, 1, 0]
                  } : {}}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: 1.5 + wordIndex * 0.5 + particleIndex * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.span>
          ))}
        </div>
      </motion.h1>

      {/* Interactive light effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 50%)`,
        }}
        animate={{
          opacity: isInView ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Subtle underline animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { 
          scaleX: 1,
          transition: { delay: 2.2, duration: 0.6, ease: "easeOut" }
        } : {}}
        className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"
        style={{ transformOrigin: "left" }}
      />

      {/* Additional floating particles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 200 - 100,
              opacity: 0
            }}
            animate={isInView ? {
              x: Math.random() * 400 - 200,
              y: Math.random() * 200 - 100,
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0]
            } : {}}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: 2 + Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}


