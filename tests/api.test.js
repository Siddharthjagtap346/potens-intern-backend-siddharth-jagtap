import request from "supertest";
import app from "../src/server.js";

const API_KEY = "potens-secret-api-key";

describe("API Tests", () => {

  test("GET /health", async () => {
    const res = await request(app)
      .get("/health")
      .set("x-api-key", API_KEY);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("POST /log should create a log", async () => {
    const res = await request(app)
      .post("/log")
      .set("x-api-key", API_KEY)
      .send({
        actor: "Tester",
        action: "LOGIN",
        payload: {
          browser: "Chrome"
        }
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.actor).toBe("Tester");
  });

  test("GET /verify", async () => {
    const res = await request(app)
      .get("/verify")
      .set("x-api-key", API_KEY);

    expect([200,409]).toContain(res.statusCode);
  });

  test("GET /export", async () => {
    const res = await request(app)
      .get("/export")
      .set("x-api-key", API_KEY);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("Missing API Key should block protected route", async () => {
  const res = await request(app)
    .post("/log")   // protected route instead
    .send({
      actor: "Tester",
      action: "LOGIN",
      payload: {}
    });

  expect(res.statusCode).toBe(401);
});

});