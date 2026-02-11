import { ClassBuilder } from '@/builders'
import { AnyAbstractClass } from '@/utils/types'

import { CompositeNode, MethodNode, PropertyNode } from '../composites'

import { CommonContentNode } from './common'

export interface ClassNode extends CompositeNode {
  type: 'class'
  content: (CommonContentNode | PropertyNode | MethodNode)[]
}

export function createClass<T extends AnyAbstractClass>(cls: (builder: ClassBuilder<T>) => void) {
  return new ClassBuilder<T>().$using(cls)
}
