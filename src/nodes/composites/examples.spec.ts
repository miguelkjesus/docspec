import { createExamples } from './examples'

describe(createExamples, () => {
  it('returns an ExamplesNode with type "examples"', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const result = createExamples(() => {})

    expect(result.type).toBe('examples')
  })

  it('starts with empty content', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const result = createExamples(() => {})

    expect(result.content).toEqual([])
  })

  it('contains example nodes', () => {
    const result = createExamples((b) => {
      b.example('typescript', 'const x = 1')
    })

    expect(result.content).toMatchObject([
      { type: 'example', language: 'typescript', value: 'const x = 1' },
    ])
  })

  it('contains multiple example nodes', () => {
    const result = createExamples((b) => {
      b.example('typescript', 'const x = 1')
      b.example('python', 'x = 1')
    })

    expect(result.content).toMatchObject([
      { type: 'example', language: 'typescript', value: 'const x = 1' },
      { type: 'example', language: 'python', value: 'x = 1' },
    ])
  })
})
