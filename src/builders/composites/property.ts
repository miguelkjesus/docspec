import { PropertyNode } from '@/nodes'

import { CommonContentBuilder } from './common-content'

export class PropertyBuilder extends CommonContentBuilder<PropertyNode> {
  constructor(isStatic: boolean, key: string) {
    super({ type: 'property', isStatic, key, content: [] })
  }
}
