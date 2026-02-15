import { itAddsCommonContentNodes, itHasKey } from '@spec/shared-examples/nodes'

import { createProperty } from '@/nodes'

describe(createProperty, () => {
  itAddsCommonContentNodes((init) => createProperty(false, 'foo', init))

  itHasKey((key) => createProperty(false, key, ''))
})
