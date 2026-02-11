import { PropertyNode } from '@/nodes'
import { AnyKey } from '@/utils/types'

import { CommonContentBuilder } from './common-content'

export class PropertyBuilder extends CommonContentBuilder<PropertyNode> {
  constructor(isStatic: boolean, key: AnyKey) {
    super({ type: 'property', isStatic, key, content: [] })
  }
}
