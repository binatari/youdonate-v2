import React, { useEffect, useState } from "react";
import { useConnect, useNetwork } from "wagmi";
import { setContext } from "@apollo/client/link/context";

const useURI = () => {
  
    const [uri, setUri] = useState('')
    const { chain, chains } = useNetwork();
    
    useEffect(() => {
      if (chain?.id == 1) {
        setUri('https://api.studio.thegraph.com/query/22664/you-donate-protocol/1.0.0');
        // const setAuthorizationLink = setContext((request, previousContext) => { uri:'https://api.thegraph.com/subgraphs/name/l-tech/arbitrum-ydt' })
        // console.log(setAuthorizationLink)
        return;
      }
      setUri('https://api.thegraph.com/subgraphs/name/l-tech/arbi-ydt');
    }, [chain]);
  
  
    return uri;
  };

  export default useURI;