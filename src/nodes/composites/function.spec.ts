import { createFunction } from './function'

describe(createFunction, () => {
  it('returns a FunctionNode with type "function"', () => {
    const result = createFunction((b) => {
      b.text('description')
    })

    expect(result.type).toBe('function')
  })

  it('contains text nodes', () => {
    const result = createFunction((b) => {
      b.text('some description')
    })

    expect(result.content).toEqual([{ type: 'text', value: 'some description' }])
  })

  it('contains parameter nodes', () => {
    const result = createFunction((b) => {
      b.parameter('arg1', (p) => {
        p.text('first argument')
      })
    })

    expect(result.content).toEqual([
      {
        type: 'parameter',
        key: 'arg1',
        content: [{ type: 'text', value: 'first argument' }],
      },
    ])
  })

  it('contains multiple parameter nodes', () => {
    const result = createFunction((b) => {
      b.parameter('arg1', (p) => {
        p.text('first argument')
      })
      b.parameter('arg2', (p) => {
        p.text('second argument')
      })
    })

    expect(result.content).toEqual([
      {
        type: 'parameter',
        key: 'arg1',
        content: [{ type: 'text', value: 'first argument' }],
      },
      {
        type: 'parameter',
        key: 'arg2',
        content: [{ type: 'text', value: 'second argument' }],
      },
    ])
  })
})
