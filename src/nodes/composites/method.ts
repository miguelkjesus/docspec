import { MethodBuilder } from '@/builders'

import { CompositeNode, ParameterNode } from '../composites'

import { CommonContentNode } from './common'

export interface MethodNode extends CompositeNode {
  type: 'method'
  isStatic: boolean
  key: string
  content: (CommonContentNode | ParameterNode)[]
}

export function createMethod(
  isStatic: boolean,
  key: string,
  init: (builder: MethodBuilder) => void,
) {
  return new MethodBuilder(isStatic, key).$using(init)
}
