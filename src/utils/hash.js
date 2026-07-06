import crypto from "crypto";

/**
 * Convert any JS object into a stable JSON string.
 * Sorting keys ensures identical objects always hash the same.
 */
function sortObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sortObject);
  }

  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        result[key] = sortObject(obj[key]);
        return result;
      }, {});
  }

  return obj;
}

export function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export function hashPayload(payload) {
  const stable = JSON.stringify(sortObject(payload));
  return sha256(stable);
}

export function createChainHash({
  actor,
  action,
  payload,
  previousHash,
}) {
  const payloadHash = hashPayload(payload);

  const chainData = [
    previousHash || "GENESIS",
    actor,
    action,
    payloadHash,
  ].join("|");

  return sha256(chainData);
}