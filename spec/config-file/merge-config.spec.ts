import { mergeConfig } from '@/config-file/merge-config.js'

describe(mergeConfig, () => {
  it('returns base fields when overrides are empty', () => {
    const base = { package: '/project/package.json', tsconfig: undefined }

    expect(mergeConfig(base, {})).toEqual(base)
  })

  it('uses base fields when overrides are empty', () => {
    const base = { package: '/project/package.json', tsconfig: 'tsconfig.json' }

    expect(mergeConfig(base, {})).toEqual(base)
  })

  it('uses override fields when provided', () => {
    const base = { package: '/project/package.json', tsconfig: 'tsconfig.json' }
    const overrides = { package: '/lib/package.json', tsconfig: 'tsconfig.lib.json' }

    expect(mergeConfig(base, overrides)).toEqual(overrides)
  })

  it('overrides only the fields that are present', () => {
    const base = { package: '/project/package.json', tsconfig: 'tsconfig.json' }
    const result = mergeConfig(base, { tsconfig: 'tsconfig.lib.json' })

    expect(result.package).toBe('/project/package.json')
    expect(result.tsconfig).toBe('tsconfig.lib.json')
  })
})
