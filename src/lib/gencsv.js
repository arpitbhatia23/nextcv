// Additional helper functions for CSV export

export async function exportAnalyticsCSV({ data, section }) {
  const sectionobj = {
    users: convertToCSV([
      { metric: "Total Users", value: data.userStats.totalUsers },
      { metric: "Active Users", value: data.userStats.activeUsers },
      { metric: "Admin Count", value: data.userStats.adminCount },
    ]),

    resumes: convertToCSV([
      { metric: "Total Resumes", value: data.resumeStats.totalResumes },
      { metric: "Paid Resumes", value: data.resumeStats.paidResumes },
      { metric: "Draft Resumes", value: data.resumeStats.draftResumes },
      ...data.resumeStats.topSkills.map((skill) => ({
        metric: `Skill: ${skill.skill.name}`,
        value: skill.count,
      })),
    ]),
    payments: convertToCSV([
      { metric: "Total Revenue", value: data.paymentStats.totalRevenue },
      {
        metric: "Average Transaction",
        value: data.paymentStats.avgTransactionValue,
      },
      ...data.paymentStats.monthlyRevenue.map((month) => ({
        metric: `Revenue ${month.month}`,
        value: month.revenue,
      })),
    ]),
    coupons: convertToCSV([
      { metric: "Active Coupons", value: data.couponStats.activeCoupons },
      { metric: "Expired Coupons", value: data.couponStats.expiredCoupons },
      { metric: "Total Discount", value: data.couponStats.totalDiscount },
    ]),
    visitors: convertToCSV([
      { metric: "Total Visitors", value: data.visitorStats.totalVisitors },
      ...data.visitorStats.dailyVisitors.slice(-30).map((day) => ({
        metric: `Visitors ${day.date}`,
        value: day.visitors,
      })),
    ]),
  };

  console.log(sectionobj[section]);

  const blob = new Blob([sectionobj[section]], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const filename = `analytics_${Date.now()}.csv`;

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Helper function to convert data to CSV format
function convertToCSV(data) {
  const headers = ["Metric", "Value"];
  const csvContent = [
    headers.join(","),
    ...data.map((row) => `"${row.metric}",${row.value}`),
  ].join("\n");

  return csvContent;
}
