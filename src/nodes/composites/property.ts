import { PropertyBuilder } from '@/builders'

import { CompositeNode } from '../composites'

import { CommonContentNode } from './common'

export interface PropertyNode extends CompositeNode {
  type: 'property'
  isStatic: boolean
  key: string
  content: CommonContentNode[]
}

export function createProperty(
  isStatic: boolean,
  key: string,
  init: (builder: PropertyBuilder) => void,
) {
  return new PropertyBuilder(isStatic, key).$using(init)
}
