import { createParameter, MethodNode } from '@/nodes'

import { CommonContentBuilder } from './common-content'
import { ParameterBuilder } from './parameter'

export class MethodBuilder extends CommonContentBuilder<MethodNode> {
  constructor(isStatic: boolean, key: string) {
    super({ type: 'method', isStatic, key, content: [] })
  }

  parameter(key: string, parameter: (builder: ParameterBuilder) => void) {
    this.$node.content.push(createParameter(key, parameter))
  }
}
