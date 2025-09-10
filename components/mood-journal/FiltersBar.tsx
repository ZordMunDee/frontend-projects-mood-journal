"use client";
import { Input } from "@/components/ui/input";
import type { MoodKey } from "./types";
import { MOODS } from "./types";

export default function FiltersBar({
  rangeStart,
  rangeEnd,
  filterMood,
  onChangeStart,
  onChangeEnd,
  onChangeMood,
}: {
  rangeStart: string;
  rangeEnd: string;
  filterMood: MoodKey | "all";
  onChangeStart: (v: string) => void;
  onChangeEnd: (v: string) => void;
  onChangeMood: (m: MoodKey | "all") => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <label className="text-sm font-medium">ตั้งแต่วันที่</label>
        <Input
          type="date"
          value={rangeStart}
          onChange={(e) => onChangeStart(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-medium">ถึงวันที่</label>
        <Input
          type="date"
          value={rangeEnd}
          onChange={(e) => onChangeEnd(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-medium">กรองอารมณ์</label>
        <select
          className="w-full h-10 rounded-md border bg-background px-3 text-sm"
          value={filterMood}
          onChange={(e) => onChangeMood(e.target.value as MoodKey | "all")}
          aria-label="กรองอารมณ์"
        >
          <option value="all">ทั้งหมด</option>
          {Object.entries(MOODS).map(([k, m]) => (
            <option key={k} value={k}>
              {m.emoji} {m.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
