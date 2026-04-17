import { Command } from 'commander'

import { loadConfig } from '@/config-file/load-config.js'
import { mergeConfig } from '@/config-file/merge-config.js'
import { parseConfig } from '@/config-file/parse-config.js'

import { CliOptions, parseCliOptions } from './options.js'

import pkg from '#package.json' with { type: 'json' }

interface DocweaverCommand extends Command {
  option(flags: `--${keyof CliOptions} [${string}]`, description: string): this
}

export const program: DocweaverCommand = new Command()

program
  .name('docweaver')
  .description('CLI for docweaver')
  .version(pkg.version)
  .option('--package [file-path]', 'the package.json file of the package to be documented.')
  .option('--tsconfig [file-path]', 'the tsconfig.json file of the package to be documented')
  .option('--config [file-path]', '')
  .option('--config.loader [mode]', '')
  .option('--config.encoding [buffer-encoding]', '')
  .option('--config.json.encoding [buffer-encoding]', '')
  .option('--config.yaml.encoding [buffer-encoding]', '')
  .option('--config.bundle.tsconfig [path]', '')
  .action(async (args: Record<string, unknown>) => {
    const options = parseCliOptions(args)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const config = mergeConfig(await loadConfig(options.config), await parseConfig(options))
  })
