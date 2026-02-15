import { itAddsCommonContentNodes, itAddsParameterNodes } from '@spec/shared-examples/nodes'

import { createFunction } from '@/nodes'

describe(createFunction, () => {
  itAddsCommonContentNodes(createFunction)

  itAddsParameterNodes(createFunction)
})
