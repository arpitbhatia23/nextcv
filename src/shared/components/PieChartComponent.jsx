import { memo, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CustomTooltip } from "./CustomTooltip";
export const PieChartComponent = memo(({ data, COLORS, LINE }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          labelLine={!isMobile}
          label={isMobile ? false : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={isMobile ? 65 : 80}
          innerRadius={isMobile ? 40 : 0}
          paddingAngle={isMobile ? 3 : 0}
          dataKey="value"
          stroke="#FFFFFF"
          strokeWidth={2}
        >
          {data?.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip LINE={LINE} />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ fontSize: 10, paddingTop: 10, fontFamily: "'IBM Plex Mono', monospace" }}
          iconType="square"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  );
});
PieChartComponent.displayName = "PieChartComponent";
