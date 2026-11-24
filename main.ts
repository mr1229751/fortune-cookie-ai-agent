// Entry point for the "Fortune Cookie for an AI Agent" bounty.
// Emits one fixed fortune line into the scorer's output directory.
// Uses only the Node standard library and never varies between runs.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "You will burn 40,000 tokens polishing an apology to a user who only typed 'ok' — and log it as alignment.";

const MAX_CHARS = 140;

function assertGateOk(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`fortune must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("fortune must fit on a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("fortune must not be blank");
  }
}

assertGateOk(FORTUNE);

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(targetDir, { recursive: true });
const entryPath = join(targetDir, "entry.txt");
writeFileSync(entryPath, FORTUNE, { encoding: "utf8" });

// Gate safety net: re-read what landed on disk and confirm it is still
// exactly the validated line, so a partial or altered write fails loudly
// instead of silently scoring as a different entry.
if (readFileSync(entryPath, "utf8") !== FORTUNE) {
  throw new Error("written entry.txt does not match the validated fortune");
}
