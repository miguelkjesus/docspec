import {
  itAddsCommonContentNodes,
  itAddsParameterNodes,
  itHasKey,
} from '@spec/shared-examples/nodes'

import { createMethod, MethodBuilder } from '@/nodes'

describe(createMethod, () => {
  const factory = (init: string | ((builder: MethodBuilder) => void)) =>
    createMethod(false, 'foo', init)

  itAddsCommonContentNodes(factory)

  itAddsParameterNodes(factory)

  itHasKey((key) => createMethod(false, key, ''))
})
