import type { TSESLint } from "@typescript-eslint/utils";

/**
 * Simple typed wrapper for rules
 */
export function createRule<TMessageIds extends string, TOptions extends readonly unknown[] = []>(
  rule: TSESLint.RuleModule<TMessageIds, TOptions>,
): TSESLint.RuleModule<TMessageIds, TOptions> {
  return rule;
}
