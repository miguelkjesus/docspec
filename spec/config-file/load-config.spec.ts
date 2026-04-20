import { createMockFileSystem } from '@spec/mocks/fs.js'
import { mockTsImport } from '@spec/mocks/setup.js'

import { loadConfig } from '@/config-file/load-config.js'

describe(loadConfig, () => {
  it('returns an empty config when no config file is found', async () => {
    createMockFileSystem({
      '/project/package.json': '',
    })

    await expect(loadConfig({ cwd: '/project' })).resolves.toEqual({})
  })

  describe('json loader', () => {
    it('reads the file and parses the JSON content', async () => {
      createMockFileSystem({
        '/project/package.json': '{}',
        '/project/docweaver.config.json': JSON.stringify({ package: '/project/package.json' }),
      })

      const result = await loadConfig({
        filePath: '/project/docweaver.config.json',
        loader: 'json',
        cwd: '/project',
      })

      expect(result.package).toBe('/project/package.json')
    })

    it('respects a custom encoding option', async () => {
      createMockFileSystem({
        '/project/docweaver.config.json': JSON.stringify({ tsconfig: 'custom.json' }),
      })

      const result = await loadConfig({
        filePath: '/project/docweaver.config.json',
        loader: 'json',
        json: { encoding: 'latin1' },
        cwd: '/project',
      })

      expect(result.tsconfig).toBe('custom.json')
    })
  })

  describe('yaml loader', () => {
    it('reads the file and parses YAML content', async () => {
      createMockFileSystem({
        '/project/package.json': '{}',
        '/project/docweaver.config.yaml': 'package: /project/package.json\n',
      })

      const result = await loadConfig({
        filePath: '/project/docweaver.config.yaml',
        loader: 'yaml',
        cwd: '/project',
      })

      expect(result.package).toBe('/project/package.json')
    })

    it('respects a custom encoding option', async () => {
      createMockFileSystem({
        '/project/docweaver.config.yaml': 'tsconfig: custom.json',
      })

      const result = await loadConfig({
        filePath: '/project/docweaver.config.yaml',
        loader: 'yaml',
        yaml: { encoding: 'latin1' },
        cwd: '/project',
      })

      expect(result.tsconfig).toBe('custom.json')
    })
  })

  describe('bundle loader', () => {
    it('calls tsImport and parses the default export', async () => {
      mockTsImport.mockResolvedValue({ default: { tsconfig: 'tsconfig.json' } })

      createMockFileSystem({
        '/project/docweaver.config.ts': '',
      })

      const result = await loadConfig({
        filePath: '/project/docweaver.config.ts',
        loader: 'bundle',
        cwd: '/project',
      })

      expect(mockTsImport).toHaveBeenCalledWith(
        '/project/docweaver.config.ts',
        expect.objectContaining({
          parentURL: expect.any(String) as unknown,
        }),
      )
      expect(result.tsconfig).toBe('tsconfig.json')
    })

    it('uses the provided tsconfig option', async () => {
      mockTsImport.mockResolvedValue({ default: {} })
      createMockFileSystem({
        '/project/package.json': '{}',
        '/project/docweaver.config.ts': '',
      })

      await loadConfig({
        filePath: '/project/docweaver.config.ts',
        loader: 'bundle',
        bundle: { tsconfig: 'tsconfig.build.json' },
        cwd: '/project',
      })

      expect(mockTsImport).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          tsconfig: 'tsconfig.build.json',
        }),
      )
    })

    it('falls back to findTSConfigFile when no tsconfig option is given', async () => {
      mockTsImport.mockResolvedValue({ default: {} })
      createMockFileSystem({
        '/project/package.json': '{}',
        '/project/tsconfig.json': '{}',
        '/project/docweaver.config.ts': '',
      })

      await loadConfig({
        filePath: '/project/docweaver.config.ts',
        loader: 'bundle',
        cwd: '/project',
      })

      expect(mockTsImport).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          tsconfig: '/project/tsconfig.json',
        }),
      )
    })

    it('throws when the module has no default export', async () => {
      mockTsImport.mockResolvedValue({ named: {} })

      await expect(
        loadConfig({ filePath: '/project/docweaver.config.ts', loader: 'bundle' }),
      ).rejects.toThrow('default must be an object')
    })
  })

  it('throws a descriptive error when the loader is undefined', async () => {
    await expect(
      loadConfig({ filePath: '/project/docweaver.config.txt', loader: undefined }),
    ).rejects.toThrow('Could not decide how to load your config file')
  })
})
