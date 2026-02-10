import { createLiteral, LiteralNode } from '../literals'

export interface MarkdownNode extends LiteralNode {
  type: 'markdown'
}

export function createMarkdown(value: string): MarkdownNode {
  return createLiteral({ type: 'markdown', value })
}
