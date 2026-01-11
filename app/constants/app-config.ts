import { clusterApiUrl } from '@solana/web3.js'
import { Cluster } from '@/components/cluster/cluster'
import { ClusterNetwork } from '@/components/cluster/cluster-network'

// Environment-based network selection
// Set EXPO_PUBLIC_SOLANA_NETWORK=mainnet-beta in .env for mainnet
const SOLANA_NETWORK = process.env.EXPO_PUBLIC_SOLANA_NETWORK || 'devnet'

export class AppConfig {
  static name = 'STOIC'
  static description = 'Forge Your Body. Mint Your Legacy.'
  static uri = 'https://stoic.app'

  // NFT Collection Config
  static nftCollectionName = 'STOIC Workouts'
  static nftCollectionSymbol = 'STOIC'
  static nftImage = process.env.EXPO_PUBLIC_NFT_IMAGE || ''

  // Get the default network based on environment
  static defaultNetwork = SOLANA_NETWORK as 'devnet' | 'testnet' | 'mainnet-beta'

  static clusters: Cluster[] = [
    {
      id: 'solana:devnet',
      name: 'Devnet',
      endpoint: clusterApiUrl('devnet'),
      network: ClusterNetwork.Devnet,
    },
    {
      id: 'solana:testnet',
      name: 'Testnet',
      endpoint: clusterApiUrl('testnet'),
      network: ClusterNetwork.Testnet,
    },
    {
    id: 'solana:mainnet-beta',
    name: 'Mainnet',
    endpoint: clusterApiUrl('mainnet-beta'),
    network: ClusterNetwork.Mainnet,
  }
  ]
}
