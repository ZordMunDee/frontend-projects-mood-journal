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

type DataPoint = { date: string; score: number | null };
type TrendChartProps = { data: DataPoint[] };

export default function TrendChart({ data }: TrendChartProps) {
  const hasData = data.some((d) => d.score !== null);

  return (
    <div className="h-64 md:h-72">
      {!hasData && (
        <div className="mb-2 text-center text-sm text-muted-foreground">
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

          {/* ✅ พิมพ์ type ให้ formatter ชัดเจน แทนการใช้ any */}
          <Tooltip
            formatter={(value: unknown) =>
              value == null ? "ไม่มีข้อมูล" : (value as number)
            }
            labelFormatter={(label: unknown) => String(label)}
          />

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
