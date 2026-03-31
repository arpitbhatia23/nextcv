export const splitToBullets = desc => {
  // Normalize input into array of lines
  let lines = [];

  if (Array.isArray(desc)) {
    lines = desc;
  } else if (typeof desc === "string") {
    lines = desc.split("/n");
  } else {
    return [];
  }

  return lines
    .flatMap(line => {
      const trimmed = String(line).trim();
      if (!trimmed) return [];
      // Remove bullet symbol if exists
      const clean = trimmed.replace(/•/g, "");
      console.log(clean);
      // Split by semicolon if present
      if (clean.includes(".")) {
        return clean
          .split(".")
          .map(b => b.trim())
          .filter(Boolean);
      }
      console.log([clean].length);

      return [clean];
    })
    .filter(Boolean);
};
