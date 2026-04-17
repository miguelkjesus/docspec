import type { ResolvedConfig } from './parse-config.js'

export function mergeConfig(
  base: ResolvedConfig,
  overrides: Partial<ResolvedConfig>,
): ResolvedConfig {
  return {
    package: overrides.package ?? base.package,
    tsconfig: overrides.tsconfig ?? base.tsconfig,
  }
}
