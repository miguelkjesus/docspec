import { CompositeNode } from '@/nodes'

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
