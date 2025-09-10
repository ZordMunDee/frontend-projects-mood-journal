"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MOODS } from "./types";
import type { MoodKey } from "./types";

export default function MoodPicker({
  mood,
  onChange,
}: {
  mood: MoodKey;
  onChange: (m: MoodKey) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">อารมณ์</label>
      <Tabs
        value={mood}
        onValueChange={(v) => onChange(v as MoodKey)}
        className="w-full"
      >
        <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
          {Object.entries(MOODS).map(([key, m]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="h-10 px-3 rounded-xl border
                         data-[state=active]:bg-primary/10
                         data-[state=active]:border-primary
                         data-[state=active]:ring-1 data-[state=active]:ring-primary/30"
            >
              <span className="text-lg" aria-hidden>
                {m.emoji}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(MOODS).map(([key, m]) => (
          <TabsContent key={key} value={key} className="mt-2">
            <Badge variant="secondary" className="rounded-full">
              {m.emoji} {m.label}
            </Badge>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
