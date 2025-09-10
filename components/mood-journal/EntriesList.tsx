"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Entry } from "./types";
import { MOODS } from "./types";

export default function EntriesList({
  entries,
  onDelete,
}: {
  entries: Entry[];
  onDelete: (id: string) => void;
}) {
  if (entries.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">
        ยังไม่มีรายการในช่วงเวลานี้
        <br />
        <span className="opacity-80">บันทึกอารมณ์ด้านซ้ายเพื่อเริ่มต้น</span>
      </div>
    );
  }

  return (
    <div role="list" className="divide-y">
      {entries.map((e) => (
        <div key={e.id} role="listitem" className="flex items-center gap-3 p-4">
          <Badge
            style={{ backgroundColor: MOODS[e.mood].color }}
            className="text-white shrink-0"
          >
            {MOODS[e.mood].emoji}
          </Badge>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-muted-foreground">
              {e.date} • {e.time}
            </div>
            <div className="font-medium">{MOODS[e.mood].label}</div>
            {e.note && (
              <div className="mt-1 text-sm whitespace-pre-wrap break-words">
                {e.note}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ms-2 shrink-0 self-center"
            onClick={() => onDelete(e.id)}
            aria-label="ลบรายการ"
            title="ลบรายการ"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
