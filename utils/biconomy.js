import { alchemyProvider } from "wagmi/providers/alchemy";

import { ChainId, FeeQuote, GasLimit } from "@biconomy/core-types";
import { ethers } from "ethers";

import { chain, useProvider } from "wagmi";
import SmartAccount from "@biconomy/smart-account";
//import signer from ''

const gaslessTransaction = async (signer) => {
  const provider = useProvider();
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

  const walletProvider = new ethers.providers.Web3Provider(provider);
  let smartAccount = new SmartAccount(walletProvider, options);
  smartAccount = await smartAccount.init();
  let smartAccountInfo = await smartAccount.getSmartAccountState();

  console.log(provider, 'THIS IS A PROVIDER')

  //setSmartAccountAddress(smartAccountInfo?.address);

  // smartAccount.on("txHashGenerated", (response) => {
  //   console.log("txHashGenerated event received via emitter", response);
  //   // showSuccessMessage(`Transaction sent: ${response.hash}`);
  // });

  // smartAccount.on("txMined", (response) => {
  //   console.log("txMined event received via emitter", response);
  //   // showSuccessMessage(`Transaction mined: ${response.hash}`);
  // });

  // smartAccount.on("error", (response) => {
  //   console.log("error event received via emitter", response);
  // });
};

const vote = async (signer) => {
  const tokenAddress = "0x4a33B5c9c1D1Df59f2bA0459Fd62065A010847Fc";
  const { voteInterface, smartAccount } = await initialiseForwardTransaction(
    signer
  );
  const data1 = voteInterface.encodeFunctionData("vote", [
    "122444545",
    "342324345",
  ]);

  const txs = [];

  const tx1 = {
    to: tokenAddress,
    data: data1,
  };

  txs.push(tx1);

  const feeQuotes = await smartAccount.prepareRefundTransactionBatch({
    transactions: txs,
    chainId: 80001,
  });
  const transaction = await smartAccount.createRefundTransactionBatch({
    transactions: txs,
    feeQuote: feeQuotes[2], // say user chooses USDC from above
  });

  const txId = await smartAccount.sendTransaction({
    tx: transaction,
  });

  console.log("transactionId", txId);
};
