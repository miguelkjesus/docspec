import { ParameterNode } from '@/nodes'

import { CommonContentBuilder } from './common-content'

export class ParameterBuilder extends CommonContentBuilder<ParameterNode> {
  constructor(key: string) {
    super({ type: 'parameter', key, content: [] })
  }
}
