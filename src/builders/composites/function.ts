import { createParameter, FunctionNode } from '@/nodes'

import { CommonContentBuilder } from './common-content'
import { ParameterBuilder } from './parameter'

export class FunctionBuilder extends CommonContentBuilder<FunctionNode> {
  constructor() {
    super({ type: 'function', content: [] })
  }

  parameter(key: string, parameter: (builder: ParameterBuilder) => void) {
    this.$node.content.push(createParameter(key, parameter))
  }
}
