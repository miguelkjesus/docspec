import { StripInternals } from '@/internal/utils/types'

import { CompositeNode } from './base'
import { __CommonContentBuilder, CommonContentNode } from './common'

export interface ParameterNode extends CompositeNode {
  type: 'parameter'
  key: string
  content: CommonContentNode[]
}

class __ParameterBuilder extends __CommonContentBuilder<ParameterNode> {
  constructor(key: string) {
    super({ type: 'parameter', key, content: [] })
  }
}

export type ParameterBuilder = StripInternals<__ParameterBuilder>

export function createParameter(key: string, init: (builder: ParameterBuilder) => void) {
  return new __ParameterBuilder(key).__build(init)
}
