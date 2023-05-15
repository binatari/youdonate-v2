import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import {
  useContractRead,
  paginatedIndexesConfig,
  useContractInfiniteReads,
} from "wagmi";
import { simiDao } from "../utils/constants";
import { BigNumber } from "ethers";
const ethers = require("ethers");
const goerSimi = require("../utils/goerliSimi.json");
// import { confirmMembership, fetchProposals, getProposalNumber } from "../utils/useYd";

const OnBoardContext = React.createContext();

const contractConfig = {
  address: simiDao,
  abi: goerSimi,
};

export function OnBoardContextProvider({ children }) {
  const [state, setState] = useState({ show: false });
  const [rate, setRate] = useState(0);
  const [loader, setLoader] = useState(false);
  // React.useEffect(() => {
  //   const newStep = state.step
  //   mutate({current_onboarding_stage:state.step})
  // }, [state.step])

  // const { data, isError, isLoading, error } = useContractRead({
  //   address: simiDao,
  //   abi: goerSimi,
  //   functionName: 'proposals',
  //   args:[0],
  // })


  React.useEffect(() => {
    fetch("https://api.coinbase.com/v2/exchange-rates?currency=ETH")
      .then((response) => response.json())
      .then((data) => {
        setRate(data.data.rates.USDT);
      })
      .catch((err) => console.log(err));
  }, []);

  const setOnboardContext = (context) => {
    setState({ ...state, ...context });
    console.log(state);
  };
  return (
    <OnBoardContext.Provider value={{ ...state, setOnboardContext, rate, }}>
      {children}
    </OnBoardContext.Provider>
  );
}

export function useOnboardProvider() {
  const context = React.useContext(OnBoardContext);
  if (context === undefined) {
    throw new Error("useOnboard must be within a provider");
  }
  return context;
}
