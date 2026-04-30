"use client";
import { IconTrendingDown, IconTrendingUp, IconCalendar, IconRefresh } from "@tabler/icons-react";
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
import { IndianRupee, Users, Target, Zap } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

function GrowthBadge({ value }) {
  if (value === null || value === undefined) return null;
  const isUp = value >= 0;
  return (
    <Badge variant="outline" className={`text-xs ${isUp ? "text-green-600 font-bold" : "text-red-600 font-bold"}`}>
      {isUp ? <IconTrendingUp className="h-3 w-3" /> : <IconTrendingDown className="h-3 w-3" />}
      {isUp ? "+" : ""}{value}%
    </Badge>
  );
}

function SectionCards() {
  const [data, setData] = useState(null);
  const [range, setRange] = useState("30d");
  const [loading, setLoading] = useState(true);

  const fetchData = async (r = range) => {
    setLoading(true);
    try {
      const res = await sectionServer({ range: r });
      setData(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [range]);

  const sendReminders = async () => {
    try {
      const res = await axios.get("/api/admin/set-remider");
      toast.success(res?.data?.message || "Reminders sent");
    } catch (err) {
      toast.error("Failed to send reminders");
    }
  };

  return (
    <div className="space-y-4 px-3 sm:px-4 lg:px-6">
      {/* Today's Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
         <div className="bg-indigo-600 rounded-xl p-4 text-white shadow-lg overflow-hidden relative group">
            <Zap className="absolute -right-2 -bottom-2 h-24 w-24 text-white/10 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-medium text-white/80 uppercase tracking-wider mb-1">Today's Revenue</p>
            <div className="flex items-baseline gap-2">
               <h3 className="text-2xl font-bold flex items-center gap-1">
                  <IndianRupee className="h-5 w-5" />
                  {data?.metrics?.todayRevenue || 0}
               </h3>
               <span className="text-xs text-white/60">Real-time</span>
            </div>
         </div>
         <div className="bg-slate-900 rounded-xl p-4 text-white shadow-lg overflow-hidden relative group">
            <Users className="absolute -right-2 -bottom-2 h-24 w-24 text-white/10 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-medium text-white/80 uppercase tracking-wider mb-1">New Signups Today</p>
            <h3 className="text-2xl font-bold">{data?.metrics?.todayNewUsers || 0}</h3>
         </div>
         <div className="bg-white border rounded-xl p-4 shadow-sm hidden lg:block">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Conversion Rate</p>
            <div className="flex items-baseline gap-2">
               <h3 className="text-2xl font-bold text-slate-900">{data?.metrics?.conversionRate || 0}%</h3>
               <Badge variant="secondary" className="text-[10px] uppercase">Goal: 5%</Badge>
            </div>
         </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-3 rounded-xl border shadow-xs">
        <div className="flex items-center gap-2">
           <div className="bg-indigo-50 p-2 rounded-lg">
             <IconCalendar className="h-4 w-4 text-indigo-600" />
           </div>
           <div>
              <h2 className="text-sm font-bold text-slate-900">Performance Metrics</h2>
              <p className="text-[10px] text-slate-500">Filters applied for: <span className="font-semibold text-indigo-600">{range.toUpperCase()}</span></p>
           </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-lg w-full sm:w-auto overflow-x-auto scrollbar-hide">
             {["today", "7d", "30d", "90d", "all"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    range === r ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {r.toUpperCase()}
                </button>
             ))}
          </div>
          <button 
             onClick={() => fetchData()} 
             disabled={loading}
             className="p-2 hover:bg-slate-100 rounded-lg transition-colors border shadow-sm bg-white disabled:opacity-50"
          >
             <IconRefresh className={`h-4 w-4 text-slate-600 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="relative overflow-hidden group">
          <CardHeader className="pb-1">
            <CardDescription className="text-xs font-semibold text-slate-500 group-hover:text-indigo-600 transition-colors">Revenue (Range)</CardDescription>
            <CardTitle className="text-xl sm:text-2xl font-black tabular-nums tracking-tight">
              <div className="flex items-center gap-1">
                <IndianRupee className="h-4 w-4 text-indigo-600" />
                {data?.paymentThisMonth || 0}
              </div>
            </CardTitle>
            <CardAction>
              <GrowthBadge value={data?.paymentGrowth} />
            </CardAction>
          </CardHeader>
          <CardFooter className="pt-2 text-[10px] text-slate-400">
             Previous period comparison
          </CardFooter>
        </Card>

        <Card className="relative overflow-hidden group">
          <CardHeader className="pb-1">
            <CardDescription className="text-xs font-semibold text-slate-500 group-hover:text-indigo-600 transition-colors">New Users</CardDescription>
            <CardTitle className="text-xl sm:text-2xl font-black tabular-nums tracking-tight">
              {data?.newUsers || 0}
            </CardTitle>
            <CardAction>
              <GrowthBadge value={data?.newUserGrowth} />
            </CardAction>
          </CardHeader>
          <CardFooter className="pt-2 text-[10px] text-slate-400">
             {data?.newUserGrowth >= 0 ? "Retention positive" : "Needs acquisition review"}
          </CardFooter>
        </Card>

        <Card className="relative overflow-hidden group">
          <CardHeader className="pb-1">
            <CardDescription className="text-xs font-semibold text-slate-500 group-hover:text-indigo-600 transition-colors">Active Reach</CardDescription>
            <CardTitle className="text-xl sm:text-2xl font-black tabular-nums tracking-tight">
              {data?.activeUsers || 0}
            </CardTitle>
            <CardAction>
              <GrowthBadge value={data?.activeUserGrowth} />
            </CardAction>
          </CardHeader>
          <CardFooter className="pt-2 text-[10px] text-slate-400">
             Active users in selected range
          </CardFooter>
        </Card>

        <Card className="relative overflow-hidden group">
          <CardHeader className="pb-1">
            <CardDescription className="text-xs font-semibold text-slate-500 group-hover:text-indigo-600 transition-colors">Growth Rate</CardDescription>
            <CardTitle className="text-xl sm:text-2xl font-black tabular-nums tracking-tight">
              {data?.userGrowth?.[0]?.growthRate || 0}%
            </CardTitle>
            <CardAction>
              <GrowthBadge value={data?.userGrowth?.[0]?.growthRate} />
            </CardAction>
          </CardHeader>
          <CardFooter className="pt-2 text-[10px] text-slate-400">
             Overall acquisition momentum
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-between items-center bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
        <div className="flex items-center gap-3">
           <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-200">
              <Zap className="h-5 w-5 fill-white" />
           </div>
           <div>
              <p className="text-xs font-bold text-indigo-900">Pro Services</p>
              <p className="text-[10px] text-indigo-700">Send personalized follow-ups to inactive users</p>
           </div>
        </div>
        <button
          onClick={sendReminders}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md shadow-indigo-100 flex items-center gap-2"
        >
          Send Bulk Reminders
        </button>
      </div>
    </div>
  );
}

export default SectionCards;

