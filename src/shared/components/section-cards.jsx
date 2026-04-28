"use client";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import sectionServer from "@/Server_components/sectionServer";
import { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

// Reusable Badge component for growth display
function GrowthBadge({ value }) {
  if (value === null || value === undefined) return null;
  const isUp = value >= 0;
  return (
    <Badge variant="outline" className={`text-xs ${isUp ? "text-green-600" : "text-red-600"}`}>
      {isUp ? <IconTrendingUp className="h-3 w-3" /> : <IconTrendingDown className="h-3 w-3" />}
      {isUp ? "+" : ""}
      {value}%
    </Badge>
  );
}

function SectionCards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await sectionServer();
      setData(res);
    };
    fetchData().catch(console.error);
  }, []);

  const sendReminders = async () => {
    try {
      const res = await axios.get("/api/admin/set-remider");
      toast(res?.data?.message || "Reminders sent");
    } catch (err) {
      console.error(err);
      toast("Failed to send reminders");
    }
  };

  return (
    <>
      <div className="flex justify-end px-3 sm:px-4 lg:px-6 mb-2 sm:mb-3">
        <button
          onClick={sendReminders}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
        >
          Send Resume Reminders
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 px-3 sm:px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {/* Total Revenue */}
        <Card className="@container/card *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs">
          <CardHeader className="pb-1 sm:pb-2">
            <CardDescription className="text-xs">Total Revenue</CardDescription>
            <CardTitle className="text-base sm:text-xl lg:text-2xl font-bold tabular-nums">
              <div className="flex items-center gap-1">
                <IndianRupee className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {data?.paymentThisMonth || 0}
              </div>
            </CardTitle>
            <CardAction>
              <GrowthBadge value={data?.paymentGrowth} />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-0.5 pt-0">
            <div className="text-xs text-muted-foreground hidden sm:block">
              {data?.paymentGrowth >= 0 ? "↑ Trending up" : "↓ Trending down"} this month
            </div>
            <div className="text-xs text-muted-foreground">Last 1 month</div>
          </CardFooter>
        </Card>

        {/* New Customers */}
        <Card className="@container/card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardDescription className="text-xs">New Customers</CardDescription>
            <CardTitle className="text-base sm:text-xl lg:text-2xl font-bold tabular-nums">
              {data?.newUsers || 0}
            </CardTitle>
            <CardAction>
              <GrowthBadge value={data?.newUserGrowth} />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-0.5 pt-0">
            <div className="text-xs text-muted-foreground hidden sm:block">
              {data?.newUserGrowth >= 0 ? "↑ Up" : "↓ Down"} {Math.abs(data?.newUserGrowth || 0)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {data?.newUserGrowth >= 0 ? "Acquisition growing" : "Needs attention"}
            </div>
          </CardFooter>
        </Card>

        {/* Active Users */}
        <Card className="@container/card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardDescription className="text-xs">Active Accounts</CardDescription>
            <CardTitle className="text-base sm:text-xl lg:text-2xl font-bold tabular-nums">
              {data?.activeUsers || 0}
            </CardTitle>
            <CardAction>
              <GrowthBadge value={data?.activeUserGrowth} />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-0.5 pt-0">
            <div className="text-xs text-muted-foreground hidden sm:block">
              {data?.activeUserGrowth >= 0 ? "↑" : "↓"} {Math.abs(data?.activeUserGrowth || 0)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {data?.activeUserGrowth >= 0 ? "Strong retention" : "Engagement dropped"}
            </div>
          </CardFooter>
        </Card>

        {/* Growth Rate */}
        <Card className="@container/card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardDescription className="text-xs">Growth Rate</CardDescription>
            <CardTitle className="text-base sm:text-xl lg:text-2xl font-bold tabular-nums">
              {data?.userGrowth?.[0]?.growthRate || 0}%
            </CardTitle>
            <CardAction>
              <GrowthBadge value={data?.userGrowth?.[0]?.growthRate} />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-0.5 pt-0">
            <div className="text-xs text-muted-foreground hidden sm:block">
              {data?.userGrowth?.[0]?.growthRate >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(data?.userGrowth?.[0]?.growthRate || 0)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {data?.userGrowth?.[0]?.growthRate >= 0 ? "Meets projections" : "Growth declining"}
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SectionCards;
