import { ExampleNode, MarkdownNode, TextNode } from '../literals'

import { ExamplesNode } from './examples'

/** Nodes that most composites should support as content */
export type CommonContentNode = TextNode | MarkdownNode | ExampleNode | ExamplesNode
