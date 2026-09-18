export const toNum = (v) => {
  if (typeof v === "number") return isFinite(v) ? v : 0;
  if (typeof v === "string") {
    const cleaned = v.replace(/[^\d.-]/g, "");
    const n = parseFloat(cleaned);
    return isFinite(n) ? n : 0;
  }
  return 0;
};

export const safeDate = (d) => {
  if (!d) return null;
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? null : dt;
};

export const formatNumber = (v) => {
  return toNum(v).toLocaleString("fr-FR");
};

export const formatDate = (d) => {
  const dt = safeDate(d);
  if (!dt) return "Date inconnue";
  return dt.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateShort = (d) => {
  const dt = safeDate(d);
  if (!dt) return "—";
  return dt.toLocaleDateString("fr-FR");
};

export const sumBy = (arr, key) => {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((s, item) => s + toNum(item?.[key]), 0);
};

export const groupByMonth = (arr, dateKey, valueKey, year) => {
  const moisNoms = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  return moisNoms.map((mois, idx) => {
    const filtered = (arr || []).filter((item) => {
      const d = safeDate(item?.[dateKey]);
      return d && d.getMonth() === idx && d.getFullYear() === year;
    });
    return {
      mois,
      value: sumBy(filtered, valueKey),
    };
  });
};

export const sortByDateDesc = (arr, dateKey = "date") => {
  return [...(arr || [])].sort((a, b) => {
    const da = safeDate(a?.[dateKey]);
    const db = safeDate(b?.[dateKey]);
    if (!da && !db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return db - da;
  });
};