import { type } from 'arktype'

import { ConfigLoaderMode } from '@/config-file/config-loader-mode.js'
import type { LoadAndResolveConfigOptions } from '@/config-file/load-config.js'
import { Config } from '@/config-file/resolve-config.js'

const BufferEncoding = type('string').narrow((v) => Buffer.isEncoding(v))
type BufferEncoding = typeof BufferEncoding.infer

export const CliOptions = Config.and({
  'config?': 'string',
  'config.loader?': ConfigLoaderMode,
  'config.encoding?': BufferEncoding,
  'config.tsconfig?': 'string',
})

export type CliOptions = typeof CliOptions.infer

export type ResolvedCliOptions = LoadAndResolveConfigOptions

export function resolveCliOptions(options: Record<string, unknown>): ResolvedCliOptions {
  const data = CliOptions.assert(options)

  return {
    package: data.package,
    tsconfig: data.tsconfig,
    config: {
      filePath: data.config,
      loader: data['config.loader'],
      json: {
        encoding: data['config.encoding'],
      },
      yaml: {
        encoding: data['config.encoding'],
      },
      bundle: {
        tsconfig: data['config.tsconfig'] ?? data.tsconfig,
      },
    },
  }
}
