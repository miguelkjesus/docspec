import { createMockFileSystem } from '@spec/mocks/fs.js'

import { parseConfig } from '@/config-file/parse-config.js'

describe(parseConfig, () => {
  it('auto-discovers package.json when not provided', async () => {
    createMockFileSystem({
      '/project/package.json': '{}',
    })

    const result = await parseConfig({}, { cwd: '/project' })

    expect(result.package).toBe('/project/package.json')
  })

  it('returns a valid config with explicit package and tsconfig', async () => {
    createMockFileSystem({
      '/project/package.json': '{}',
      '/project/tsconfig.json': '{}',
    })

    const result = await parseConfig(
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

    const result = await parseConfig({}, { cwd: '/project' })

    expect(result.package).toBe('/project/package.json')
    expect(result.tsconfig).toBe('/project/tsconfig.json')
  })

  it('strips unknown keys', async () => {
    createMockFileSystem({
      '/project/package.json': '{}',
    })

    const result = await parseConfig({ unknown: true }, { cwd: '/project' })

    expect(result).not.toHaveProperty('unknown')
  })

  it('throws when package.json cannot be found', async () => {
    createMockFileSystem({
      '/project/src/index.ts': '',
    })

    await expect(parseConfig({}, { cwd: '/project' })).rejects.toThrow(
      'Could not find a package.json file.',
    )
  })

  it('throws when package is not a string', async () => {
    await expect(parseConfig({ package: 123 })).rejects.toThrow()
  })

  it('throws when tsconfig is not a string', async () => {
    await expect(parseConfig({ tsconfig: 123 })).rejects.toThrow()
  })
})
