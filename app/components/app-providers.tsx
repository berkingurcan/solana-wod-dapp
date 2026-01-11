import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { MobileWalletProvider, useMobileWallet } from '@wallet-ui/react-native-web3js'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { AuthProvider } from '@/components/auth/auth-provider'
import { ClusterProvider, useCluster } from '@/components/cluster/cluster-provider'
import { AppTheme } from '@/components/app-theme'
import { WorkoutProvider } from '@/components/wod'
import { AppConfig } from '@/constants/app-config'

const queryClient = new QueryClient()

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AppTheme>
      <QueryClientProvider client={queryClient}>
        <ClusterProvider>
          <SolanaProvider>
            <AuthProvider>
              <WorkoutProvider>{children}</WorkoutProvider>
            </AuthProvider>
          </SolanaProvider>
        </ClusterProvider>
      </QueryClientProvider>
    </AppTheme>
  )
}

// Clears cached wallet authorization when network changes
// Auth tokens from one network don't work on another
function WalletAuthClearer({ children, cluster }: PropsWithChildren<{ cluster: string }>) {
  const queryClient = useQueryClient()
  const { disconnect } = useMobileWallet()

  // Clear authorization cache on first mount (handles network switch on app restart)
  useEffect(() => {
    const clearAuth = async () => {
      console.log(`[Wallet] Clearing any stale authorizations for ${cluster}`)
      // Invalidate all wallet-related queries to clear cached authorizations
      await queryClient.invalidateQueries({ queryKey: ['authorization'] })
      await queryClient.invalidateQueries({ queryKey: ['wallet'] })
      await queryClient.resetQueries({ queryKey: ['authorization'] })
      // Force disconnect to clear any stale session
      try {
        await disconnect()
        console.log(`[Wallet] Session cleared - please sign in for ${cluster}`)
      } catch (e) {
        // Ignore disconnect errors (expected if not connected)
        console.log(`[Wallet] Ready for ${cluster}`)
      }
    }
    clearAuth()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>
}

// We have this SolanaProvider because of the network switching logic.
// If you only connect to a single network, use MobileWalletProvider directly.
// The key prop forces a complete remount when the cluster changes,
// which is necessary because wallet authorization is network-specific.
function SolanaProvider({ children }: PropsWithChildren) {
  const { selectedCluster } = useCluster()

  console.log(`[Wallet] Connecting to ${selectedCluster.name} (${selectedCluster.id})`)

  return (
    <MobileWalletProvider
      key={selectedCluster.id}
      chain={selectedCluster.id}
      endpoint={selectedCluster.endpoint}
      identity={{ name: AppConfig.name, uri: AppConfig.uri }}
    >
      <WalletAuthClearer cluster={selectedCluster.id}>
        {children}
      </WalletAuthClearer>
    </MobileWalletProvider>
  )
}
