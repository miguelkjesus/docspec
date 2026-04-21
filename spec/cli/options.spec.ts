import { resolveCliOptions } from '@/cli/options.js'

describe(resolveCliOptions, () => {
  it('returns empty config when given an empty object', () => {
    expect(resolveCliOptions({})).toMatchObject({
      config: {
        json: {},
        yaml: {},
        bundle: {},
      },
    })
  })

  it('maps package directly', () => {
    const result = resolveCliOptions({ package: '/project/package.json' })

    expect(result.package).toBe('/project/package.json')
  })

  it('maps tsconfig directly', () => {
    const result = resolveCliOptions({ tsconfig: 'tsconfig.json' })

    expect(result.tsconfig).toBe('tsconfig.json')
  })

  it('maps config to config.filePath', () => {
    const result = resolveCliOptions({ config: 'docweaver.config.ts' })

    expect(result.config?.filePath).toBe('docweaver.config.ts')
  })

  it('maps config.loader to config.loader', () => {
    const result = resolveCliOptions({ 'config.loader': 'yaml' })

    expect(result.config?.loader).toBe('yaml')
  })

  it('maps config.encoding to config.json.encoding', () => {
    const result = resolveCliOptions({ 'config.encoding': 'utf8' })

    expect(result.config?.json?.encoding).toBe('utf8')
  })

  it('maps config.encoding to config.yaml.encoding', () => {
    const result = resolveCliOptions({ 'config.encoding': 'utf8' })

    expect(result.config?.yaml?.encoding).toBe('utf8')
  })

  it('maps config.tsconfig to config.bundle.tsconfig', () => {
    const result = resolveCliOptions({ 'config.tsconfig': 'tsconfig.bundle.json' })

    expect(result.config?.bundle?.tsconfig).toBe('tsconfig.bundle.json')
  })

  it('falls back config.bundle.tsconfig to tsconfig', () => {
    const result = resolveCliOptions({ tsconfig: 'tsconfig.json' })

    expect(result.config?.bundle?.tsconfig).toBe('tsconfig.json')
  })

  it('prefers config.tsconfig over tsconfig', () => {
    const result = resolveCliOptions({
      tsconfig: 'tsconfig.json',
      'config.tsconfig': 'tsconfig.bundle.json',
    })

    expect(result.config?.bundle?.tsconfig).toBe('tsconfig.bundle.json')
  })

  it('throws on invalid config.loader value', () => {
    expect(() => resolveCliOptions({ 'config.loader': 'invalid' })).toThrow()
  })

  it('throws on invalid config.encoding value', () => {
    expect(() => resolveCliOptions({ 'config.encoding': 'not-an-encoding' })).toThrow()
  })
})
