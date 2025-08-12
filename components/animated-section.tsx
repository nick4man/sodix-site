"use client"

import { motion, Transition, TargetAndTransition } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  whileInView?: TargetAndTransition;
  transition?: Transition;
  viewport?: { once?: boolean };
}

export const AnimatedSection = ({
  children,
  className = "",
  initial = { opacity: 0, y: 30 },
  animate = { opacity: 1, y: 0 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.8 },
  viewport = { once: true }
}: AnimatedSectionProps) => {
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
};
