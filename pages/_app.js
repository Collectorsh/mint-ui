import "@/styles/globals.css";
import "@/styles/toast.css";
import "@/styles/wallet-adapter.css";
import { WalletContextProvider } from "/contexts/wallet";
import { StageContextProvider } from "/contexts/stage";

export default function App({ Component, pageProps }) {
  return (
    <WalletContextProvider>
      <StageContextProvider>
      <Component {...pageProps} />
      </StageContextProvider>
    </WalletContextProvider>
  );
}
