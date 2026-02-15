import {
  itAddsCommonContentNodes,
  itAddsMethodNodes,
  itAddsPropertyNodes,
  itAddsStaticMethodNodes,
  itAddsStaticPropertyNodes,
} from '@spec/shared-examples/nodes'

import { createClass } from '@/nodes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare class TestClass {
  testProp: string
  testMethod(): void

  static testProp: string
  static testMethod(): void
}

describe(createClass, () => {
  const factory = createClass<typeof TestClass>

  itAddsCommonContentNodes(factory)

  itAddsMethodNodes(factory)

  itAddsStaticMethodNodes(factory)

  itAddsPropertyNodes(factory)

  itAddsStaticPropertyNodes(factory)
})
