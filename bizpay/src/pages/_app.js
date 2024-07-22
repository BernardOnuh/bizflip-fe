import "@/styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { mainnet } from 'wagmi/chains'
import { WagmiProvider, http } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
       <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
           <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
      </WagmiProvider>
  );
}