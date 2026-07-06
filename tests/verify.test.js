import verifyService from "../src/services/verify.service.js";

describe("Verify Service", () => {

  test("verifyChain returns status", async () => {

    const result = await verifyService.verifyChain();

    expect(result).toHaveProperty("status");

  });

  test("status should be PASS or FAIL", async () => {

    const result = await verifyService.verifyChain();

    expect(["PASS","FAIL"]).toContain(result.status);

  });

});