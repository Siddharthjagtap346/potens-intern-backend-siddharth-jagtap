import { createChainHash, sha256 } from "../src/utils/hash.js";

describe("Hash Utilities", () => {
  test("sha256 should generate a 64-character hash", () => {
    const hash = sha256("hello");

    expect(hash).toHaveLength(64);
  });

  test("same input should produce same hash", () => {
    const hash1 = sha256("potens");

    const hash2 = sha256("potens");

    expect(hash1).toBe(hash2);
  });

  test("chain hash should be deterministic", () => {
    const hash1 = createChainHash({
      actor: "Alice",
      action: "LOGIN",
      payload: {
        ip: "127.0.0.1",
      },
      previousHash: null,
    });

    const hash2 = createChainHash({
      actor: "Alice",
      action: "LOGIN",
      payload: {
        ip: "127.0.0.1",
      },
      previousHash: null,
    });

    expect(hash1).toBe(hash2);
  });

  test("different payload should change hash", () => {
    const hash1 = createChainHash({
      actor: "Alice",
      action: "LOGIN",
      payload: {
        ip: "127.0.0.1",
      },
      previousHash: null,
    });

    const hash2 = createChainHash({
      actor: "Alice",
      action: "LOGIN",
      payload: {
        ip: "192.168.0.1",
      },
      previousHash: null,
    });

    expect(hash1).not.toBe(hash2);
  });
});