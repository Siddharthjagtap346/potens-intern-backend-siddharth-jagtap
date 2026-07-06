import { sha256 } from "./hash.js";

function pairHash(left, right) {
  return sha256(left + right);
}

export function buildMerkleRoot(hashes) {
  if (!hashes || hashes.length === 0) {
    return null;
  }

  if (hashes.length === 1) {
    return hashes[0];
  }

  let level = [...hashes];

  while (level.length > 1) {
    const nextLevel = [];

    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = level[i + 1] || left;

      nextLevel.push(pairHash(left, right));
    }

    level = nextLevel;
  }

  return level[0];
}