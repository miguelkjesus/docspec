import { StripInternals } from '@/internal/utils/types'

import { CompositeNode } from './base'
import { __CommonContentBuilder, CommonContentNode } from './common'
import { createParameter, ParameterBuilder, ParameterNode } from './parameter'

export interface FunctionNode extends CompositeNode {
  type: 'function'
  content: (CommonContentNode | ParameterNode)[]
}

class __FunctionBuilder extends __CommonContentBuilder<FunctionNode> {
  constructor() {
    super({ type: 'function', content: [] })
  }

  readonly parameter = (key: string, parameter: (builder: ParameterBuilder) => void) => {
    this.__node.content.push(createParameter(key, parameter))
  }
}

export type FunctionBuilder = StripInternals<__FunctionBuilder>

export function createFunction(init: string | ((builder: FunctionBuilder) => void)) {
  return new __FunctionBuilder().__build(init)
}
