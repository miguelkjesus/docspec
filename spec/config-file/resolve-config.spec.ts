import { createMockFileSystem } from '@spec/mocks/fs.js'

import { Config, resolveConfig } from '@/config-file/resolve-config.js'

describe(resolveConfig, () => {
  it('auto-discovers package.json when not provided', async () => {
    createMockFileSystem({
      '/project/package.json': '{}',
    })

    const result = await resolveConfig({}, { cwd: '/project' })

    expect(result.package).toBe('/project/package.json')
  })

  it('returns a valid config with explicit package and tsconfig', async () => {
    createMockFileSystem({
      '/project/package.json': '{}',
      '/project/tsconfig.json': '{}',
    })

    const result = await resolveConfig(
      { package: '/project/package.json', tsconfig: '/project/tsconfig.json' },
      { cwd: '/project' },
    )

    expect(result.package).toBe('/project/package.json')
    expect(result.tsconfig).toBe('/project/tsconfig.json')
  })

  it('auto-discovers tsconfig.json relative to package.json', async () => {
    createMockFileSystem({
      '/project/package.json': '{}',
      '/project/tsconfig.json': '{}',
    })

    const result = await resolveConfig({}, { cwd: '/project' })

    expect(result.package).toBe('/project/package.json')
    expect(result.tsconfig).toBe('/project/tsconfig.json')
  })

  it('strips unknown keys', async () => {
    createMockFileSystem({
      '/project/package.json': '{}',
    })

    const result = await resolveConfig({ unknown: true } as Config, { cwd: '/project' })

    expect(result).not.toHaveProperty('unknown')
  })

  it('throws when package.json cannot be found', async () => {
    createMockFileSystem({
      '/project/src/index.ts': '',
    })

    await expect(resolveConfig({}, { cwd: '/project' })).rejects.toThrow(
      'Could not find a package.json file.',
    )
  })

  it('throws when package is not a string', async () => {
    await expect(resolveConfig({ package: 123 } as unknown as Config)).rejects.toThrow()
  })

  it('throws when tsconfig is not a string', async () => {
    await expect(resolveConfig({ tsconfig: 123 } as unknown as Config)).rejects.toThrow()
  })
})
