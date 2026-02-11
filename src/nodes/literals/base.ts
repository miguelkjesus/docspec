import { dedent } from '@/internal/utils/string'

export interface LiteralNode {
  type: string
  value: string
}

export function createLiteral<T extends LiteralNode>(node: T): T {
  node.value = dedent(node.value)
  return node
}
