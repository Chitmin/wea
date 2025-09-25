const rateLimitMap = new Map();
const INTERVAL = 10 * 1000; // 10 seconds
const MAX_REQUESTS = 1;

export function checkRateLimit(key: string) {
  const now = Date.now();
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 1, lastReset: now });
    return true;
  }

  const visited = rateLimitMap.get(key);
  if (now - visited.lastReset > INTERVAL) {
    // greater than interval
    visited.count = 1;
    visited.lastReset = now;
    return true;
  } else if (visited.count < MAX_REQUESTS) {
    visited.count++;
    return true;
  } else {
    return false; // Rate limit exceeded
  }
}
