export const formatDate = (date) => {
  if (!date) return "";
  if (date === "Present" || date === "present") return "Present";
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d)) return "";
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
  } catch {
    return "";
  }
};
