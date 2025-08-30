/**
 * Removes common indentation from template literals to make them more readable in code.
 * This allows writing multi-line strings with proper indentation in the source code
 * while removing that indentation in the output string.
 *
 * @example
 * const message = dedent`
 *   This is a multi-line string
 *   that will have its indentation removed.
 *     This line has extra indentation that will be preserved.
 * `;
 * // Result:
 * // "This is a multi-line string
 * // that will have its indentation removed.
 * //   This line has extra indentation that will be preserved."
 */
export function dedent(
  strings: TemplateStringsArray,
  ...values: any[]
): string {
  // Combine the template strings and values
  const result = strings.reduce((acc, str, i) => {
    return acc + str + (values[i] !== undefined ? values[i] : "");
  }, "");

  // Split into lines
  const lines = result.split("\n");

  // Remove ALL leading blank/whitespace-only lines
  while (lines.length > 0 && lines[0].trim() === "") {
    lines.shift();
  }

  // Remove ALL trailing blank/whitespace-only lines
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  // If there are no lines left after trimming, return an empty string
  if (lines.length === 0) {
    return "";
  }

  // Find the minimum indentation level (excluding empty/whitespace lines)
  const minIndent = lines
    .filter((line) => line.trim().length > 0) // Only consider non-blank lines for indent calculation
    .reduce((min, line) => {
      const indent = line.match(/^[ \t]*/)?.[0].length || 0;
      // Handle potentially infinite min if all lines are blank (though handled by early return)
      return indent < min ? indent : min;
    }, Number.POSITIVE_INFINITY);

  // If minIndent remains Infinity (only blank lines existed), return empty string.
  // This case should be caught by the lines.length check above, but belt-and-suspenders.
  if (minIndent === Number.POSITIVE_INFINITY) {
    return "";
  }

  // Remove the common indentation from each line
  const dedented = lines.map((line) => {
    // Preserve internal blank lines as empty strings, don't try to substring them
    if (line.trim().length === 0) {
      return "";
    }
    // Apply dedent only to lines with content
    return line.substring(minIndent);
  });

  // Join the lines back together
  return dedented.join("\n");
}
