import { PublicKey, Keypair, SystemProgram, TransactionMessage, VersionedTransaction } from '@solana/web3.js'
import {
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
} from '@solana/spl-token'
import { useMutation } from '@tanstack/react-query'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { Workout } from '@/data/workouts'
import { AppConfig } from '@/constants/app-config'

export interface MintWorkoutNftInput {
  workout: Workout
  completedAt: string
}

export interface MintWorkoutNftResult {
  mintAddress: string
  signature: string
}

/**
 * Hook for minting a workout completion NFT
 *
 * For MVP: Creates a basic SPL token mint representing the workout NFT.
 * Future: Integrate with Metaplex for full NFT metadata support.
 */
export function useMintWorkoutNft() {
  const { connection, account, signAndSendTransaction } = useMobileWallet()

  return useMutation({
    mutationKey: ['mint-workout-nft'],
    mutationFn: async (input: MintWorkoutNftInput): Promise<MintWorkoutNftResult> => {
      if (!account?.publicKey) {
        throw new Error('Wallet not connected. Please sign in first.')
      }

      console.log('[NFT Mint] Starting mint:', {
        endpoint: connection.rpcEndpoint,
        wallet: account.publicKey.toBase58(),
      })

      // Check wallet balance first
      const balance = await connection.getBalance(account.publicKey)
      const balanceInSol = balance / 1e9
      console.log(`[NFT Mint] Wallet balance: ${balanceInSol} SOL`)

      // NFT minting requires ~0.002 SOL for rent + fees
      if (balanceInSol < 0.003) {
        throw new Error(`Insufficient balance: ${balanceInSol} SOL. Need at least 0.003 SOL for minting.`)
      }

      const walletPubkey = account.publicKey

      // Generate a new keypair for the mint account
      const mintKeypair = Keypair.generate()
      const mintPubkey = mintKeypair.publicKey

      // Get rent exemption for mint account
      const lamportsForMint = await getMinimumBalanceForRentExemptMint(connection)

      // Get the associated token account address
      const associatedTokenAccount = await getAssociatedTokenAddress(
        mintPubkey,
        walletPubkey
      )

      // Get latest blockhash
      const {
        context: { slot: minContextSlot },
        value: latestBlockhash,
      } = await connection.getLatestBlockhashAndContext()

      // Build instructions for NFT mint
      const instructions = [
        // 1. Create mint account
        SystemProgram.createAccount({
          fromPubkey: walletPubkey,
          newAccountPubkey: mintPubkey,
          space: MINT_SIZE,
          lamports: lamportsForMint,
          programId: TOKEN_PROGRAM_ID,
        }),
        // 2. Initialize mint (0 decimals for NFT)
        createInitializeMintInstruction(
          mintPubkey,
          0, // 0 decimals for NFT
          walletPubkey, // mint authority
          walletPubkey // freeze authority (optional)
        ),
        // 3. Create associated token account
        createAssociatedTokenAccountInstruction(
          walletPubkey, // payer
          associatedTokenAccount,
          walletPubkey, // owner
          mintPubkey
        ),
        // 4. Mint 1 token
        createMintToInstruction(
          mintPubkey,
          associatedTokenAccount,
          walletPubkey, // mint authority
          1 // amount (1 for NFT)
        ),
      ]

      // Create transaction message
      const messageV0 = new TransactionMessage({
        payerKey: walletPubkey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions,
      }).compileToLegacyMessage()

      // Create versioned transaction
      const transaction = new VersionedTransaction(messageV0)

      // Sign with the mint keypair (required for createAccount)
      transaction.sign([mintKeypair])

      // Sign and send via mobile wallet
      const signature = await signAndSendTransaction(transaction, minContextSlot)

      // Confirm transaction
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        'confirmed'
      )

      console.log('NFT Minted!', {
        mintAddress: mintPubkey.toBase58(),
        signature,
        workout: input.workout.name,
      })

      return {
        mintAddress: mintPubkey.toBase58(),
        signature,
      }
    },
    onError: (error: Error) => {
      console.error('NFT mint failed:', error)

      // Provide more context for common errors
      if (error.message?.includes('authorization') || error.message?.includes('Authorization')) {
        console.error(
          '[NFT Mint] Authorization failed. Please try:\n' +
          '1. Sign out of the app and sign back in\n' +
          '2. Make sure your wallet app (Phantom/Solflare) is set to MAINNET\n' +
          '3. Approve the connection request when prompted by your wallet\n' +
          '4. Check that you have enough SOL for transaction fees (~0.003 SOL)'
        )
      } else if (error.message?.includes('Insufficient balance')) {
        console.error('[NFT Mint] ' + error.message)
      }
    },
  })
}

/**
 * Generate NFT metadata for a workout
 * This can be used to create off-chain metadata for services like Arweave/IPFS
 */
export function generateWorkoutNftMetadata(workout: Workout, completedAt: string) {
  return {
    name: `${AppConfig.nftCollectionName} - ${workout.name}`,
    symbol: AppConfig.nftCollectionSymbol,
    description: `Completed "${workout.name}" workout on ${new Date(completedAt).toLocaleDateString()}. ${workout.description}`,
    image: '', // TODO: Generate or use placeholder image
    attributes: [
      { trait_type: 'Workout', value: workout.name },
      { trait_type: 'Difficulty', value: workout.difficulty },
      { trait_type: 'Exercises', value: workout.exercises.length.toString() },
      { trait_type: 'Duration', value: `${workout.estimatedMinutes} min` },
      { trait_type: 'Completed', value: new Date(completedAt).toISOString() },
      ...workout.tags.map((tag) => ({ trait_type: 'Tag', value: tag })),
    ],
    properties: {
      category: 'fitness',
      creators: [],
    },
  }
}
