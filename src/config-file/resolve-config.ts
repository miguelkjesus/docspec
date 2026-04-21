import path from 'node:path'

import { type } from 'arktype'

import { findUp } from '@/utils/find.js'

export const Config = type({
  /**
   * The path to the package's package.json file.
   */
  'package?': 'string | undefined',

  /**
   * The path to the package's tsconfig.json file.
   */
  'tsconfig?': 'string | undefined',
})

export type Config = Readonly<typeof Config.infer>

export type ResolvedConfig = Readonly<{
  package: string
  tsconfig?: string
}>

export type ParseConfigOptions = Readonly<{
  cwd?: string
}>

export async function resolveConfig(
  config: Config,
  { cwd }: ParseConfigOptions = {},
): Promise<ResolvedConfig> {
  // #package

  const packageJson = config.package ?? (await findUp.first('package.json', { cwd }))

  if (!packageJson) {
    throw new Error('Could not find a package.json file.')
  }

  const packageDirectory = path.dirname(packageJson)

  // #tsconfig

  const tsconfig =
    config.tsconfig ?? (await findUp.first('tsconfig.json', { cwd: packageDirectory }))

  return {
    package: packageJson,
    tsconfig,
  }
}
