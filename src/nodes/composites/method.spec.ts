import { createMethod } from './method'

describe(createMethod, () => {
  it('returns a MethodNode with type "method"', () => {
    const result = createMethod(false, 'foo', (b) => {
      b.text('description')
    })

    expect(result.type).toBe('method')
  })

  it('sets isStatic to false for instance methods', () => {
    const result = createMethod(false, 'foo', (b) => {
      b.text('description')
    })

    expect(result.isStatic).toBe(false)
  })

  it('sets isStatic to true for static methods', () => {
    const result = createMethod(true, 'foo', (b) => {
      b.text('description')
    })

    expect(result.isStatic).toBe(true)
  })

  it('sets the key property with a string', () => {
    const result = createMethod(false, 'myMethod', (b) => {
      b.text('description')
    })

    expect(result.key).toBe('myMethod')
  })

  it('sets the key property with a symbol', () => {
    const sym = Symbol('mySymbol')
    const result = createMethod(false, sym, (b) => {
      b.text('description')
    })

    expect(result.key).toBe(sym)
  })

  it('contains text nodes', () => {
    const result = createMethod(false, 'foo', (b) => {
      b.text('some description')
    })

    expect(result.content).toMatchObject([{ type: 'text', value: 'some description' }])
  })

  it('contains parameter nodes', () => {
    const result = createMethod(false, 'foo', (b) => {
      b.parameter('arg1', (p) => {
        p.text('first argument')
      })
    })

    expect(result.content).toMatchObject([
      {
        type: 'parameter',
        key: 'arg1',
        content: [{ type: 'text', value: 'first argument' }],
      },
    ])
  })

  it('supports destructuring builder methods', () => {
    const result = createMethod(false, 'foo', ({ text, parameter }) => {
      text('description')
      parameter('arg1', ({ text }) => {
        text('first argument')
      })
    })

    expect(result.content).toMatchObject([
      { type: 'text', value: 'description' },
      { type: 'parameter', key: 'arg1', content: [{ type: 'text', value: 'first argument' }] },
    ])
  })
})
