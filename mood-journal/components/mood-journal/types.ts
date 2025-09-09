export type MoodKey =
  | "happy"
  | "neutral"
  | "sad"
  | "angry"
  | "anxious"
  | "excited";

export type Entry = {
  id: string;
  date: string;
  time: string;
  mood: MoodKey;
  note: string;
};

export const MOODS: Record<
  MoodKey,
  { label: string; emoji: string; score: number; color: string }
> = {
  happy: { label: "มีความสุข", emoji: "😄", score: 5, color: "#22c55e" },
  excited: { label: "ตื่นเต้น", emoji: "🤩", score: 4, color: "#06b6d4" },
  neutral: { label: "เฉย ๆ", emoji: "😐", score: 3, color: "#a3a3a3" },
  anxious: { label: "กังวล", emoji: "😟", score: 2, color: "#f59e0b" },
  sad: { label: "เศร้า", emoji: "😢", score: 2, color: "#3b82f6" },
  angry: { label: "โกรธ", emoji: "😡", score: 1, color: "#ef4444" },
};
