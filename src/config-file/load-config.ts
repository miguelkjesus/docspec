import fs from 'node:fs/promises'
import path from 'node:path'

import { type } from 'arktype'
import yaml from 'js-yaml'
import { tsImport } from 'tsx/esm/api'

import { findUp } from '@/utils/find.js'

import { chooseConfigLoaderMode, type ConfigLoaderMode } from './config-loader-mode.js'
import { findConfigFile } from './find-config-file.js'
import { mergeConfig } from './merge-config.js'
import { Config, resolveConfig } from './resolve-config.js'

export type LoadConfigOptions = Readonly<{
  filePath?: string
  loader?: ConfigLoaderMode
  cwd?: string
  json?: {
    encoding?: BufferEncoding
  }
  yaml?: {
    encoding?: BufferEncoding
  }
  bundle?: {
    tsconfig?: string
  }
}>

export async function loadConfig({
  filePath,
  loader,
  cwd,
  ...options
}: LoadConfigOptions = {}): Promise<Config> {
  filePath ??= await findConfigFile(cwd)

  if (!filePath) return Config.assert({})

  loader ??= chooseConfigLoaderMode(path.extname(filePath))

  switch (loader) {
    case 'json': {
      const { encoding = 'utf8' } = options.json ?? {}

      const contents = await fs.readFile(filePath, { encoding })
      const json = JSON.parse(contents) as unknown

      return Config.assert(json)
    }

    case 'yaml': {
      const { encoding = 'utf8' } = options.yaml ?? {}

      const contents = await fs.readFile(filePath, { encoding })
      const yml = yaml.load(contents)

      return Config.assert(yml)
    }

    case 'native': {
      const exports = ConfigExport.assert(await import(filePath))

      return exports.default
    }

    case 'bundle': {
      const { tsconfig = await findUp.first('tsconfig.json', { cwd }) } = options.bundle ?? {}

      const exports = ConfigExport.assert(
        await tsImport(filePath, {
          tsconfig,
          parentURL: import.meta.url,
        }),
      )

      return exports.default
    }

    case undefined:
      throw new Error(
        'Could not decide how to load your config file. Please ensure your file has the correct file extension, or specify --configLoader',
      )
  }
}

export type LoadAndResolveConfigOptions = Config &
  Readonly<{
    config?: LoadConfigOptions
  }>

export async function loadAndResolveConfig(options: LoadAndResolveConfigOptions) {
  const config = await loadConfig(options.config)

  return await resolveConfig(mergeConfig(config, options))
}

const ConfigExport = type({ default: Config })
