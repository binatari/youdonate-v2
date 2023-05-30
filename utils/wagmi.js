import { configureChains, createClient, defaultChains, chain, useSigner } from "wagmi";

import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { ethers } from "ethers";
import { mainnet, polygon, optimism, arbitrum, goerli} from "wagmi/chains";



import { ConnectKitProvider, getDefaultClient } from "connectkit";

// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
const infuraId = process.env.INFURA_KEY;

const binanceTestnet = {
  id: 41,
  name: "Telos EVM testnet",
  network: 'Telos EVM testnet',
  nativeCurrency: {
    name: "Telos",
    symbol: "TLOS",
    decimals: 18
  },
  rpcUrls: {
    default: 'https://testnet.telos.net/evm',
  },
  blockExplorers: {
    default:  {
      name: "telos-testnet",
      url: "https://testnet.teloscan.io",
      standard: "EIP3091",
    },
  },
  testnet: true,
}

// [chain.goerli,  binanceTestnet],
// Configure chains for connectors to support
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, arbitrum],
  [
    infuraProvider({ apiKey:infuraId }),
    publicProvider(),
  ]
);

// const connectors = connectorsForWallets([
//   {
//     groupName: "Recommended",
//     wallets: [
//       metaMaskWallet({ chains }),
//       coinbaseWallet({ chains }),
//       walletConnectWallet({ chains }),
//       rainbowWallet({ chains }),
//     ],
//   },
//   {
//     groupName: "Others",
//     wallets: [
//       injectedWallet({ chains }),

//       trustWallet({ chains }),
//       braveWallet({ chains }),
//     ],
//   },
// ]);

// const { connectors } = getDefaultWallets({
//   appName: 'My RainbowKit App',
//   chains
// });
export const myChains = chains;


export const gaslessTransaction = async (signer) => {

  let activeChainId = ChainId.GOERLI;
  const supportedChains = [
    ChainId.GOERLI,
    ChainId.POLYGON_MAINNET,
    ChainId.POLYGON_MUMBAI,
  ];

  let options = {
    activeNetworkId: activeChainId,
    supportedNetworksIds: supportedChains,
    // Network Config.
    // Link Paymaster / DappAPIKey for the chains you'd want to support Gasless transactions on
    networkConfig: [
      {
        chainId: ChainId.GOERLI,
        dappAPIKey: "8tvgkaGVS.80837d44-fc8f-4254-84fc-fa17dd3c5a2a",
        // check in the beginning of the page to play around with testnet common keys
        // customPaymasterAPI: <IPaymaster Instance of your own Paymaster>
      },
    ],
  };
  //const provider= useProvider()


  const walletProvider = new ethers.providers.Web3Provider((signer?.provider).provider);
  let smartAccount = new SmartAccount(walletProvider, options);
  smartAccount = await smartAccount.init();
  let smartAccountInfo = await smartAccount.getSmartAccountState();

  // console.log(provider({chainId:ChainId.GOERLI}), 'THIS IS A PROVIDER', smartAccountInfo, (signer?.provider).provider)

  console.log(smartAccount?.address)

  //setSmartAccountAddress(smartAccountInfo?.address);

  smartAccount.on("txHashGenerated", (response) => {
    console.log("txHashGenerated event received via emitter", response);
    // showSuccessMessage(`Transaction sent: ${response.hash}`);
  });

  smartAccount.on("txMined", (response) => {
    console.log("txMined event received via emitter", response);
    // showSuccessMessage(`Transaction mined: ${response.hash}`);
  });

  smartAccount.on("error", (response) => {
    console.log("error event received via emitter", response);
  });

  return {smartAccount}
};

export const donate = async(signer, args, abi) => {
  const tokenAddress = '0xa301924bcAcfdd2696989c2a06Fc4bD2bea8BdAC'
  const {smartAccount} = await gaslessTransaction(signer);
  const donateInterface = new ethers.utils.Interface(abi)
  const data1 = donateInterface.encodeFunctionData(
      'donateToProject', args
  )

  const txs = [];

  const tx1 = {
      to: tokenAddress ,
      data: data1
    }
    
    // txs.push(tx1)

    // const feeQuotes=  await smartAccount.prepareRefundTransactionBatch(
    //   {transactions:txs, chainId: 80001}
    //   );
    // const transaction = await smartAccount.createRefundTransactionBatch({
    //   transactions: txs,
    //   feeQuote: feeQuotes[2], // say user chooses USDC from above
    // });

    // const txId = await smartAccount.sendTransaction({
    //   tx: transaction, 
    // });
    const txResponse = await smartAccount.sendGaslessTransaction({ transaction: tx1 });

    console.log("transactionId",txResponse)

}
export const wagmiClient = createClient( getDefaultClient({
  appName: 'ConnectKit Next.js demo',
  infuraId,
  //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
  chains:myChains,
}));

// Set up connectors
// export const connectors = [
//   new CoinbaseWalletConnector({
//     chains,
//     options: {
//       appName: "wagmi demo",
//     },
//   }),
//   new WalletConnectConnector({
//     chains,
//     options: {
//       infuraId,
//       qrcode: true,
//     },
//   }),
//   new MetaMaskConnector({
//     chains,
//   }),
// ];
