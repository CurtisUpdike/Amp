export default function formatMilliseconds(durationInMillis: number): string {
  const seconds = durationInMillis / 1000;
  return window.MusicKit.formatMediaTime(seconds);
}
