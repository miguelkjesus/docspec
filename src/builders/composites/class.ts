import { ClassNode, createMethod, createProperty } from '@/nodes'
import { AnyAbstractClass, AnyFunction, AnyKey } from '@/utils/types'

import { CommonContentBuilder } from './common-content'
import { MethodBuilder } from './method'
import { PropertyBuilder } from './property'

type MethodKeysOf<T> = {
  [K in keyof T]: T[K] extends AnyFunction ? K : never
}[keyof T]

export class ClassBuilder<
  Constructor extends AnyAbstractClass,
> extends CommonContentBuilder<ClassNode> {
  constructor() {
    super({ type: 'class', content: [] })
  }

  private method_(isStatic: boolean, key: AnyKey, method: (builder: MethodBuilder) => void) {
    this.$node.content.push(createMethod(isStatic, key, method))
  }

  method = Object.assign(
    (key: MethodKeysOf<InstanceType<Constructor>>, method: (builder: MethodBuilder) => void) => {
      this.method_(false, key, method)
    },
    {
      static: (key: MethodKeysOf<Constructor>, method: (builder: MethodBuilder) => void) => {
        this.method_(true, key, method)
      },
    },
  )

  private property_(isStatic: boolean, key: AnyKey, property: (builder: PropertyBuilder) => void) {
    this.$node.content.push(createProperty(isStatic, key, property))
  }

  property = Object.assign(
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
