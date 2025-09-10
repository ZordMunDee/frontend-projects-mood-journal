"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TrendChart({
  data,
}: {
  data: Array<{ date: string; score: number | null }>;
}) {
  const hasData = data.some((d) => d.score !== null);

  return (
    <div className="h-64 md:h-72">
      {!hasData && (
        <div className="text-center text-sm text-muted-foreground mb-2">
          ยังไม่มีข้อมูลในช่วงนี้ •
          ลองบันทึกอารมณ์ทางซ้ายแล้วกลับมาดูกราฟอีกครั้ง
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
        >
          <CartesianGrid strokeDasharray="2 4" strokeOpacity={0.4} />
          <XAxis dataKey="date" tickMargin={6} />
          <YAxis
            domain={[0, 5]}
            ticks={[1, 2, 3, 4, 5]}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip formatter={(v: any) => (v == null ? "ไม่มีข้อมูล" : v)} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
