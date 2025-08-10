"use client";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import sectionServer from "../Server_components/sectionServer";
import { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";

// Reusable Badge component for growth display
function GrowthBadge({ value }) {
  if (value === null || value === undefined) return null;
  const isUp = value >= 0;
  return (
    <Badge
      variant="outline"
      className={isUp ? "text-green-600" : "text-red-600"}
    >
      {isUp ? <IconTrendingUp /> : <IconTrendingDown />}
      {isUp ? "+" : ""}
      {value}%
    </Badge>
  );
}

function SectionCards() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await sectionServer();
    setData(res);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Revenue */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <div className="flex items-center gap-2">
              <IndianRupee /> {data?.paymentThisMonth || 0}
            </div>
          </CardTitle>
          <CardAction>
            <GrowthBadge value={data?.paymentGrowth} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.paymentGrowth >= 0 ? "Trending up" : "Trending down"} this
            month{" "}
            {data?.paymentGrowth >= 0 ? (
              <IconTrendingUp className="size-4 text-green-600" />
            ) : (
              <IconTrendingDown className="size-4 text-red-600" />
            )}
          </div>
          <div className="text-muted-foreground">
            Payments in the last 1 month
          </div>
        </CardFooter>
      </Card>

      {/* New Customers */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.newUsers || 0}
          </CardTitle>
          <CardAction>
            <GrowthBadge value={data?.newUserGrowth} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.newUserGrowth >= 0 ? "Up" : "Down"}{" "}
            {Math.abs(data?.newUserGrowth || 0)}%
            {data?.newUserGrowth >= 0 ? (
              <IconTrendingUp className="size-4 text-green-600" />
            ) : (
              <IconTrendingDown className="size-4 text-red-600" />
            )}
          </div>
          <div className="text-muted-foreground">
            {data?.newUserGrowth >= 0
              ? "New user acquisition increasing"
              : "Acquisition needs attention"}
          </div>
        </CardFooter>
      </Card>

      {/* Active Users */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.activeUsers || 0}
          </CardTitle>
          <CardAction>
            <GrowthBadge value={data?.activeUserGrowth} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.activeUserGrowth >= 0 ? "Up" : "Down"}{" "}
            {Math.abs(data?.activeUserGrowth || 0)}%
            {data?.activeUserGrowth >= 0 ? (
              <IconTrendingUp className="size-4 text-green-600" />
            ) : (
              <IconTrendingDown className="size-4 text-red-600" />
            )}
          </div>
          <div className="text-muted-foreground">
            {data?.activeUserGrowth >= 0
              ? "Strong user retention"
              : "Engagement has dropped"}
          </div>
        </CardFooter>
      </Card>

      {/* Overall Growth Rate */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.userGrowth[0]?.growthRate || 0}%
          </CardTitle>
          <CardAction>
            <GrowthBadge value={data?.userGrowth[0]?.growthRate} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.userGrowth[0]?.growthRate >= 0 ? "Up" : "Down"}{" "}
            {Math.abs(data?.userGrowth[0]?.growthRate || 0)}%
            {data?.userGrowth[0]?.growthRate >= 0 ? (
              <IconTrendingUp className="size-4 text-green-600" />
            ) : (
              <IconTrendingDown className="size-4 text-red-600" />
            )}
          </div>
          <div className="text-muted-foreground">
            {data?.userGrowth[0]?.growthRate >= 0
              ? "Meets growth projections"
              : "Growth is declining"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SectionCards;
