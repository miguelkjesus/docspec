# Doc-lib – Planning Document

## Vision

Documentation should be a **first‑class artifact**, not a side‑effect of comments.

This project proposes a documentation system that:
- keeps functional code clean and readable
- separates verbose documentation from implementation
- stays familiar to developers used to JSDoc
- enables richer documentation experiences than comments ever could
- remains simple at the point of authoring

The goal is not novelty. The goal is **clarity, correctness, and longevity**.

---

## Core Principles

### 1. Separation of concerns

- Functional code should focus on behaviour.
- Documentation should live alongside code, but **not inside it**.
- JSDoc remains valuable for *lightweight developer hints* (tooltips, intent).
- Verbose documentation (examples, explanations, guides) belongs elsewhere.

This library formalises that separation without losing type safety or refactor guarantees.

---

### 2. Familiarity first

The authoring experience should feel immediately recognisable to anyone who has written JSDoc.

Concepts should map cleanly:
- description → `text()`
- `@param` → `param()`
- `@returns` → `returns()`
- `@example` → `example()`

No JSX by default. No custom syntax. No new mental model.

If something feels surprising, it is probably wrong.

---

### 3. Simple authoring, structured output

Docs are written using a **small builder DSL**, but compiled into a structured, renderer‑agnostic document model.

Authoring stays boring.
Structure enables power.

---

### 4. Explicit over clever

- Plain strings are treated as **plain text**, not Markdown.
- No hidden formatting rules.
- No implicit parsing.

Formatting is opt‑in and explicit via `md()`.

This avoids escaping hell, ambiguity, and unexpected output.

---

### 5. Progressive disclosure

The API should scale naturally:

1. One‑line description
2. Multiline prose
3. Structured documentation
4. Optional Markdown for prose‑heavy sections

Users should never be forced into complexity early.

---

### 6. Docs as data

Documentation is compiled into a neutral `doc.json` representation.

This enables:
- multiple renderers
- static site generation
- interactive UI affordances
- custom tooling and linting
- long‑term extensibility

React (or other UI frameworks) belong in the **rendering layer**, not the authoring layer.

---

### 7. Rich examples are first‑class

Examples are not comments.
They are structured entities.

This allows:
- multiple languages per example
- language switching UIs
- validation
- future interactivity

This is a key advantage over JSDoc.

---

## File Structure

Documentation is defined alongside code using a parallel file structure:

- `*.ts` – functional code
- `*.doc.ts` – documentation definitions

This keeps proximity without pollution.

---

## Example: Functional Code

```ts
// cat.ts

export class Cat {
  name: string
  age: number

  /** Makes the cat meow */
  meow() {}

  /** Plays with something for a set duration and returns its new state */
  playWith<T>(thing: T, duration: number): T {
    return thing
  }

  /** Recently added and needs to be documented */
  newMethod() {}

  static hello: boolean
  static something() {}
}
```

JSDoc is minimal and intentional.

---

## Example: Documentation Definition

```ts
// cat.doc.ts

import { document, md } from "doc-lib"
import { Cat } from "./cat"

export default document(Cat, d => {
  // Instance properties
  d.property("name", "The name of the cat.")
  d.property("age", "The age of the cat in years.")

  // Instance methods
  d.method("meow", m => {
    m.text("Makes the cat meow.")

    m.example(ex => {
      ex.ts(`
        const cat = new Cat()
        cat.meow()
      `)
    })
  })

  d.method("playWith", m => {
    m.text("Plays with something for a set duration and returns its new state.")

    m.param("thing", "The thing to play with.")
    m.param("duration", "How long to play with it.")

    m.returns("The new state of the thing.")

    m.example(ex => {
      ex.ts(`
        const frizzyYarn = cat.playWith(yarn, 5)
      `)

      ex.ruby(`
        frizzy_yarn = cat.play_with(yarn, 5)
      `)

      ex.cpp(`
        auto frizzyYarn = cat.playWith(yarn, 5);
      `)
    })
  })

  // Static members
  d.method.static("something", "Does something static.")
  d.property.static("hello", "A static flag on the Cat class.")

  // Placeholders
  d.method.todo("newMethod")
})
```

