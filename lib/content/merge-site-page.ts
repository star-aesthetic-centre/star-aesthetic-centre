/** Deep-merge stored CMS JSON over built-in defaults (objects only; arrays replace wholesale). */
export function mergeSitePageContent<T extends Record<string, unknown>>(
  defaults: T,
  stored: unknown
): T {
  if (!stored || typeof stored !== "object" || Array.isArray(stored)) {
    return structuredClone(defaults);
  }

  const result = structuredClone(defaults) as Record<string, unknown>;
  const patch = stored as Record<string, unknown>;

  for (const key of Object.keys(patch)) {
    const patchVal = patch[key];
    const baseVal = result[key];

    if (
      patchVal !== null &&
      typeof patchVal === "object" &&
      !Array.isArray(patchVal) &&
      baseVal !== null &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal)
    ) {
      result[key] = mergeSitePageContent(
        baseVal as Record<string, unknown>,
        patchVal
      );
    } else if (patchVal !== undefined) {
      result[key] = patchVal;
    }
  }

  return result as T;
}
