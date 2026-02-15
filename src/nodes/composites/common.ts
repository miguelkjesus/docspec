import {
  AddExample,
  AddMarkdown,
  AddText,
  createExample,
  createMarkdown,
  createText,
  ExampleNode,
  LiteralNode,
  MarkdownNode,
  TextNode,
} from '../literals'

import { __CompositeBuilder, CompositeNode, NodeWithContent } from './base'
import { AddExamples, createExamples, ExamplesBuilder, ExamplesNode } from './examples'

/** Nodes that most composites should support as content */
export type CommonContentNode = TextNode | MarkdownNode | ExampleNode | ExamplesNode
export type AddCommonContent = AddText & AddMarkdown & AddExample & AddExamples

export abstract class __CommonContentBuilder<
  Node extends NodeWithContent<CommonContentNode | LiteralNode | CompositeNode>,
>
  extends __CompositeBuilder<Node>
  implements AddCommonContent
{
  override __build(init: string | ((builder: this) => void)) {
    if (typeof init === 'string') {
      return super.__build((builder: this) => {
        builder.description(init)
      })
    }

    return super.__build(init)
  }

  readonly text = (text: string) => {
    this.__node.content.push(createText(text))
  }

  readonly description = this.text

  readonly markdown = (markdown: string) => {
    this.__node.content.push(createMarkdown(markdown))
  }

  readonly md = this.markdown

  readonly example = (language: string, example: string) => {
    this.__node.content.push(createExample(language, example))
  }

  readonly examples = (examples: (builder: ExamplesBuilder) => void) => {
    this.__node.content.push(createExamples(examples))
  }
}
