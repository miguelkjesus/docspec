import { CommonLiteralNode, LiteralNode } from './literals'

export interface CompositeNode {
  type: string
  content: (LiteralNode | CompositeNode)[]
}

export interface ParameterNode extends CompositeNode {
  type: 'parameter'
  key: string
  content: CommonLiteralNode[]
}

export interface MethodNode extends CompositeNode {
  type: 'method'
  key: string
  static: boolean
  content: (CommonLiteralNode | ParameterNode)[]
}

export interface PropertyNode extends CompositeNode {
  type: 'property'
  key: string
  static: boolean
  content: CommonLiteralNode[]
}

export interface ClassNode extends CompositeNode {
  type: 'class'
  content: (CommonLiteralNode | PropertyNode | MethodNode)[]
}

export interface FunctionNode extends CompositeNode {
  type: 'function'
  content: (CommonLiteralNode | ParameterNode)[]
}
