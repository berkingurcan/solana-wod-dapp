/**
 * Utility functions for handling wallet-related errors gracefully
 */

/**
 * Checks if an error is a user cancellation (e.g., user rejected the transaction in their wallet)
 * This is common when using Solana Mobile Wallet Adapter
 */
export function isWalletCancellationError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase()
    const name = error.name

    return (
      // Java CancellationException from mobile wallet adapter
      message.includes('cancellationexception') ||
      // User rejected the request
      message.includes('user rejected') ||
      message.includes('user cancelled') ||
      message.includes('user denied') ||
      // Solana Mobile Wallet Adapter error type
      name === 'SolanaMobileWalletAdapterError' ||
      // Generic wallet rejection patterns
      message.includes('rejected') ||
      message.includes('cancelled') ||
      message.includes('canceled')
    )
  }
  return false
}
