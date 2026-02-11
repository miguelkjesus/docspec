import { PropertyBuilder } from '@/builders'
import { AnyKey } from '@/utils/types'

import { CompositeNode } from '../composites'

import { CommonContentNode } from './common'

export interface PropertyNode extends CompositeNode {
  type: 'property'
  isStatic: boolean
  key: AnyKey
  content: CommonContentNode[]
}

export function createProperty(
  isStatic: boolean,
  key: AnyKey,
  init: (builder: PropertyBuilder) => void,
) {
  return new PropertyBuilder(isStatic, key).$using(init)
}
