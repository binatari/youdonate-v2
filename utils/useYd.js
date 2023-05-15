const contractABI = require("./simiDAO.json");

const ercABI = require("./ercABI.json");

const lotteryABI = require("./lotteryABI.json");

const donateABI = require("./donateABI.json");

const ethers = require("ethers");

export const contractAddress = "0x606cDadeeb7FF1e3d86C92e34b2e24dC9E9C6024";

export const YD = "0xcd1b7faCD5580E4503953F27D5D4E21281815D12";

export const lottery = "0xfC5c5cf4a5F895bB1D5471DeB2138b3aC08fD3e8";

export default function useYd() {
  const switchNetwork = async (library) => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x63564c40" }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams["0x63564c40"]],
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const getBalance = async (address, cb) => {
    let tokens = [];
    for (let i = 0; i < tokenAddresses.length; i++) {
      const contract = new ethers.Contract(
        tokenAddresses[i].address,
        ercABI,

        mainnet
      );
      const tokenBalance = await contract.balanceOf(address);
      tokens.push({
        address: tokenAddresses[i].address,
        amount: tokenBalance,
        name: tokenAddresses[i].name,
      });
    }
    cb(tokens);
  };

  const getTestBalance = async (address, cb) => {
    let tokens = [];
    for (let i = 0; i < testTokens.length; i++) {
      const contract = new ethers.Contract(
        testTokens[i].address,
        ercABI,
        provider
      );
      const tokenBalance = await contract.balanceOf(address);
      tokens.push({
        address: testTokens[i].address,
        amount: tokenBalance,
        name: testTokens[i].name,
      });
    }
    cb(tokens);
  };

  const confirmMembership = async (account) => {
    const isMember = await helloWorldContract.members(account);
    return isMember;
  };

  const join = async (ethereum, account, cb, cbError) => {
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      data: helloWorldContract.methods.joinSimiDAO().encodeABI(),
      from: account,
    };

    try {
      const txHash = await ethereum
        .request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
        .then((result) => {
          cb(result);
        });
    } catch (error) {
      cbError(error);
      console.log(error);
      return error;
    }
  };

  const getProposalNumber = async () => {
    const message = await helloWorldContract.methods.proposalCount().call();
    return message;
  };

  const getApprovedProposalNumber = async () => {
    const message = await helloWorldContract.getApprovedDonationCount();
    return message;
  };

  async function fetchProposals(num, cb) {
    console.log(num);
    const calls = await Promise.all(
      Array.apply(null, Array(num)).map((element, index) =>
        helloWorldContract.proposals(index)
      )
    );
    cb(calls);
  }

  async function fetchProposal(num) {
    const proposal = await helloWorldContract.proposals(num);
    return proposal;
  }

  async function fetchApprovedProposals(num, cb) {
    console.log(num);
    const calls = await Promise.all(
      Array.apply(null, Array(num)).map((element, index) =>
        helloWorldContract.approvedDonations(index)
      )
    );
    cb(calls);
  }

  const submitVote = async (id, vote, ethereum, account, cb, err) => {
    console.log(ethereum, id, vote, id);
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      data: helloWorldContract.submitVote(id, vote).encodeABI(),
      from: account,
    };

    try {
      const txHash = await ethereum
        .request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
        .then((result) => {
          cb(result);
          console.log(result);
        });
    } catch (error) {
      err(error);
      console.log(error);
    }
  };

  const createProposal = async (
    { _name, _goal, _media, _duration, details },
    ethereum,
    account,
    cb,
    cbError
  ) => {
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      data: helloWorldContract.methods
        .submitDonationProposal(_name, _goal, _media, _duration, details)
        .encodeABI(),
      from: account,
    };

    try {
      const txHash = await ethereum
        .request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
        .then((result) => {
          cb(result);
        });
    } catch (error) {
      cbError(error);
      console.log(error);
      return error;
    }
  };

  const getEth = (num) => {
    return Web3.utils.fromWei(num.toString(), "ether");
  };

  const isApproved = async (num) => {
    const approved = await helloWorldContract.methods
      .isApprovedDonation(num)
      .call();
    return approved;
  };

  const donate = async (
    { _proposalId, _amount, _token },
    ethereum,
    account,
    cb,
    cbError
  ) => {
    const transactionParameters = {
      to: YD, // Required except during contract publications.
      data: donateContract.methods
        .donateToProject(_proposalId, _amount, _token)
        .encodeABI(),
      from: account,
    };

    try {
      const txHash = await ethereum
        .request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
        .then((result) => {
          cb(result);
          console.log(result);
        });

      console.log(txHash);
    } catch (error) {
      cbError(error);
      console.log(error);
      return error;
    }
  };

  // LOTTERY

  const currentLotteryId = async () => {
    const current = await lotteryContract.methods.currentLotteryId().call();
    return current;
  };

  const lotteryInfo = async (currentValue) => {
    const data = await lotteryContract.methods.viewLottery(currentValue).call();
    return data;
  };

  //send back an array between 1 million and 2 million - 1
  const buyTicket = async (
    { _lotteryId, _ticketNumbers },
    ethereum,
    account,
    cb,
    cbError
  ) => {
    console.log(_lotteryId, _ticketNumbers);
    const transactionParameters = {
      to: lottery, // Required except during contract publications.
      data: lotteryContract.methods
        .buyTickets(_lotteryId, [_ticketNumbers])
        .encodeABI(),
      from: account,
    };

    try {
      const txHash = await ethereum
        .request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
        .then((result) => {
          cb(result);
          console.log(result);
        });

      console.log(txHash);
    } catch (error) {
      cbError(error);
      console.log(error);
      return error;
    }
  };

  const totalTickets = async () => {
    const data = await lotteryContract.methods
      .maxNumberTicketsPerBuyOrClaim()
      .call();
    return data;
  };

  return {
    switchNetwork,
    getApprovedProposalNumber,
    getBalance,
    getEth,
    getProposalNumber,
    getTestBalance,
    buyTicket,
    totalTickets,
    lotteryInfo,
    currentLotteryId,
    donate,
    isApproved,
    fetchProposals,
    fetchApprovedProposals,
    createProposal,
    submitVote,
    confirmMembership,
    join,
    fetchProposal
  };
}

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

export const provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545"
);

//mainnet
export const mainnet = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7"
);

export const helloWorldContract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider
);

export const donateContract = new ethers.Contract(YD, donateABI, provider);

export const lotteryContract = new ethers.Contract(
  lottery,
  lotteryABI,
  provider
);

//USDT, BNB, MATIC
//NOTE IF RPC NODE IS NOT NOT THE SAME IT WILL THROW ERROR
const tokenAddresses = [
  {
    name: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  {
    name: "BNB",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    name: "MATIC",
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
  },
];

const testTokens = [
  {
    name: "WBNB",
    address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  },
  {
    address: "0x96Ca5955F25648FB44C5D772BAdB4313000C66Fe",
    name: "USDT",
  },
];
