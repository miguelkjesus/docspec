import { doc } from '@/doc-file/nodes/utils/document-api.js'

describe('doc.class', () => {
  it('creates a class node', () => {
    const result = doc.class('', '')

    expect(result.type).toBe('class')
  })

  it('creates node with name from string', () => {
    const result = doc.class('MyClass', '')

    expect(result.name).toBe('MyClass')
  })

  it('creates node with name from class constructor', () => {
    // eslint-disable-next-line @typescript-eslint/no-extraneous-class
    class TestClass {}

    const result = doc.class(TestClass, '')

    expect(result.name).toBe('TestClass')
  })

  it('passes docs to builder', () => {
    const result = doc.class('MyClass', (builder) => {
      builder.text('some text')
    })

    expect(result.content).toMatchObject([{ type: 'text', value: 'some text' }])
  })
})

describe('doc.function', () => {
  it('creates function node with name from string', () => {
    const result = doc.function('myFunction', 'description')

    expect(result.name).toBe('myFunction')
  })

  it('creates function node with name from function', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function testFunction() {}

    const result = doc.function(testFunction, 'description')

    expect(result.name).toBe('testFunction')
  })

  it('passes docs to builder', () => {
    const result = doc.function('myFunction', (builder) => {
      builder.parameter('arg', 'the argument')
    })

    expect(result.content).toMatchObject([{ type: 'parameter', key: 'arg' }])
  })
})
