/* eslint-disable @typescript-eslint/no-explicit-any */

export default function debounce(
  callback: (...args: any[]) => void,
  delay = 500,
) {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(args);
      timeoutId = null;
    }, delay);
  };
}
