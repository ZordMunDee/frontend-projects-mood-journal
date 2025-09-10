export function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function nowHM(): string {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function sevenDaysAgo(): string {
  const d = new Date();
  d.setDate(d.getDate() - 6);
  return d.toISOString().slice(0, 10);
}

export function enumerateDates(startISO: string, endISO: string): string[] {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const out: string[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    out.push(new Date(d).toISOString().slice(0, 10));
  }
  return out;
}

/**
 * คืนค่าเป็นสตริงที่ปลอดภัยสำหรับ CSV:
 * - ครอบด้วยเครื่องหมายคำพูดถ้ามี comma/quote/newline
 * - escape เครื่องหมายคำพูดคู่เป็น "" ตามมาตรฐาน RFC4180
 */
export function safeCSV(
  value: string | number | boolean | null | undefined | Date
): string {
  const v =
    value instanceof Date
      ? value.toISOString()
      : value == null
      ? ""
      : String(value);

  if (/[",\n]/.test(v)) return `"${v.replaceAll('"', '""')}"`;
  return v;
}

export function splitCSV(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQ = false;
        }
      } else {
        cur += ch;
      }
    } else {
      if (ch === ",") {
        out.push(cur);
        cur = "";
      } else if (ch === '"') {
        inQ = true;
      } else {
        cur += ch;
      }
    }
  }
  out.push(cur);
  return out;
}
