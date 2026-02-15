import { AddMarkdown, CompositeNode } from '@/nodes'

export function itAddsMarkdownNodes(
  createNode: (init: (builder: AddMarkdown) => void) => CompositeNode,
) {
  it('adds markdown nodes via markdown()', () => {
    const result = createNode(({ markdown }) => {
      markdown('# Foo')
    })

    expect(result.content).toMatchObject([{ type: 'markdown', value: '# Foo' }])
  })
  it('adds markdown nodes via md()', () => {
    const result = createNode(({ md }) => {
      md('# Bar')
    })

    expect(result.content).toMatchObject([{ type: 'markdown', value: '# Bar' }])
  })
}
