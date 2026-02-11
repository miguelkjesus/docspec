import { LiteralNode } from '../literals'

export interface CompositeNode {
  type: string
  content: (LiteralNode | CompositeNode)[]
}

export interface WithContent<Content extends LiteralNode | CompositeNode> extends CompositeNode {
  content: Content[]
}

export abstract class CompositeBuilder<Node extends CompositeNode> {
  /** @internal */
  $node: Node

  constructor(node: Node) {
    this.$node = node
  }

  /** @internal */
  $using(init: (builder: this) => void) {
    init(this)
    return this.$node
  }
}
