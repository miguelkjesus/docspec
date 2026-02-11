import { createLiteral, LiteralNode } from '../literals'

export interface TextNode extends LiteralNode {
  type: 'text'
}

export function createText(value: string): TextNode {
  return createLiteral({ type: 'text', value })
}
