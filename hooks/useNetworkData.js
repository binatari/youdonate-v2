import React, { useEffect, useState } from "react";
import { useConnect, useNetwork } from "wagmi";
import { setContext } from "@apollo/client/link/context";

const useNetworkData = () => {
  const goerliContracts = {
    YDT: "0xa301924bcAcfdd2696989c2a06Fc4bD2bea8BdAC",
    YDTProc: "0xa301924bcAcfdd2696989c2a06Fc4bD2bea8BdAC",
    simiDao: "0x312A636435A6BFc5cAcd449e5380eA6AB52CC5D7",
    lottery: "0x333804b91a6229ECa15e184d4cf5C4A0a95DBEF4",
    tokens: [
      {
        label: "USDT",
        value: "0x87B49A9b928b06AA5782cB7ec495da8c507CaADC",
        image: "/images/tether.svg",
        decimals: 6,
      },
      {
        label: "USDC",
        value: "0x032666197A5d9329e717800FC90E8C951bA12290",
        image: "/images/usdc-logo.svg",
        decimals: 6,
      },
      {
        label: "DAI",
        value: "0x7fDE3748e8AE27CaF506A47601acAf3B6AEaC34f",
        image: "/images/dai-logo.svg",
        decimals: 18,
      },
      {
        label: "Arb",
        value: "0x912CE59144191C1204E64559FE8253a0e49E6548",
        image: "/images/Arbitrum.svg",
        decimals: 18,
      },
      {
        label: "Weth",
        value: "0x87D3440372293aCf9149552546F7141AAe05Be91",
        image: "/images/eth-logo.svg",
        decimals: 18,
      },
    ],
  };

  const mainnetContracts = {
    YDT: "0x34Cc1978FeF755D03c058cf75d420a61DfEB4b57",
    simiDao: "0x76e593392523243ACD38ceD87c2007F14483a86B",
    YDTProc: "0xB52329A11333462D192110357Be2da470B79B13e",
    lottery: "0x7fDE3748e8AE27CaF506A47601acAf3B6AEaC34f",
    tokens: [
      {
        label: "USDT",
        value: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        image: "/images/tether.svg",
        decimals: 6,
      },
      {
        label: "USDC",
        value: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        image: "/images/usdc-logo.svg",
        decimals: 6,
      },
      {
        label: "DAI",
        value: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        image: "/images/dai-logo.svg",
        decimals: 18,
      },
      {
        label: "Weth",
        value: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        image: "/images/eth-logo.svg",
        decimals: 18,
      },
    ],
  };

  const telosContracts = {
    YDT: "0x87D3440372293aCf9149552546F7141AAe05Be91",
    YDTProc: "0x7fDE3748e8AE27CaF506A47601acAf3B6AEaC34f",
    simiDao: "0x87B49A9b928b06AA5782cB7ec495da8c507CaADC",
    lottery: "",
    tokens: [
      {
        label: "USDC",
        value: "0xD3772b211e0e260ab12d72Df007938Ea94dd5037",
        image: "/images/usdc-logo.svg",
        decimals: 6,
      },
    ],
  };

  const arbitrumContracts = {
    YDT: "0x6fdbbD18A7575C0125c56Be4AfDbd1392C2be118",
    YDTProc: "0xf590e8d42B60879E294859ADA65525CF56cE6Eec",
    simiDao: "0x495d613910FdeB29E83d9fb4B25EbFC3ACc8ddc4",
    lottery: "0x9EA1fB9c932Cc8fAf0A8F4c2E8056eb54dC277a4",
    tokens: [
      {
        label: "USDT",
        value: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        image: "/images/tether.svg",
        decimals: 6,
      },
      {
        label: "USDC",
        value: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        image: "/images/usdc-logo.svg",
        decimals: 6,
      },
      {
        label: "DAI",
        value: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        image: "/images/dai-logo.svg",
        decimals: 18,
      },
      {
        label: "Weth",
        value: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        image: "/images/eth-logo.svg",
        decimals: 18,
      },
      {
        label: "Arb",
        value: "0x912CE59144191C1204E64559FE8253a0e49E6548",
        image: "/images/Arbitrum.svg",
        decimals: 18,
      },
    ],
  };

  const [contracts, setContracts] = useState({
    YDT: "0x6fdbbD18A7575C0125c56Be4AfDbd1392C2be118",
    YDTProc: "0xf590e8d42B60879E294859ADA65525CF56cE6Eec",
    simiDao: "0x495d613910FdeB29E83d9fb4B25EbFC3ACc8ddc4",
    lottery: "0x9EA1fB9c932Cc8fAf0A8F4c2E8056eb54dC277a4",
    tokens: [
      {
        label: "USDT",
        value: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        image: "/images/tether.svg",
        decimals: 6,
      },
      {
        label: "USDC",
        value: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        image: "/images/usdc-logo.svg",
        decimals: 6,
      },
      {
        label: "DAI",
        value: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        image: "/images/dai-logo.svg",
        decimals: 18,
      },
      {
        label: "Weth",
        value: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        image: "/images/eth-logo.svg",
        decimals: 18,
      },
    ],
  });

  const { chain, chains } = useNetwork();

  useEffect(() => {
    if (chain?.id == 1) {
      setContracts({
        ...mainnetContracts,
      });
      // const setAuthorizationLink = setContext((request, previousContext) => { uri:'https://api.thegraph.com/subgraphs/name/l-tech/arbitrum-ydt' })
      // console.log(setAuthorizationLink)
      return;
    }
    setContracts({
      ...arbitrumContracts,
    });
  }, [chain]);

  return contracts;
};

export default useNetworkData;
