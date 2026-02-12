import { templateTag } from './internal/utils/string'

export const md = templateTag((markdown: string) => {
  return (builder: { markdown(markdown: string): void }) => {
    builder.markdown(markdown)
  }
})

export const text = templateTag((text: string) => {
  return (builder: { text(text: string): void }) => {
    builder.text(text)
  }
})
