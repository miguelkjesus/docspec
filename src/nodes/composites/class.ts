import { ClassBuilder } from '@/builders'

import { CompositeNode, MethodNode, PropertyNode } from '../composites'

import { CommonContentNode } from './common'

export interface ClassNode extends CompositeNode {
  type: 'class'
  content: (CommonContentNode | PropertyNode | MethodNode)[]
}

export function createClass<T>(cls: (builder: ClassBuilder<T>) => void) {
  return new ClassBuilder<T>().$using(cls)
}
