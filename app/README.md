# STOIC - Forge Your Body. Mint Your Legacy.

A Solana-powered mobile fitness app built with Expo and React Native. Complete workouts and mint your achievements as NFTs on the blockchain.

## Features

- **Daily Workouts (WOD)**: Curated functional fitness workouts that cycle daily
- **Workout Tracking**: Track completed exercises and workout history
- **NFT Minting**: Mint workout completion achievements as NFTs on Solana
- **Mobile Wallet Integration**: Connect via Phantom, Solflare, or other Solana mobile wallets

## Tech Stack

- **Framework**: Expo SDK 54 with React Native 0.81
- **Blockchain**: Solana (devnet/mainnet-beta)
- **Wallet**: Mobile Wallet Adapter (`@wallet-ui/react-native-web3js`)
- **Token Program**: `@solana/spl-token` for NFT minting
- **State Management**: TanStack React Query
- **Routing**: Expo Router (file-based routing)

## NFT Minting Implementation

### Current Approach (MVP)

The app mints workout completion NFTs using **basic SPL tokens**:

1. **Token Type**: SPL Token with 0 decimals (standard NFT representation)
2. **On-Chain Data**: Only the token mint exists on-chain - no metadata or images are stored on-chain
3. **Minting Process**:
   - Creates a new mint account
   - Initializes mint with 0 decimals (NFT standard)
   - Creates associated token account for the user's wallet
   - Mints exactly 1 token to the user

### Image/Metadata Status

**Images are NOT currently stored on-chain or with the NFT.**

The app includes a `generateWorkoutNftMetadata()` function that prepares metadata structure including:
- NFT name and symbol
- Workout description
- Image URL (configured via `EXPO_PUBLIC_NFT_IMAGE` env variable)
- Attributes (workout name, difficulty, exercise count, duration, completion date, tags)

However, this metadata is **not currently uploaded** to decentralized storage (Arweave/IPFS) or linked to the on-chain token. The current MVP creates a basic SPL token as proof of workout completion.

### Future Enhancement

The codebase includes comments indicating plans to:
- Integrate with **Metaplex** for full NFT metadata support
- Upload metadata to **Arweave or IPFS**
- Link metadata URI to on-chain token

### Transaction Requirements

- Minimum balance: ~0.002 SOL for transaction fees
- Network: Configurable via `EXPO_PUBLIC_SOLANA_NETWORK` (devnet/mainnet-beta)

## Environment Variables

Create a `.env` file with:

```bash
# Solana network (devnet, testnet, mainnet-beta)
EXPO_PUBLIC_SOLANA_NETWORK=devnet

# NFT collection image URL (for future metadata)
EXPO_PUBLIC_NFT_IMAGE=https://your-image-url.com/nft.png
```

## Project Structure

```
app/
├── app/                    # Expo Router pages
│   └── (tabs)/
│       └── wod/           # Workout screens
│           └── complete.tsx  # Workout completion & NFT minting
├── components/
│   └── nft/
│       └── use-mint-workout-nft.tsx  # NFT minting hook
├── constants/
│   └── app-config.ts      # App configuration & NFT settings
└── data/
    └── workouts.ts        # Workout definitions
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Run on Android:
   ```bash
   npm run android
   ```

4. Run on iOS:
   ```bash
   npm run ios
   ```

## NFT Collection Info

- **Collection Name**: STOIC Workouts
- **Symbol**: STOIC
- **Network**: Solana (configurable)

## Scripts

- `npm run dev` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run build` - Type check and prebuild Android
- `npm run lint` - Run ESLint with auto-fix
- `npm run fmt` - Format code with Prettier
