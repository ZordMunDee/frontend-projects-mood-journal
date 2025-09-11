"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Download, Upload, Trash2 } from "lucide-react";

import MoodPicker from "./MoodPicker";
import FiltersBar from "./FiltersBar";
import TrendChart from "./TrendChart";
import EntriesList from "./EntriesList";
import Heatmap from "@/components/mood-journal/Heatmap";
import { buildShareURL } from "@/lib/share";

import type { Entry, MoodKey } from "./types";
import { MOODS } from "./types";
import {
  uid,
  todayISO,
  nowHM,
  sevenDaysAgo,
  enumerateDates,
  safeCSV,
  splitCSV,
} from "@/lib/mood-utils";

const STORAGE_KEY = "mood-journal-entries-v1";

export default function MoodJournal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState(nowHM());
  const [mood, setMood] = useState<MoodKey>("neutral");
  const [note, setNote] = useState("");

  const [filterMood, setFilterMood] = useState<MoodKey | "all">("all");
  const [rangeStart, setRangeStart] = useState(sevenDaysAgo());
  const [rangeEnd, setRangeEnd] = useState(todayISO());

  // Load / Save localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: Entry[] = JSON.parse(raw);
      setEntries(parsed);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // Derived
  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const inMood = filterMood === "all" ? true : e.mood === filterMood;
      return inMood && e.date >= rangeStart && e.date <= rangeEnd;
    });
  }, [entries, filterMood, rangeStart, rangeEnd]);

  const chartData = useMemo(() => {
    const days = enumerateDates(rangeStart, rangeEnd);
    return days.map((d) => {
      const list = filtered.filter((e) => e.date === d);
      const avg = list.length
        ? list.reduce((s, e) => s + MOODS[e.mood].score, 0) / list.length
        : null;
      return { date: d.slice(5), score: avg };
    });
  }, [filtered, rangeStart, rangeEnd]);

  // Actions
  function addEntry() {
    if (!note.trim()) return;
    const e: Entry = { id: uid(), date, time, mood, note: note.trim() };
    setEntries((prev) => [e, ...prev]);
    setNote("");
    setTime(nowHM());
  }

  function deleteEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function clearAll() {
    if (confirm("ลบข้อมูลทั้งหมด?")) setEntries([]);
  }

  function exportCSV() {
    const headers = ["id", "date", "time", "mood", "note"];
    const rows = entries.map((e) => [
      e.id,
      e.date,
      e.time,
      e.mood,
      e.note.replaceAll("\n", " "),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map(safeCSV).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mood-journal-${todayISO()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importCSV(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result);
        const lines = text.split(/\r?\n/).filter(Boolean);
        const [head, ...body] = lines;
        const cols = head.split(",");
        const idx = Object.fromEntries(cols.map((c, i) => [c.trim(), i]));
        const next: Entry[] = body.map((line) => {
          const parts = splitCSV(line);
          return {
            id: parts[idx.id] || uid(),
            date: parts[idx.date] || todayISO(),
            time: parts[idx.time] || "00:00",
            mood: (parts[idx.mood] as MoodKey) || "neutral",
            note: parts[idx.note] || "",
          };
        });
        setEntries((prev) => [...next, ...prev]);
      } catch {
        alert("ไฟล์ CSV ไม่ถูกต้อง");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Mood Journal
        </h1>
        <p className="text-muted-foreground mt-1">
          บันทึกอารมณ์รายวัน + กราฟสรุป • ยืดหยุ่นและใช้งานง่าย
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <section aria-label="แบบฟอร์มบันทึกอารมณ์">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 md:p-6 space-y-4">
              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> วันที่
                  </label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" /> เวลา
                  </label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Mood */}
              <MoodPicker mood={mood} onChange={setMood} />

              {/* Note */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  โน้ตสั้น ๆ
                </label>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="วันนี้รู้สึกยังไง..."
                  rows={4}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={addEntry} disabled={!note.trim()}>
                  บันทึก
                </Button>

                <Button
                  variant="secondary"
                  onClick={exportCSV}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" /> Export
                </Button>

                <label className="inline-flex items-center gap-2 cursor-pointer rounded-md border px-3 py-2 text-sm">
                  <Upload className="h-4 w-4" />
                  <span>Import CSV</span>
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) importCSV(f);
                    }}
                  />
                </label>

                <div className="ms-auto">
                  <Button
                    variant="destructive"
                    onClick={clearAll}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" /> ล้างทั้งหมด
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Filters + Chart + Heatmap + List */}
        <section
          className="lg:col-span-2 space-y-6"
          aria-label="กรอง ดูกราฟ ฮีทแมพ และรายการ"
        >
          {/* Filters + Chart */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Filters */}
                <FiltersBar
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  filterMood={filterMood}
                  onChangeStart={setRangeStart}
                  onChangeEnd={setRangeEnd}
                  onChangeMood={setFilterMood}
                />

                {/* Share button */}
                <Button
                  variant="secondary"
                  onClick={() => {
                    const url = buildShareURL(rangeStart, rangeEnd, filterMood);
                    navigator.clipboard.writeText(url);
                    alert("📋 ลิงก์คัดลอกแล้ว!");
                  }}
                >
                  Share
                </Button>
              </div>

              {/* Chart */}
              <TrendChart data={chartData} />
            </CardContent>
          </Card>

          {/* Heatmap */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-2">
                Mood Heatmap (30 days)
              </h2>
              <Heatmap entries={entries} />
            </CardContent>
          </Card>

          {/* Entries List */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-0">
              <EntriesList entries={filtered} onDelete={deleteEntry} />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
