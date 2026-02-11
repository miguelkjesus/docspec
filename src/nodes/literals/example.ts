import { createLiteral, LiteralNode } from '../literals'

export interface ExampleNode extends LiteralNode {
  type: 'example'
  language: string // TODO enum?
}

export function createExample(language: string, value: string): ExampleNode {
  return createLiteral({ type: 'example', language, value })
}
