// Entry point for the "Fortune Cookie for an AI Agent" bounty.
// Emits one fixed fortune line into the scorer's output directory.
// Uses only the Node standard library and never varies between runs.

import { mkdirSync, writeFileSync } from "node:fs";
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
writeFileSync(join(targetDir, "entry.txt"), FORTUNE, { encoding: "utf8" });
