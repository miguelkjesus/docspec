import { AnyKey } from '@/internal/utils/types'

import { CompositeNode } from './base'
import { CommonContentBuilder, CommonContentNode } from './common'
import { createParameter, ParameterBuilder, ParameterNode } from './parameter'

export interface MethodNode extends CompositeNode {
  type: 'method'
  isStatic: boolean
  key: AnyKey
  content: (CommonContentNode | ParameterNode)[]
}

export class MethodBuilder extends CommonContentBuilder<MethodNode> {
  constructor(isStatic: boolean, key: AnyKey) {
    super({ type: 'method', isStatic, key, content: [] })
  }

  parameter(key: string, parameter: (builder: ParameterBuilder) => void) {
    this.$node.content.push(createParameter(key, parameter))
  }
}

export function createMethod(
  isStatic: boolean,
  key: AnyKey,
  init: (builder: MethodBuilder) => void,
) {
  return new MethodBuilder(isStatic, key).$using(init)
}
