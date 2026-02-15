import { StripInternals } from '@/internal/utils/types'

import { CompositeNode } from './base'
import { __CommonContentBuilder, CommonContentNode } from './common'
import { AddParameter, createParameter, ParameterBuilder, ParameterNode } from './parameter'

export interface FunctionNode extends CompositeNode {
  type: 'function'
  content: (CommonContentNode | ParameterNode)[]
}

class __FunctionBuilder extends __CommonContentBuilder<FunctionNode> implements AddParameter {
  constructor() {
    super({ type: 'function', content: [] })
  }

  readonly parameter = (key: string, parameter: string | ((builder: ParameterBuilder) => void)) => {
    this.__node.content.push(createParameter(key, parameter))
  }

  readonly param = this.parameter
}

export type FunctionBuilder = StripInternals<__FunctionBuilder>

export function createFunction(init: string | ((builder: FunctionBuilder) => void)) {
  return new __FunctionBuilder().__build(init)
}
