"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { useEffect, useRef } from "react";

type MotionBlockProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({ delay = 0, ...props }: MotionBlockProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    />
  );
}

export function HoverLift(props: MotionBlockProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      {...props}
    />
  );
}

type CountUpProps = {
  value: number | string;
  className?: string;
  suffix?: string;
  duration?: number;
};

function parseCountValue(value: number | string) {
  if (typeof value === "number") {
    return { target: value, suffix: "" };
  }

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { target: 0, suffix: value };
  }

  return {
    target: Number(match[1]),
    suffix: match[2] ?? "",
  };
}

export function CountUp({
  value,
  className,
  suffix,
  duration = 1.2,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const parsed = parseCountValue(value);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const rounded = useTransform(
    springValue,
    (latest) => `${Math.round(latest)}${suffix ?? parsed.suffix}`,
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(parsed.target);
    }
  }, [isInView, motionValue, parsed.target]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}

type SkillMeterProps = {
  value: number;
};

export function SkillMeter({ value }: SkillMeterProps) {
  return (
    <motion.div
      className="h-2 rounded-full bg-gradient-to-r from-primary via-teal-200 to-white"
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
