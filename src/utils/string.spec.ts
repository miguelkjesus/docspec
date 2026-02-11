import { dedent } from './string'

describe('dedent', () => {
  it('removes common leading indentation', () => {
    const input = `
      hello
      world
    `

    expect(dedent(input)).toBe(
      `hello
world`,
    )
  })

  it('preserves relative indentation', () => {
    const input = `
      hello
        world
    `

    expect(dedent(input)).toBe(
      `hello
  world`,
    )
  })

  it('ignores empty leading and trailing lines', () => {
    const input = `


        hello
          world


    `

    expect(dedent(input)).toBe(
      `hello
  world`,
    )
  })

  it('does not remove indentation from empty lines in the middle', () => {
    const input = `
      hello

        world
    `

    expect(dedent(input)).toBe(
      `hello

  world`,
    )
  })

  it('handles single-line strings', () => {
    const input = `
        hello
    `

    expect(dedent(input)).toBe('hello')
  })

  it('returns an empty string when given only whitespace', () => {
    const input = `
      
      
    `

    expect(dedent(input)).toBe('')
  })

  it('handles Windows line endings', () => {
    const input = '\r\n    hello\r\n      world\r\n'

    expect(dedent(input)).toBe(
      `hello
  world`,
    )
  })

  it('does not change already dedented text', () => {
    const input = `
hello
  world
    `

    expect(dedent(input)).toBe(
      `hello
  world`,
    )
  })
})
