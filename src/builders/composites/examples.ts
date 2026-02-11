import { createExample, ExamplesNode } from '@/nodes'

import { CompositeBuilder } from './base'

export class ExamplesBuilder extends CompositeBuilder<ExamplesNode> {
  constructor() {
    super({ type: 'examples', content: [] })
  }

  example(language: string, example: string) {
    this.$node.content.push(createExample(language, example))
  }
}
