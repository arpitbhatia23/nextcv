import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { memo } from "react";
import { CustomTooltip } from "./CustomTooltip";
export const RevenueChart = memo(({ data, LINE, FAINT, BRAND }) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={LINE} vertical={false} />
        <XAxis
          dataKey="month"
          stroke={FAINT}
          tick={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
          tickLine={false}
        />
        <YAxis
          stroke={FAINT}
          tick={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip prefix="₹" LINE={LINE} />} cursor={{ stroke: LINE }} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke={BRAND}
          strokeWidth={2.5}
          dot={{ fill: BRAND, strokeWidth: 0, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});
RevenueChart.displayName = "RevenueChart";
