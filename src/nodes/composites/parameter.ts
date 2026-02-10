import { ParameterBuilder } from '@/builders'

import { CompositeNode } from '../composites'

import { CommonContentNode } from './common'

export interface ParameterNode extends CompositeNode {
  type: 'parameter'
  key: string
  content: CommonContentNode[]
}

export function createParameter(key: string, init: (builder: ParameterBuilder) => void) {
  return new ParameterBuilder(key).$using(init)
}
