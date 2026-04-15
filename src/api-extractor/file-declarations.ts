import ts from 'typescript'

// ============================================================================
// Types
// ============================================================================

/**
 * Maps declaration kinds to their corresponding TypeScript node types.
 */
export interface DeclarationKindMap {
  global: ts.ModuleDeclaration
  'ambient-module': ts.ModuleDeclaration
  namespace: ts.ModuleDeclaration
  variable: ts.VariableStatement
  function: ts.FunctionDeclaration
  class: ts.ClassDeclaration
  enum: ts.EnumDeclaration
  'type-alias': ts.TypeAliasDeclaration
  interface: ts.InterfaceDeclaration
}

/**
 * The kind of ambient declaration.
 */
export type DeclarationKind = keyof DeclarationKindMap

/**
 * A declaration entry containing the raw TypeScript node, symbol, and kind.
 */
export type Declaration<K extends DeclarationKind = DeclarationKind> = Readonly<{
  node: DeclarationKindMap[K]
  symbol: ts.Symbol | undefined
  kind: K
}>

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Checks if a statement is a `declare global { }` block.
 */
function isDeclareGlobal(statement: ts.Statement): statement is ts.ModuleDeclaration {
  return ts.isModuleDeclaration(statement) && !!(statement.flags & ts.NodeFlags.GlobalAugmentation)
}

/**
 * Checks if a statement is an ambient module declaration (`declare module "name" { }`).
 */
function isAmbientModule(statement: ts.Statement): statement is ts.ModuleDeclaration {
  return (
    ts.isModuleDeclaration(statement) &&
    ts.isStringLiteral(statement.name) &&
    !(statement.flags & ts.NodeFlags.GlobalAugmentation)
  )
}

/**
 * Checks if a statement is a namespace declaration (`declare namespace Name { }`).
 */
function isNamespace(statement: ts.Statement): statement is ts.ModuleDeclaration {
  return (
    ts.isModuleDeclaration(statement) &&
    ts.isIdentifier(statement.name) &&
    !(statement.flags & ts.NodeFlags.GlobalAugmentation)
  )
}

/**
 * Checks if a node has the `declare` keyword modifier.
 */
function hasAmbientModifier(node: ts.Node): boolean {
  if (!ts.canHaveModifiers(node)) return false
  const modifiers = ts.getModifiers(node)
  return modifiers?.some((m) => m.kind === ts.SyntaxKind.DeclareKeyword) ?? false
}

/**
 * Gets the symbol for a variable statement from its first declaration.
 */
function getVariableSymbol(
  node: ts.VariableStatement,
  checker: ts.TypeChecker,
): ts.Symbol | undefined {
  const firstDecl = node.declarationList.declarations[0]
  if (firstDecl && ts.isIdentifier(firstDecl.name)) {
    return checker.getSymbolAtLocation(firstDecl.name)
  }
  return undefined
}

// ============================================================================
// Main Function
// ============================================================================

/**
 * Extracts all ambient declarations from a TypeScript source file.
 *
 * @param file The source file to extract declarations from
 * @param checker The type checker for resolving symbols
 * @returns An array of declarations with node, symbol, and kind
 *
 * @example
 * const decls = getFileDeclarations(sourceFile, checker)
 *
 * // Filter by kind with type-safe narrowing
 * const functions = filterDeclarations(decls, 'function')
 * functions[0].node // ts.FunctionDeclaration
 *
 * // Or filter manually
 * const globals = decls.filter(d => d.kind === 'global')
 */
export function getFileDeclarations(file: ts.SourceFile, checker: ts.TypeChecker): Declaration[] {
  const declarations: Declaration[] = []

  for (const statement of file.statements) {
    // Check module-like declarations first (global, ambient module, namespace)
    if (isDeclareGlobal(statement)) {
      declarations.push({
        node: statement,
        symbol: checker.getSymbolAtLocation(statement),
        kind: 'global',
      })
      continue
    }

    if (isAmbientModule(statement)) {
      declarations.push({
        node: statement,
        symbol: checker.getSymbolAtLocation(statement.name),
        kind: 'ambient-module',
      })
      continue
    }

    if (isNamespace(statement) && hasAmbientModifier(statement)) {
      declarations.push({
        node: statement,
        symbol: checker.getSymbolAtLocation(statement.name),
        kind: 'namespace',
      })
      continue
    }

    // Check other ambient declarations (must have declare modifier)
    if (!hasAmbientModifier(statement)) continue

    if (ts.isVariableStatement(statement)) {
      declarations.push({
        node: statement,
        symbol: getVariableSymbol(statement, checker),
        kind: 'variable',
      })
      continue
    }

    if (ts.isFunctionDeclaration(statement)) {
      declarations.push({
        node: statement,
        symbol: statement.name ? checker.getSymbolAtLocation(statement.name) : undefined,
        kind: 'function',
      })
      continue
    }

    if (ts.isClassDeclaration(statement)) {
      declarations.push({
        node: statement,
        symbol: statement.name ? checker.getSymbolAtLocation(statement.name) : undefined,
        kind: 'class',
      })
      continue
    }

    if (ts.isEnumDeclaration(statement)) {
      declarations.push({
        node: statement,
        symbol: checker.getSymbolAtLocation(statement.name),
        kind: 'enum',
      })
      continue
    }

    if (ts.isTypeAliasDeclaration(statement)) {
      declarations.push({
        node: statement,
        symbol: checker.getSymbolAtLocation(statement.name),
        kind: 'type-alias',
      })
      continue
    }

    if (ts.isInterfaceDeclaration(statement)) {
      declarations.push({
        node: statement,
        symbol: checker.getSymbolAtLocation(statement.name),
        kind: 'interface',
      })
      continue
    }
  }

  return declarations
}
