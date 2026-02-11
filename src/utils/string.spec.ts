import { dedent } from './string'

describe(dedent, () => {
  it('removes common leading indentation', () => {
    const result = dedent(`
      hello
      world
    `)

    expect(result).toBe('hello\nworld')
  })

  it('preserves relative indentation', () => {
    const result = dedent(`
      hello
        world
    `)

    expect(result).toBe('hello\n  world')
  })

  it('ignores empty leading and trailing lines', () => {
    const result = dedent(`


        hello
          world


    `)

    expect(result).toBe('hello\n  world')
  })

  it('does not remove indentation from empty lines in the middle', () => {
    const result = dedent(`
      hello

        world
    `)

    expect(result).toBe('hello\n\n  world')
  })

  it('handles single-line strings', () => {
    const result = dedent(`
        hello
    `)

    expect(result).toBe('hello')
  })

  it('returns an empty string when given only whitespace', () => {
    const result = dedent(`


    `)

    expect(result).toBe('')
  })

  it('handles Windows line endings', () => {
    const result = dedent('\r\n    hello\r\n      world\r\n')

    expect(result).toBe('hello\n  world')
  })

  it('does not change already dedented text', () => {
    const result = dedent(`
hello
  world
    `)

    expect(result).toBe('hello\n  world')
  })
})
