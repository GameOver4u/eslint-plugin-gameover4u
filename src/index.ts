import type { TSESLint } from "@typescript-eslint/utils";
import { noConsoleRule } from "./rules/no-console";

export const rules: Record<string, TSESLint.RuleModule<string, unknown[]>> = {
  "no-console": noConsoleRule,
};

export default { rules };
