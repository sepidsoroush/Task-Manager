import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Board } from "../models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COLORS = {
  red: "oklch(70.4% 0.191 22.216)",
  orange: "oklch(78.1% 0.187 56.575)",
  amber: "oklch(82.8% 0.189 84.429)",
  yellow: "oklch(87.1% 0.181 104.355)",
  lime: "oklch(84.1% 0.238 128.85)",
  green: "oklch(75.8% 0.167 142.903)",
  emerald: "oklch(76.5% 0.177 163.223)",
  teal: "oklch(73.8% 0.163 191.918)",
  cyan: "oklch(78.9% 0.154 211.53)",
  sky: "oklch(74.6% 0.16 232.661)",
  blue: "oklch(71.1% 0.173 255.07)",
  indigo: "oklch(71.6% 0.132 273.53)",
  violet: "oklch(75.2% 0.157 292.998)",
  purple: "oklch(74.7% 0.161 308.541)",
  fuchsia: "oklch(75.2% 0.181 315.867)",
  pink: "oklch(75.3% 0.172 331.38)",
  rose: "oklch(73.3% 0.174 28.608)",
  slate: "oklch(69.4% 0.027 257.417)",
  neutral: "oklch(70.4% 0.04 256.788)",
  stone: "oklch(70.2% 0.021 41.788)",
};

export const initialBoards: Board[] = [
  { id: "personal", title: "Personal", color: COLORS.cyan, tasks: [] },
  { id: "work", title: "Work", color: COLORS.amber, tasks: [] },
];
