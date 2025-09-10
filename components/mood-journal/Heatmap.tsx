"use client";
import { useMemo } from "react";
import type { Entry } from "@/components/mood-journal/types";

export default function Heatmap({ entries }: { entries: Entry[] }) {
  // รวม entries เป็นค่าเฉลี่ยต่อวัน
  const daily = useMemo(() => {
    const map: Record<string, number[]> = {};
    entries.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(
        e.mood === "happy"
          ? 5
          : e.mood === "excited"
          ? 4
          : e.mood === "neutral"
          ? 3
          : e.mood === "anxious" || e.mood === "sad"
          ? 2
          : 1
      );
    });
    return Object.fromEntries(
      Object.entries(map).map(([d, arr]) => [
        d,
        arr.reduce((a, b) => a + b, 0) / arr.length,
      ])
    );
  }, [entries]);

  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().slice(0, 10);
  }).reverse();

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((d) => {
        const score = daily[d];
        const color = !score
          ? "bg-gray-200"
          : score >= 4.5
          ? "bg-green-500"
          : score >= 3.5
          ? "bg-blue-400"
          : score >= 2.5
          ? "bg-yellow-400"
          : "bg-red-400";
        return <div key={d} title={d} className={`w-6 h-6 rounded ${color}`} />;
      })}
    </div>
  );
}
