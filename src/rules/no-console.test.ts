import { TSESLint } from "@typescript-eslint/utils";
import { noConsoleRule } from "./no-console";

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

ruleTester.run("no-console", noConsoleRule, {
  valid: [
    // No options: nothing allowed
    { code: 'console.error("ok");', options: [["error"]] }, // allowed because 'error' is specified
    { code: 'console.error("ok");', options: [["error", "warn"]] }, // allowed multiple
    { code: 'console.warn("warn");', options: [["warn"]] }, // allowed single
    { code: 'console.info("hi");', options: [["info", "error"]] }, // allowed multiple
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
      code: 'console.warn("warn");',
      errors: [
        {
          messageId: "forbidden",
          data: { method: "warn", allowed: "none" },
        },
      ],
    },

    // With options: only allowed methods are okay
    {
      code: 'console.log("oops");',
      options: [["error"]], // only console.error allowed
      errors: [
        {
          messageId: "forbidden",
          data: { method: "log", allowed: "error" },
        },
      ],
    },
    {
      code: 'console.warn("warn");',
      options: [["error", "info"]], // only console.error/info allowed
      errors: [
        {
          messageId: "forbidden",
          data: { method: "warn", allowed: "error, info" },
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
    },
  ],
});

console.log("All no-console tests executed ✅");
