export function md(strings: TemplateStringsArray, ...expr: string[]) {
  const markdown = strings.reduce((acc, str, i) => acc + str + (expr[i]?.toString() ?? ''), '')

  return (builder: { markdown(markdown: string): void }) => {
    builder.markdown(markdown)
  }
}
