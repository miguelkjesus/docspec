import { AddCommonContent, CompositeNode } from '@/nodes'

import { itAddsExampleNodes } from './example'
import { itAddsExamplesNodes } from './examples'
import { itAddsMarkdownNodes } from './markdown'
import { itAddsTextNodes } from './text'

export function itAddsCommonContentNodes(
  createNode: (init: string | ((builder: AddCommonContent) => void)) => CompositeNode,
) {
  itAddsTextNodes(createNode)

  itAddsMarkdownNodes(createNode)

  itAddsExampleNodes(createNode)

  itAddsExamplesNodes(createNode)
}
