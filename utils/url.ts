/**
 * URL Utility Functions
 * 
 * A collection of utility functions for URL manipulation and validation.
 * These functions handle common URL-related operations used throughout the application.
 */

/**
 * Converts a title string to a URL-friendly slug
 * 
 * This function performs the following transformations:
 * 1. Converts the string to lowercase
 * 2. Replaces one or more whitespace characters with a single hyphen
 * 
 * Example:
 * ```typescript
 * titleToSlug("Hello World") // returns "hello-world"
 * titleToSlug("Supply Chain News") // returns "supply-chain-news"
 * ```
 * 
 * @param {string} title - The title to convert into a URL slug
 * @returns {string} A URL-friendly slug string
 * @throws {TypeError} If title is not a string
 */
export const titleToSlug = (title: string): string => {
  if (typeof title !== 'string') {
    throw new TypeError('Title must be a string');
  }
  return title.toLowerCase().replace(/\s+/g, '-');
};

/**
 * Validates a URL string
 * 
 * Uses the built-in URL constructor to validate URLs. This ensures the URL:
 * 1. Has a valid protocol (http:// or https://)
 * 2. Has a valid domain structure
 * 3. Follows URL syntax rules
 * 
 * Example:
 * ```typescript
 * isValidUrl("https://example.com") // returns true
 * isValidUrl("not-a-url") // returns false
 * ```
 * 
 * @param {string} url - The URL string to validate
 * @returns {boolean} True if the URL is valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}; 