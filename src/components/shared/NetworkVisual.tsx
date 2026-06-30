"use client";

import { motion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  r: number;
  active?: boolean;
}

const NODES: Node[] = [
  { x: 40, y: 60, r: 4 },
  { x: 130, y: 30, r: 5 },
  { x: 210, y: 80, r: 7, active: true },
  { x: 300, y: 40, r: 4 },
  { x: 365, y: 95, r: 5 },
  { x: 90, y: 150, r: 5 },
  { x: 200, y: 170, r: 8, active: true },
  { x: 320, y: 150, r: 4 },
  { x: 150, y: 230, r: 4 },
  { x: 260, y: 235, r: 5 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 5],
  [2, 6],
  [3, 7],
  [5, 6],
  [6, 7],
  [5, 8],
  [6, 9],
  [8, 9],
];

export function NetworkVisual({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 270"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {EDGES.map(([a, b], i) => {
        const from = NODES[a];
        const to = NODES[b];
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--charcoal)"
            strokeOpacity={0.12}
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
      {NODES.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={node.active ? "var(--orange)" : "var(--charcoal)"}
          fillOpacity={node.active ? 1 : 0.18}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            node.active
              ? { scale: [1, 1.18, 1], opacity: 1 }
              : { scale: 1, opacity: 1 }
          }
          transition={
            node.active
              ? {
                  scale: { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1 + i * 0.2 },
                  opacity: { duration: 0.5, delay: 0.4 + i * 0.04 },
                }
              : { duration: 0.5, delay: 0.4 + i * 0.04, ease: [0.22, 1, 0.36, 1] }
          }
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        />
      ))}
    </svg>
  );
}
