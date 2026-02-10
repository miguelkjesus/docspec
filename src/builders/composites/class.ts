import { ClassNode, createMethod, createProperty } from '@/nodes'

import { CommonContentBuilder } from './common-content'
import { MethodBuilder } from './method'
import { PropertyBuilder } from './property'

type MethodNamesOf<T> = Extract<
  {
    [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? K : never
  }[keyof T],
  string
>

export class ClassBuilder<T> extends CommonContentBuilder<ClassNode> {
  constructor() {
    super({ type: 'class', content: [] })
  }

  method(isStatic: boolean, key: MethodNamesOf<T>, method: (builder: MethodBuilder) => void) {
    this.$node.content.push(createMethod(isStatic, key, method))
  }

  property(
    isStatic: boolean,
    key: Extract<keyof T, string>,
    property: (builder: PropertyBuilder) => void,
  ) {
    this.$node.content.push(createProperty(isStatic, key, property))
  }
}
