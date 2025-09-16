export function formatTime (date: string): string {
  return new Date(date).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'})
}