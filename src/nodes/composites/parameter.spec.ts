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

    expect(result.content).toEqual([{ type: 'text', value: 'some description' }])
  })

  it('contains markdown nodes', () => {
    const result = createParameter('foo', (b) => {
      b.markdown('# Title')
    })

    expect(result.content).toEqual([{ type: 'markdown', value: '# Title' }])
  })

  it('contains example nodes', () => {
    const result = createParameter('foo', (b) => {
      b.example('typescript', 'const x = 1')
    })

    expect(result.content).toEqual([
      { type: 'example', language: 'typescript', value: 'const x = 1' },
    ])
  })

  it('contains examples nodes', () => {
    const result = createParameter('foo', (b) => {
      b.examples((eb) => {
        eb.example('typescript', 'const x = 1')
      })
    })

    expect(result.content).toEqual([
      {
        type: 'examples',
        content: [{ type: 'example', language: 'typescript', value: 'const x = 1' }],
      },
    ])
  })
})
