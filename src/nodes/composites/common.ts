import {
  createExample,
  createMarkdown,
  createText,
  ExampleNode,
  LiteralNode,
  MarkdownNode,
  TextNode,
} from '../literals'

import { CompositeBuilder, CompositeNode, WithContent } from './base'
import { createExamples, ExamplesBuilder, ExamplesNode } from './examples'

/** Nodes that most composites should support as content */
export type CommonContentNode = TextNode | MarkdownNode | ExampleNode | ExamplesNode

export abstract class CommonContentBuilder<
  Node extends WithContent<CommonContentNode | LiteralNode | CompositeNode>,
> extends CompositeBuilder<Node> {
  text(text: string) {
    this.$node.content.push(createText(text))
  }

  markdown(markdown: string) {
    this.$node.content.push(createMarkdown(markdown))
  }

  example(language: string, example: string) {
    this.$node.content.push(createExample(language, example))
  }

  examples(examples: (builder: ExamplesBuilder) => void) {
    this.$node.content.push(createExamples(examples))
  }
}
