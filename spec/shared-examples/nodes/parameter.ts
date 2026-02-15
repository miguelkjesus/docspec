import { AddParameter, CompositeNode } from '@/nodes'

export function itAddsParameterNodes(
  factory: (init: (builder: AddParameter) => void) => CompositeNode,
) {
  it('adds parameter nodes via parameter()', () => {
    const result = factory(({ parameter }) => {
      parameter('arg1', 'first argument')
    })

    expect(result.content).toMatchObject([
      {
        type: 'parameter',
        key: 'arg1',
        content: [{ type: 'text', value: 'first argument' }],
      },
    ])
  })
}
