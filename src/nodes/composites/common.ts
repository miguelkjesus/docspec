import {
  createExample,
  createMarkdown,
  createText,
  ExampleNode,
  LiteralNode,
  MarkdownNode,
  TextNode,
} from '../literals'

import { __CompositeBuilder, CompositeNode, NodeWithContent } from './base'
import { createExamples, ExamplesBuilder, ExamplesNode } from './examples'

/** Nodes that most composites should support as content */
export type CommonContentNode = TextNode | MarkdownNode | ExampleNode | ExamplesNode

export abstract class __CommonContentBuilder<
  Node extends NodeWithContent<CommonContentNode | LiteralNode | CompositeNode>,
> extends __CompositeBuilder<Node> {
  text = (text: string) => {
    this.__node.content.push(createText(text))
  }

  markdown(markdown: string) {
    this.__node.content.push(createMarkdown(markdown))
  }

  example(language: string, example: string) {
    this.__node.content.push(createExample(language, example))
  }

  examples(examples: (builder: ExamplesBuilder) => void) {
    this.__node.content.push(createExamples(examples))
  }
}
