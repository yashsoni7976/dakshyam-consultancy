import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the `use cache` / cacheLife / cacheTag annotations in
  // lib/content/repository.ts. See docs/CONTENT-ARCHITECTURE.md.
  cacheComponents: true,
};

export default nextConfig;
