import type { CompositeNode } from '@/doc-file/nodes/composites/base.js'
import type { AddExample } from '@/doc-file/nodes/literals/example.js'

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
