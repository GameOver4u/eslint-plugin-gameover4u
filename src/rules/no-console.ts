import type { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/createRule";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

type Options = [string[]?];
type MessageIds = "forbidden" | "invalidOptions";

export const noConsoleRule = createRule<MessageIds, Options>({
  name: "no-console",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow console calls except allowed methods",
    },
    messages: {
      forbidden:
        "Using console.{{method}} is forbidden. Allowed methods: {{allowed}}. If this is intentional, add it to allowedMethods.",
      invalidOptions: "Invalid allowedMethods configuration: {{invalid}}. These were ignored.",
    },
    schema: [
      {
        type: "array",
        items: { type: "string" },
        uniqueItems: true,
      },
    ],
  },
  defaultOptions: [[]],
  create(context) {
    const userOptions = context.options[0] ?? [];

    // dynamically get all console methods
    const validConsoleMethods = (Object.keys(console) as (keyof Console)[]).filter(
      (key) => typeof console[key] === "function",
    );

    // one-pass: separate valid and invalid options
    const invalidMethods: string[] = [];
    const allowedMethods = userOptions.filter((m) => {
      if (typeof m !== "string" || !validConsoleMethods.includes(m as keyof Console)) {
        invalidMethods.push(m);
        return false; // not valid
      }
      return true; // valid
    });

    // report invalid options once
    if (invalidMethods.length > 0) {
      context.report({
        node: context.sourceCode.ast,
        messageId: "invalidOptions",
        data: { invalid: invalidMethods.join(", ") },
      });
    }

    const allowedStr = allowedMethods.length > 0 ? allowedMethods.join(", ") : "none";

    return {
      MemberExpression(node: TSESTree.MemberExpression) {
        const obj = node.object;
        const prop = node.property;

        if (
          obj.type === AST_NODE_TYPES.Identifier &&
          obj.name === "console" &&
          prop.type === AST_NODE_TYPES.Identifier &&
          !allowedMethods.includes(prop.name)
        ) {
          context.report({
            node,
            messageId: "forbidden",
            data: { method: prop.name, allowed: allowedStr },
          });
        }
      },
    };
  },
});
