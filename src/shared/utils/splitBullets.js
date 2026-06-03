export const splitToBullets = desc => {
  let lines = [];

  if (Array.isArray(desc)) {
    lines = desc;
  } else if (typeof desc === "string") {
    lines = desc.split("\n"); // not "/n"
  } else {
    return [];
  }

  return lines
    .flatMap(line => {
      const trimmed = String(line).trim();
      if (!trimmed) return [];

      const clean = trimmed.replace(/•/g, "").trim();

      return clean
        .split(/\.(?=\s+[A-Z])/g) // split sentence dot, not 7.12
        .map(b => b.trim())
        .filter(Boolean);
    })
    .filter(Boolean);
};
