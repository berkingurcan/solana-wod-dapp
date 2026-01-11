import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { AppConfig } from '@/constants/app-config'
import { Cluster } from '@/components/cluster/cluster'
import { ClusterNetwork } from '@/components/cluster/cluster-network'

export interface ClusterProviderContext {
  selectedCluster: Cluster
  clusters: Cluster[]
  setSelectedCluster: (cluster: Cluster) => void

  getExplorerUrl(path: string): string
}

const Context = createContext<ClusterProviderContext>({} as ClusterProviderContext)

// Find the default cluster based on environment variable
function getDefaultCluster(): Cluster {
  const defaultNetwork = AppConfig.defaultNetwork
  console.log(`[Cluster] EXPO_PUBLIC_SOLANA_NETWORK = ${process.env.EXPO_PUBLIC_SOLANA_NETWORK}`)
  console.log(`[Cluster] Default network from config: ${defaultNetwork}`)
  const cluster = AppConfig.clusters.find((c) => c.network === defaultNetwork)
  if (cluster) {
    console.log(`[Cluster] Found matching cluster: ${cluster.name}`)
  } else {
    console.log(`[Cluster] No matching cluster found, falling back to: ${AppConfig.clusters[0].name}`)
  }
  return cluster || AppConfig.clusters[0]
}

export function ClusterProvider({ children }: { children: ReactNode }) {
  const [selectedCluster, setSelectedCluster] = useState<Cluster>(getDefaultCluster)

  // Log the active network on mount and when it changes
  useEffect(() => {
    console.log(`[Cluster] Active network: ${selectedCluster.name} (${selectedCluster.network})`)
    console.log(`[Cluster] RPC endpoint: ${selectedCluster.endpoint}`)
  }, [selectedCluster])

  const value: ClusterProviderContext = useMemo(
    () => ({
      selectedCluster,
      clusters: [...AppConfig.clusters].sort((a, b) => (a.name > b.name ? 1 : -1)),
      setSelectedCluster: (cluster: Cluster) => setSelectedCluster(cluster),
      getExplorerUrl: (path: string) => `https://explorer.solana.com/${path}${getClusterUrlParam(selectedCluster)}`,
    }),
    [selectedCluster, setSelectedCluster],
  )
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useCluster() {
  return useContext(Context)
}

function getClusterUrlParam(cluster: Cluster): string {
  let suffix = ''
  switch (cluster.network) {
    case ClusterNetwork.Devnet:
      suffix = 'devnet'
      break
    case ClusterNetwork.Mainnet:
      suffix = ''
      break
    case ClusterNetwork.Testnet:
      suffix = 'testnet'
      break
    default:
      suffix = `custom&customUrl=${encodeURIComponent(cluster.endpoint)}`
      break
  }

  return suffix.length ? `?cluster=${suffix}` : ''
}
