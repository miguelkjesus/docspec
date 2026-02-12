export function templateTag<Return>(func: (text: string) => Return) {
  return (strings: TemplateStringsArray | string, ...expr: string[]) => {
    if (typeof strings === 'string') {
      return func(strings)
    }

    const text = strings.reduce((acc, str, i) => acc + str + (expr[i]?.toString() ?? ''), '')
    return func(text)
  }
}

export function dedent(value: string) {
  const lines = value.replace(/\r\n/g, '\n').split('\n')

  while (lines[0]?.trim() === '') lines.shift()
  while (lines[lines.length - 1]?.trim() === '') lines.pop()

  const minIndent = Math.min(
    ...lines.filter((line) => line.trim()).map((line) => /^\s*/.exec(line)?.[0].length ?? 0),
  )

  return lines.map((line) => line.slice(minIndent)).join('\n')
}
