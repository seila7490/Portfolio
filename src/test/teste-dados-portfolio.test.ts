import { describe, expect, it } from "vitest";
import { boundedPage, contactEmail, projects, suggestedPrices } from "@/lib/dados-portfolio";

describe("Portfolio requirements", () => {
  it("presents the three projects in the user-defined semester order", () => {
    expect(projects.map((p) => [p.year, p.semester, p.url])).toEqual([
      [2025, 1, "https://time-s-book.vercel.app/inicial"],
      [2025, 2, "https://hair-plus-main.vercel.app"],
      [2026, 1, "https://scarin-sage.vercel.app"],
    ]);
  });
  it("uses the exact contact email supplied by the user", () => {
    expect(contactEmail).toBe("seila74900@gmail.com");
  });
  it("preserves the initial development price range", () => {
    expect([suggestedPrices.developmentMin, suggestedPrices.developmentMax]).toEqual([800, 900]);
  });
  it("preserves the initial monthly maintenance price range", () => {
    expect([suggestedPrices.maintenanceMin, suggestedPrices.maintenanceMax]).toEqual([149, 399]);
  });
  it("keeps navigation within the book", () => {
    expect(boundedPage(-5)).toBe(0);
    expect(boundedPage(25)).toBe(13);
    expect(boundedPage(NaN)).toBe(0);
  });
});
