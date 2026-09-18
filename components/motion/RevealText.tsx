"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { DUR, EASE } from "@/lib/motion";
import { useInView } from "@/lib/useInView";

type RevealTextProps = {
  text: string | readonly string[];
  by?: "word" | "line";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Masked word/line reveal for editorial headlines.
 * Each unit rises from behind an overflow-hidden mask.
 * Uses our own useInView (framer's whileInView is unreliable here).
 */
export function RevealText({
  text,
  by = "line",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  once = true,
  as = "h2",
}: RevealTextProps) {
  const lines = Array.isArray(text) ? text : by === "word" ? String(text).split(" ") : [String(text)];
  const Tag = motion[as];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.2 });

  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={Array.isArray(text) ? text.join(" ") : String(text)}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          aria-hidden
          style={{ display: by === "word" ? "inline-block" : "block", overflow: "hidden" }}
          className={by === "word" ? "mr-[0.25em]" : undefined}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            className={lineClassName}
            variants={{
              hidden: { y: "115%" },
              show: { y: "0%", transition: { duration: DUR.cinematic, ease: EASE.outSoft } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
