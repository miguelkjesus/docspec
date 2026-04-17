import { createLiteral, type LiteralNode } from '@/doc-file/nodes/literals/base.js'

describe(createLiteral, () => {
  it('returns a new node', () => {
    const node = { type: 'test', value: 'hello' }
    const result = createLiteral(node)

    expect(result).not.toBe(node)
    expect(result).toEqual(node)
  })

  it('dedents the value', () => {
    const node = {
      type: 'test',
      value: `
        hello
      `,
    }

    const result = createLiteral(node)

    expect(result.value).toBe('hello')
  })

  it('preserves extended node properties', () => {
    interface StringLiteralNode extends LiteralNode {
      type: 'string'
      quote: 'single' | 'double'
    }

    const node: StringLiteralNode = {
      type: 'string',
      value: 'hello',
      quote: 'single',
    }

    const result = createLiteral(node)

    expect(result).toEqual({
      type: 'string',
      quote: 'single',
      value: 'hello',
    })
  })
})
