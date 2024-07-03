import dynamic from "next/dynamic";

export const ConnectWallet = dynamic(() => import("./WalletConnect"), {
  ssr: false
});
