import { itAddsExampleNodes } from '@spec/shared-examples/nodes'

import { createExamples } from '@/nodes'

describe(createExamples, () => {
  itAddsExampleNodes(createExamples)
})
