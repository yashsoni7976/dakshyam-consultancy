import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const COVERAGE_MIN = 85;

/** Mirrors vitest.config.mts coverage.include — files we assert on. */
const COVERAGE_SCOPED =
  /^(lib\/(?!content\/types\.ts).+\.ts|components\/.+\.tsx|app\/actions\/.+\.ts)$/;

function getStagedFiles() {
  const output = execSync("git diff --cached --name-only --diff-filter=ACM", {
    encoding: "utf8",
  });
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function isCoverageScoped(file) {
  if (/\.test\.(ts|tsx)$/.test(file)) return false;
  return COVERAGE_SCOPED.test(file.replace(/\\/g, "/"));
}

function quoteForShell(file) {
  return `"${file.replace(/"/g, '\\"')}"`;
}

function findCoverageEntry(summary, stagedFile) {
  const normalized = stagedFile.replace(/\\/g, "/");
  return Object.entries(summary).find(
    ([key]) => key !== "total" && key.replace(/\\/g, "/").endsWith(normalized),
  );
}

const staged = getStagedFiles();
const scopedSource = staged.filter(isCoverageScoped);
const stagedTests = staged.filter((file) => /\.test\.(ts|tsx)$/.test(file));
const vitestInputs = [...new Set([...scopedSource, ...stagedTests])];

if (vitestInputs.length === 0) {
  console.log("No staged TypeScript sources or tests; skipping test run.");
  process.exit(0);
}

console.log(`Running related tests for ${vitestInputs.length} staged file(s)...`);

try {
  execSync(
    [
      "npx vitest related --run --coverage",
      "--coverage.thresholds.lines=0",
      "--coverage.thresholds.statements=0",
      "--coverage.thresholds.branches=0",
      "--coverage.thresholds.functions=0",
      ...vitestInputs.map(quoteForShell),
    ].join(" "),
    { stdio: "inherit", shell: true },
  );
} catch {
  process.exit(1);
}

if (scopedSource.length === 0) {
  console.log(
    "No coverage-scoped source files staged; skipping per-file coverage check.",
  );
  process.exit(0);
}

const summaryPath = resolve("coverage/coverage-summary.json");
if (!existsSync(summaryPath)) {
  console.error("Coverage summary not found after test run.");
  process.exit(1);
}

const summary = JSON.parse(readFileSync(summaryPath, "utf8"));
const failures = [];

for (const file of scopedSource) {
  const entry = findCoverageEntry(summary, file);
  if (!entry) {
    failures.push(`${file}: missing from coverage report (add or update tests)`);
    continue;
  }

  const [, metrics] = entry;
  for (const metric of ["lines", "statements", "branches", "functions"]) {
    const pct = metrics[metric]?.pct ?? 0;
    if (pct < COVERAGE_MIN) {
      failures.push(`${file}: ${metric} ${pct}% < ${COVERAGE_MIN}%`);
    }
  }
}

if (failures.length > 0) {
  console.error(`\nStaged-file coverage must be at least ${COVERAGE_MIN}%:\n`);
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log(
  `\nAll ${scopedSource.length} staged source file(s) meet ${COVERAGE_MIN}%+ coverage.`,
);
