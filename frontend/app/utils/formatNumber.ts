export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + ' млн.'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + ' тыс.'
  }
  return num.toString()
}
