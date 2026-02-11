import { MethodBuilder } from '@/builders'
import { AnyKey } from '@/utils/types'

import { CompositeNode, ParameterNode } from '../composites'

import { CommonContentNode } from './common'

export interface MethodNode extends CompositeNode {
  type: 'method'
  isStatic: boolean
  key: AnyKey
  content: (CommonContentNode | ParameterNode)[]
}

export function createMethod(
  isStatic: boolean,
  key: AnyKey,
  init: (builder: MethodBuilder) => void,
) {
  return new MethodBuilder(isStatic, key).$using(init)
}
