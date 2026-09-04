import { execSync } from "node:child_process";

function getStagedFiles() {
  const output = execSync("git diff --cached --name-only --diff-filter=ACM", {
    encoding: "utf8",
  });
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function quoteForShell(file) {
  return `"${file.replace(/"/g, '\\"')}"`;
}

function run(command) {
  execSync(command, { stdio: "inherit", shell: true });
}

const staged = getStagedFiles();
const stagedSources = staged.filter(
  (file) => /\.(ts|tsx)$/.test(file) && !/\.test\.(ts|tsx)$/.test(file),
);
const stagedTests = staged.filter((file) => /\.test\.(ts|tsx)$/.test(file));
const relatedInputs = [...new Set([...stagedSources, ...stagedTests])];

if (relatedInputs.length > 0) {
  console.log(`Running related tests for ${relatedInputs.length} staged file(s)...`);
  try {
    run(`npx vitest related --run ${relatedInputs.map(quoteForShell).join(" ")}`);
  } catch {
    process.exit(1);
  }
} else {
  console.log("No staged TypeScript sources or tests; skipping related tests.");
}

console.log("\nRunning full test suite with 85%+ coverage threshold...");
try {
  run("npm run test:coverage");
} catch {
  process.exit(1);
}
