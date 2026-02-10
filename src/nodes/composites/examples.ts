import { ExamplesBuilder } from '@/builders'

import { CompositeNode } from '../composites'
import { ExampleNode } from '../literals'

export interface ExamplesNode extends CompositeNode {
  type: 'examples'
  content: ExampleNode[]
}

export function createExamples(init: (builder: ExamplesBuilder) => void) {
  return new ExamplesBuilder().$using(init)
}
