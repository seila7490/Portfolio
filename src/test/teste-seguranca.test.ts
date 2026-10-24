import { describe, expect, it } from "vitest";
import { methodNotAllowedResponse, withSecurityHeaders } from "@/lib/cabecalhos-seguranca";

describe("controles HTTP de segurança", () => {
  it("aplica headers sem habilitar CORS aberto", () => {
    const response = withSecurityHeaders(new Response("ok"));

    expect(response.headers.get("content-security-policy")).toContain("default-src 'self'");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
  });

  it("rejeita métodos que não pertencem ao site estático", async () => {
    const response = methodNotAllowedResponse();

    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("GET, HEAD");
    expect(await response.text()).toBe("Method Not Allowed");
  });
});
