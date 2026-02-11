import { CompositeNode } from './base'
import { CommonContentBuilder, CommonContentNode } from './common'
import { createParameter, ParameterBuilder, ParameterNode } from './parameter'

export interface FunctionNode extends CompositeNode {
  type: 'function'
  content: (CommonContentNode | ParameterNode)[]
}

export class FunctionBuilder extends CommonContentBuilder<FunctionNode> {
  constructor() {
    super({ type: 'function', content: [] })
  }

  parameter(key: string, parameter: (builder: ParameterBuilder) => void) {
    this.$node.content.push(createParameter(key, parameter))
  }
}

export function createFunction(init: (builder: FunctionBuilder) => void) {
  return new FunctionBuilder().$using(init)
}
