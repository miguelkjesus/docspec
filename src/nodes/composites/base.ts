import { LiteralNode } from '../literals'

export interface CompositeNode {
  type: string
  content: (LiteralNode | CompositeNode)[]
}

export interface WithContent<Content extends LiteralNode | CompositeNode> extends CompositeNode {
  content: Content[]
}
