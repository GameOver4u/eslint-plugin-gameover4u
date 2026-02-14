import { TSESLint } from "@typescript-eslint/utils";
import { noConsoleRule } from "./no-console";

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

ruleTester.run("no-console", noConsoleRule, {
  valid: [
    { code: 'console.error("ok");', options: [["error"]] }, // allowed because 'error' is specified
    // bracket notation allowed
    { code: 'console["info"]("hi");', options: [["info", "error"]] }, // mixed allowed
    { code: 'myConsole.log("test");' }, // unrelated object
    // property access but not a call (still allowed if method allowed)
    { code: "const fn = console.error;", options: [["error"]] },
  ],

  invalid: [
    // No options: defaults to empty array => all forbidden
    {
      code: 'console.log("oops");',
      errors: [
        {
          messageId: "forbidden",
          data: { method: "log", allowed: "none" },
        },
      ],
    },
    {
      code: 'console.log("oops");',
      options: [["error"]],
      errors: [
        {
          messageId: "forbidden",
          data: { method: "log", allowed: "error" },
        },
      ],
    },
    {
      code: 'console.log("hi");',
      options: [["", "doesNotExist", "error"]], // invalid ones included
      errors: [
        {
          messageId: "invalidOptions",
          data: { invalid: ", doesNotExist" },
        },
        {
          messageId: "forbidden",
          data: { method: "log", allowed: "error" },
        },
      ],
    },
    {
      code: 'console.warn("warn");',
      options: [["notAMethod"]], // all invalid
      errors: [
        {
          messageId: "invalidOptions",
          data: { invalid: "notAMethod" },
        },
        {
          messageId: "forbidden",
          data: { method: "warn", allowed: "none" },
        },
      ],
    }, // bracket notation forbidden
    {
      code: "console['warn']('warn');",
      options: [["error"]],
      errors: [
        {
          messageId: "forbidden",
          data: { method: "warn", allowed: "error" },
        },
      ],
    },
  ],
});

console.log("All no-console tests executed ✅");
