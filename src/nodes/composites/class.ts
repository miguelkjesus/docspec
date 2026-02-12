import { AbstractClass, Callback, Key, StripInternals } from '@/internal/utils/types'

import { CompositeNode } from './base'
import { __CommonContentBuilder, CommonContentNode } from './common'
import { createMethod, MethodBuilder, MethodNode } from './method'
import { createProperty, PropertyBuilder, PropertyNode } from './property'

export interface ClassNode extends CompositeNode {
  type: 'class'
  content: (CommonContentNode | PropertyNode | MethodNode)[]
}

type MethodKeysOf<T> = {
  [K in keyof T]: T[K] extends Callback ? K : never
}[keyof T]

class __ClassBuilder<Constructor extends AbstractClass> extends __CommonContentBuilder<ClassNode> {
  constructor() {
    super({ type: 'class', content: [] })
  }

  private method_(isStatic: boolean, key: Key, method: (builder: MethodBuilder) => void) {
    this.__node.content.push(createMethod(isStatic, key, method))
  }

  readonly method = Object.assign(
    (key: MethodKeysOf<InstanceType<Constructor>>, method: (builder: MethodBuilder) => void) => {
      this.method_(false, key, method)
    },
    {
      static: (key: MethodKeysOf<Constructor>, method: (builder: MethodBuilder) => void) => {
        this.method_(true, key, method)
      },
    },
  )

  private property_(isStatic: boolean, key: Key, property: (builder: PropertyBuilder) => void) {
    this.__node.content.push(createProperty(isStatic, key, property))
  }

  readonly property = Object.assign(
    (key: keyof InstanceType<Constructor>, property: (builder: PropertyBuilder) => void) => {
      this.property_(false, key, property)
    },
    {
      static: (key: keyof Constructor, property: (builder: PropertyBuilder) => void) => {
        this.property_(true, key, property)
      },
    },
  )
}

export type ClassBuilder<T extends AbstractClass> = StripInternals<__ClassBuilder<T>>

export function createClass<T extends AbstractClass>(
  init: string | ((builder: ClassBuilder<T>) => void),
) {
  return new __ClassBuilder<T>().__build(init)
}
