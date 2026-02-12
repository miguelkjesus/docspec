import { createProperty } from './property'

describe(createProperty, () => {
  it('returns a PropertyNode with type "property"', () => {
    const result = createProperty(false, 'foo', (b) => {
      b.text('description')
    })

    expect(result.type).toBe('property')
  })

  it('sets isStatic to false for instance properties', () => {
    const result = createProperty(false, 'foo', (b) => {
      b.text('description')
    })

    expect(result.isStatic).toBe(false)
  })

  it('sets isStatic to true for static properties', () => {
    const result = createProperty(true, 'foo', (b) => {
      b.text('description')
    })

    expect(result.isStatic).toBe(true)
  })

  it('sets the key property with a string', () => {
    const result = createProperty(false, 'myProp', (b) => {
      b.text('description')
    })

    expect(result.key).toBe('myProp')
  })

  it('sets the key property with a symbol', () => {
    const sym = Symbol('mySymbol')
    const result = createProperty(false, sym, (b) => {
      b.text('description')
    })

    expect(result.key).toBe(sym)
  })

  it('contains text nodes', () => {
    const result = createProperty(false, 'foo', (b) => {
      b.text('some description')
    })

    expect(result.content).toMatchObject([{ type: 'text', value: 'some description' }])
  })
})
