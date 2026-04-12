import { findUp } from '@/utils/find.js'

export function findConfigFile(cwd?: string) {
  return findUp.first('docweaver.config.{ts,mts,cts,js,mjs,cjs,json,yaml,yml}', {
    cwd,
  })
}
