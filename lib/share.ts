export function buildShareURL(
  rangeStart: string,
  rangeEnd: string,
  mood: string
) {
  const url = new URL(window.location.href);
  url.searchParams.set("from", rangeStart);
  url.searchParams.set("to", rangeEnd);
  if (mood !== "all") url.searchParams.set("mood", mood);
  return url.toString();
}
