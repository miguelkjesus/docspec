import { FunctionBuilder } from '@/builders/composites/function'

import { CompositeNode, ParameterNode } from '../composites'

import { CommonContentNode } from './common'

export interface FunctionNode extends CompositeNode {
  type: 'function'
  content: (CommonContentNode | ParameterNode)[]
}

export function createFunction(init: (builder: FunctionBuilder) => void) {
  return new FunctionBuilder().$using(init)
}
