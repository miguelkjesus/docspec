import { createClass } from './class'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
abstract class TestClass {
  myProp = 'value'
  static staticProp = 'static'

  abstract myMethod(): void
  static staticMethod() {
    return
  }
}

describe(createClass, () => {
  it('returns a ClassNode with type "class"', () => {
    const result = createClass<typeof TestClass>((b) => {
      b.text('description')
    })

    expect(result.type).toBe('class')
  })

  it('contains text nodes', () => {
    const result = createClass<typeof TestClass>((b) => {
      b.text('some description')
    })

    expect(result.content).toMatchObject([{ type: 'text', value: 'some description' }])
  })

  it('contains instance property nodes', () => {
    const result = createClass<typeof TestClass>((b) => {
      b.property('myProp', (p) => {
        p.text('property description')
      })
    })

    expect(result.content).toMatchObject([
      {
        type: 'property',
        isStatic: false,
        key: 'myProp',
        content: [{ type: 'text', value: 'property description' }],
      },
    ])
  })

  it('contains static property nodes', () => {
    const result = createClass<typeof TestClass>((b) => {
      b.property.static('staticProp', (p) => {
        p.text('static property description')
      })
    })

    expect(result.content).toMatchObject([
      {
        type: 'property',
        isStatic: true,
        key: 'staticProp',
        content: [{ type: 'text', value: 'static property description' }],
      },
    ])
  })

  it('contains instance method nodes', () => {
    const result = createClass<typeof TestClass>((b) => {
      b.method('myMethod', (m) => {
        m.text('method description')
      })
    })

    expect(result.content).toMatchObject([
      {
        type: 'method',
        isStatic: false,
        key: 'myMethod',
        content: [{ type: 'text', value: 'method description' }],
      },
    ])
  })

  it('contains static method nodes', () => {
    const result = createClass<typeof TestClass>((b) => {
      b.method.static('staticMethod', (m) => {
        m.text('static method description')
      })
    })

    expect(result.content).toMatchObject([
      {
        type: 'method',
        isStatic: true,
        key: 'staticMethod',
        content: [{ type: 'text', value: 'static method description' }],
      },
    ])
  })

  it('contains method nodes with parameters', () => {
    const result = createClass<typeof TestClass>((b) => {
      b.method('myMethod', (m) => {
        m.parameter('arg1', (p) => {
          p.text('first argument')
        })
      })
    })

    expect(result.content).toMatchObject([
      {
        type: 'method',
        isStatic: false,
        key: 'myMethod',
        content: [
          {
            type: 'parameter',
            key: 'arg1',
            content: [{ type: 'text', value: 'first argument' }],
          },
        ],
      },
    ])
  })
})
