import { AddExample, CompositeNode } from '@/nodes'

export function itAddsExampleNodes(
  createNode: (init: (builder: AddExample) => void) => CompositeNode,
) {
  it('adds example nodes via example()', () => {
    const result = createNode(({ example }) => {
      example('typescript', 'const x = 1')
    })

    expect(result.content).toMatchObject([
      { type: 'example', language: 'typescript', value: 'const x = 1' },
    ])
  })
}
