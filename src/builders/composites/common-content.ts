import {
  CommonContentNode,
  CompositeNode,
  createExample,
  createExamples,
  createMarkdown,
  createText,
  LiteralNode,
  WithContent,
} from '@/nodes'

import { CompositeBuilder } from './base'
import { ExamplesBuilder } from './examples'

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
