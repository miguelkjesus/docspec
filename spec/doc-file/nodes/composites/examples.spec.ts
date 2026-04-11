import { itAddsExampleNodes } from '@spec/shared-examples/nodes/example.js'

import { createExamples } from '@/doc-file/nodes/composites/examples.js'

describe(createExamples, () => {
  itAddsExampleNodes(createExamples)
})
