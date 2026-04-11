import { itAddsCommonContentNodes } from '@spec/shared-examples/nodes/common.js'

import { createReturns } from '@/doc-file/nodes/composites/return.js'

describe(createReturns, () => {
  itAddsCommonContentNodes(createReturns)
})
