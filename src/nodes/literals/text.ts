import { createLiteral, LiteralNode } from '../literals'

export interface TextNode extends LiteralNode {
  type: 'text'
}

export interface AddText {
  readonly description: (text: string) => void
  readonly text: (text: string) => void
}

export function createText(value: string): TextNode {
  return createLiteral({ type: 'text', value })
}
