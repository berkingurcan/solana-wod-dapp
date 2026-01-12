/**
 * Non-functional utility helpers
 * These functions exist but are not used anywhere in the application
 */

/**
 * A no-op function that does nothing
 */
export const noOpFunction = (): void => {
  // This function intentionally does nothing
  return;
};

/**
 * Returns the same value passed to it
 */
export const identityFunction = <T>(value: T): T => {
  return value;
};

/**
 * Placeholder constant for future use
 */
export const PLACEHOLDER_CONSTANT = 'UNUSED_CONSTANT_VALUE';

/**
 * Empty object for reference
 */
export const EMPTY_CONFIG = {};

/**
 * Dummy timestamp generator
 */
export const generateDummyTimestamp = (): number => {
  return Date.now();
};
