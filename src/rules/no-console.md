# no-console

Disallows usage of console methods unless explicitly allowed via options.

## Options

- [] (default) → disallow all console methods
- ["error"] → allow only console.error

## Example

```ts
// ❌ disallowed
console.log("log");
console.warn("warn");

// ✅ allowed
console.error("error");
```

## Limitations

This rule only checks static member access:

- ✅ `console.log()`
- ✅ `console["log"]()`
- ❌ `console[variable]()` (not statically analyzable)

Dynamic property access using variables is intentionally ignored, as it cannot be reliably determined at lint time.