---

## Shorthand Rules

All builders support a shorthand description form:

```ts
document(Cat, "A small domesticated carnivorous mammal.")
```

Is equivalent to:

```ts
document(Cat, d => d.text("A small domesticated carnivorous mammal."))
```

This applies consistently to:
- `document`
- `method`
- `property`
- future builders

Multiline template strings are normalised to remove indentation and surrounding whitespace.

---

## Markdown Support

Markdown is **opt‑in only**.

```ts
method("meow", md`
  **Makes** the cat meow.
`)
```

`md` is syntactic sugar for:

```ts
d => d.md("**Makes** the cat meow.")
```

Plain text never implies Markdown.

There is intentionally no `raw()` escape hatch.

---

## CLI & Build Pipeline

The CLI:
- discovers `*.doc.ts` files
- executes them in a static context
- produces a structured `doc.json`

This JSON is the single source of truth.

---

## Rendering

The project ships with a default static documentation renderer.

Because docs are structured data, renderers may:
- use React (or not)
- add collapsible sections
- provide language‑switching examples
- support theming
- add interactivity

React is a **renderer choice**, not a requirement.

---

## Beyond API Docs

This system can also generate:
- conceptual documentation
- guides
- onboarding docs
- non‑code pages

Using the same primitives.

Documentation does not have to be limited to code symbols.

---

## Tooling & Nice‑to‑Haves

- CLI checks (missing docs, incomplete sections, examples required, etc.)
- ESLint rules (ordering, completeness)
- Migration tool from existing JSDoc
- VSCode extension (tooltips, navigation)
- Optional transform back into JSDoc for downstream tools

These are layered features, not requirements for v1.

---

## Non‑Goals (Important)

- Replacing JSDoc entirely
- Introducing a new DSL language
- Making JSX mandatory
- Runtime documentation rendering
- Solving every documentation problem in v1

Restraint is intentional.

---

## Future Ideas & Considerations

### Versioned documentation from git refs

Because documentation is compiled from source into structured data, it is possible to generate **multiple versions of the docs** directly from git history.

#### Proposed model

- **Git tags** represent immutable, released documentation versions
  - e.g. `v1.2.0`, `v1.3.0`
- A special **development version** (e.g. `dev`) is built from a chosen branch (usually `main`)

This allows:
- users to view docs that exactly match the version of the API they are using
- maintainers to preview in-progress documentation
- static hosting without runtime complexity

#### Important distinction

- **Tags = canonical, historical truth**
- **Branches = previews**

These should never be conflated in the UI or build system.

---

### Fixing mistakes in versioned docs

A natural concern with tag-based documentation is:
> “What if a spelling mistake or minor documentation error ships with a release?”

This system intentionally treats versioned docs the same way code is treated:

- Released versions are **immutable**
- Corrections are made in **new versions**

In practice, this mirrors how real APIs work:
- If `v1.2.0` has a typo, it remains as historical record
- The fix lands in `v1.2.1` or `v1.3.0`

This preserves trust and reproducibility.

#### Optional mitigation strategies

These are intentionally *not* defaults, but could be offered as opt-in features later:

- **Patch overlays**: allow a small, explicit "docs-only patch" layer for older versions
- **UI annotations**: display a notice like “You are viewing documentation for an older version”
- **Redirect hints**: suggest newer versions when viewing outdated docs

The core philosophy remains: correctness and clarity over silent mutation.

---

### Non-goal

Automatically rewriting historical documentation is considered a non-goal.

If documentation can change retroactively, it becomes impossible to answer:
> “What did the docs say when this version was released?”

This system intentionally avoids that ambiguity.

---

## Summary

This project is:
- not a reinvention of JSDoc
- not a Markdown framework
- not a UI library

It is:
- a structured documentation system
- with familiar authoring
- strong refactor safety
- and modern rendering possibilities

**JSDoc, separated, typed, ordered, and extensible.**

