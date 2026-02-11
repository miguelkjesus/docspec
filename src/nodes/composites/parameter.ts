import { CompositeNode } from './base'
import { CommonContentBuilder, CommonContentNode } from './common'

export interface ParameterNode extends CompositeNode {
  type: 'parameter'
  key: string
  content: CommonContentNode[]
}

export class ParameterBuilder extends CommonContentBuilder<ParameterNode> {
  constructor(key: string) {
    super({ type: 'parameter', key, content: [] })
  }
}

export function createParameter(key: string, init: (builder: ParameterBuilder) => void) {
  return new ParameterBuilder(key).$using(init)
}
