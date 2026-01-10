export const getResumeId = () => {
  if (typeof window === "undefined") return "temp";
  let id = localStorage.getItem("active-resume-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("active-resume-id", id);
  }
  return id;
};
