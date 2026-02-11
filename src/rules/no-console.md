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
