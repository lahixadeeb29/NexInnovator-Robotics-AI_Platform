"use client";
import { create } from "zustand";

interface XPStore {
  xp: number;
  addXP: (amount: number) => void;
  resetXP: () => void;
}
interface LangStore {
  lang: "en" | "bn";
  toggleLang: () => void;
  t: (en: string, bn: string) => string;
}

export const useXP = create<XPStore>((set) => ({
  xp: 0,
  addXP: (amount) => set((s) => ({ xp: s.xp + amount })),
  resetXP: () => set({ xp: 0 }),
}));

export const useLang = create<LangStore>((set, get) => ({
  lang: "en",
  toggleLang: () => set((s) => ({ lang: s.lang === "en" ? "bn" : "en" })),
  t: (en, bn) => (get().lang === "en" ? en : bn),
}));

export function xpToLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}
export function xpToNextLevel(xp: number): number {
  const level = xpToLevel(xp);
  return level * level * 100;
}
