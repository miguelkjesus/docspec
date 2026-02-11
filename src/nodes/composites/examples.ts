import { createExample, ExampleNode } from '../literals'

import { CompositeBuilder, CompositeNode } from './base'

export interface ExamplesNode extends CompositeNode {
  type: 'examples'
  content: ExampleNode[]
}

export class ExamplesBuilder extends CompositeBuilder<ExamplesNode> {
  constructor() {
    super({ type: 'examples', content: [] })
  }

  example(language: string, example: string) {
    this.$node.content.push(createExample(language, example))
  }
}

export function createExamples(init: (builder: ExamplesBuilder) => void) {
  return new ExamplesBuilder().$using(init)
}
