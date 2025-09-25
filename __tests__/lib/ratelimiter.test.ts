import { checkRateLimit } from "../../src/lib/ratelimiter";

// Add a type declaration for rateLimitMap on the global object
declare global {
  // eslint-disable-next-line no-var
  var rateLimitMap: Map<string, any>;
}

describe("checkRateLimit", () => {
  beforeEach(() => {
    // Clear the rateLimitMap before each test
    global.rateLimitMap = new Map();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should allow the first request", () => {
    expect(checkRateLimit("test-key")).toBe(true);
  });

  it("should rate limit subsequent requests within the interval", () => {
    checkRateLimit("test-key");
    expect(checkRateLimit("test-key")).toBe(false);
  });

  it("should allow requests after the interval", () => {
    checkRateLimit("test-key");
    jest.advanceTimersByTime(10001);
    expect(checkRateLimit("test-key")).toBe(true);
  });

  it("should allow requests for different keys", () => {
    checkRateLimit("test-key-1");
    expect(checkRateLimit("test-key-2")).toBe(true);
  });

  it("should handle maximum requests correctly", () => {
    const MAX_REQUESTS = 1;
    let allowedCount = 0;
    for (let i = 0; i < MAX_REQUESTS + 1; i++) {
      if (checkRateLimit("test-key-unique")) {
        allowedCount++;
      }
    }
    expect(allowedCount).toBe(MAX_REQUESTS);
  });
});
