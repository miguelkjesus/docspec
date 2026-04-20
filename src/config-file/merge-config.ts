import type { Config } from './resolve-config.js'

export function mergeConfig(base: Config, overrides: Config): Config {
  return {
    package: overrides.package ?? base.package,
    tsconfig: overrides.tsconfig ?? base.tsconfig,
  }
}
