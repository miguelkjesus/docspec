import { Key, StripInternals } from '@/internal/utils/types'

import { CompositeNode } from './base'
import { __CommonContentBuilder, CommonContentNode } from './common'
import { createParameter, ParameterBuilder, ParameterNode } from './parameter'

export interface MethodNode extends CompositeNode {
  type: 'method'
  isStatic: boolean
  key: Key
  content: (CommonContentNode | ParameterNode)[]
}

class __MethodBuilder extends __CommonContentBuilder<MethodNode> {
  constructor(isStatic: boolean, key: Key) {
    super({ type: 'method', isStatic, key, content: [] })
  }

  readonly parameter = (key: string, parameter: (builder: ParameterBuilder) => void) => {
    this.__node.content.push(createParameter(key, parameter))
  }
}

export type MethodBuilder = StripInternals<__MethodBuilder>

export function createMethod(
  isStatic: boolean,
  key: Key,
  init: string | ((builder: MethodBuilder) => void),
) {
  return new __MethodBuilder(isStatic, key).__build(init)
}
