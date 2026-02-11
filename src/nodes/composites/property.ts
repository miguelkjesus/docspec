import { AnyKey } from '@/internal/utils/types'

import { CompositeNode } from './base'
import { CommonContentBuilder, CommonContentNode } from './common'

export interface PropertyNode extends CompositeNode {
  type: 'property'
  isStatic: boolean
  key: AnyKey
  content: CommonContentNode[]
}

export class PropertyBuilder extends CommonContentBuilder<PropertyNode> {
  constructor(isStatic: boolean, key: AnyKey) {
    super({ type: 'property', isStatic, key, content: [] })
  }
}

export function createProperty(
  isStatic: boolean,
  key: AnyKey,
  init: (builder: PropertyBuilder) => void,
) {
  return new PropertyBuilder(isStatic, key).$using(init)
}
