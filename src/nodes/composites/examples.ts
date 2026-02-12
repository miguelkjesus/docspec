import { StripInternals } from '@/internal/utils/types'

import { createExample, ExampleNode } from '../literals'

import { __CompositeBuilder, CompositeNode } from './base'

export interface ExamplesNode extends CompositeNode {
  type: 'examples'
  content: ExampleNode[]
}

class __ExamplesBuilder extends __CompositeBuilder<ExamplesNode> {
  constructor() {
    super({ type: 'examples', content: [] })
  }

  example(language: string, example: string) {
    this.__node.content.push(createExample(language, example))
  }
}

export type ExamplesBuilder = StripInternals<__ExamplesBuilder>

export function createExamples(init: (builder: ExamplesBuilder) => void) {
  return new __ExamplesBuilder().__build(init)
}
