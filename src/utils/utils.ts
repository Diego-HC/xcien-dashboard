export function gtSeverityColor(result: number) {
  if (result >= 75) return "#4CAF50";
  if (result >= 50) return "#FBBF24";
  return "#F44336";
}