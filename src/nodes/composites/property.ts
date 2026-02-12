import { Key, StripInternals } from '@/internal/utils/types'

import { CompositeNode } from './base'
import { __CommonContentBuilder, CommonContentNode } from './common'

export interface PropertyNode extends CompositeNode {
  type: 'property'
  isStatic: boolean
  key: Key
  content: CommonContentNode[]
}

class __PropertyBuilder extends __CommonContentBuilder<PropertyNode> {
  constructor(isStatic: boolean, key: Key) {
    super({ type: 'property', isStatic, key, content: [] })
  }
}

export type PropertyBuilder = StripInternals<__PropertyBuilder>

export function createProperty(
  isStatic: boolean,
  key: Key,
  init: string | ((builder: PropertyBuilder) => void),
) {
  return new __PropertyBuilder(isStatic, key).__build(init)
}
