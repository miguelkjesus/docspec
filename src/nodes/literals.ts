export interface LiteralNode {
  type: string
  value: string
}

export interface TextNode extends LiteralNode {
  type: 'text'
}

export interface MarkdownNode extends LiteralNode {
  type: 'markdown'
}

export interface ExampleNode extends LiteralNode {
  type: 'example'
  language: string // TODO enum?
}

/** Literal nodes that should really be supported in most places */
export type CommonLiteralNode = TextNode | MarkdownNode | ExampleNode
