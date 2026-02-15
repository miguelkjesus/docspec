import { itAddsCommonContentNodes, itHasKey } from '@spec/shared-examples/nodes'

import { createParameter } from '@/nodes'

describe(createParameter, () => {
  itAddsCommonContentNodes((init) => createParameter('foo', init))

  itHasKey<string>((key) => createParameter(key, ''), {
    supportsSymbol: false,
    supportsNumber: false,
  })
})
