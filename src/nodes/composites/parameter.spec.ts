import { createParameter } from './parameter'

describe(createParameter, () => {
  it('returns a ParameterNode with type "parameter"', () => {
    const result = createParameter('foo', (b) => {
      b.text('description')
    })

    expect(result.type).toBe('parameter')
  })

  it('sets the key property', () => {
    const result = createParameter('myParam', (b) => {
      b.text('description')
    })

    expect(result.key).toBe('myParam')
  })

  it('contains text nodes', () => {
    const result = createParameter('foo', (b) => {
      b.text('some description')
    })

    expect(result.content).toMatchObject([{ type: 'text', value: 'some description' }])
  })

  it('contains markdown nodes', () => {
    const result = createParameter('foo', (b) => {
      b.markdown('# Title')
    })

    expect(result.content).toMatchObject([{ type: 'markdown', value: '# Title' }])
  })

  it('contains example nodes', () => {
    const result = createParameter('foo', (b) => {
      b.example('typescript', 'const x = 1')
    })

    expect(result.content).toMatchObject([
      { type: 'example', language: 'typescript', value: 'const x = 1' },
    ])
  })

  it('contains examples nodes', () => {
    const result = createParameter('foo', (b) => {
      b.examples((eb) => {
        eb.example('typescript', 'const x = 1')
      })
    })

    expect(result.content).toMatchObject([
      {
        type: 'examples',
        content: [{ type: 'example', language: 'typescript', value: 'const x = 1' }],
      },
    ])
  })

  it('supports destructuring builder methods', () => {
    const result = createParameter('foo', ({ text, markdown, example, examples }) => {
      text('description')
      markdown('# Title')
      example('typescript', 'const x = 1')
      examples(({ example }) => {
        example('python', 'x = 1')
      })
    })

    expect(result.content).toMatchObject([
      { type: 'text', value: 'description' },
      { type: 'markdown', value: '# Title' },
      { type: 'example', language: 'typescript', value: 'const x = 1' },
      { type: 'examples', content: [{ type: 'example', language: 'python', value: 'x = 1' }] },
    ])
  })
})
