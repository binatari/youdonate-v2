import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useOnboardProvider } from "../context/OnBoardProvider";
// import VoteModal from "./app/modal/VoteModal";
// import DonateModal from "./app/modal/DonateModal";
import useNetworkData from "../hooks/useNetworkData";
import {
  useContractRead,
  paginatedIndexesConfig,
  useContractInfiniteReads,
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useNetwork,
} from "wagmi";
import { BigNumber } from "ethers";
import { gql, useQuery } from "@apollo/client";
import DonateModal from "./app/modal/DonateModal";
import VoteModal from "./app/modal/VoteModal";
const ethers = require("ethers");
const goerSimi = require("../utils/goerliSimi.json");

// import { getEth } from "../../utils/contract";

const GET_APPROVED_PROPOSAL = gql`
  query getProposal($id: String!) {
    submitDonationProposals(where: { proposalId: $id }) {
      duration
      goal
      id
      media
      name
      proposalId
    }
  }
`;

const CampaignCard = ({
  name,
  details,
  proposalId,
  approved,
  PaymentRequested,
  amountRaised,
  donors,
  status,
  media,
}) => {
  const percent = amountRaised / PaymentRequested;

  const { chain } = useNetwork();

  const [open, setOpen] = useState(false);

  // const ethAmt = getEth(PaymentRequested || 0)

  // const ethRaised =  getEth(amountRaised || 0)

  const { rate } = useOnboardProvider();

  const router = useRouter();

  const { simiDao } = useNetworkData();

  const { loading, error, data, refetch } = useQuery(GET_APPROVED_PROPOSAL, {
    variables: { id: proposalId },
    enabled: !!proposalId,
  });

  const { data: contractData, error: contractError } = useContractRead({
    address: simiDao,
    abi: goerSimi,
    functionName: "approvedDonation",
    args: [proposalId],
  });

  console.log(percent)
  return (
    <div className="border border-[#676E894D] rounded-[10px] bg-[#0F172A] h-full p-5 max-w-[390px]">
      <div className="h-[237px] w-full rounded-md">
        <img s src={media || data?.submitDonationProposals[0]?.media} className="w-full h-full object-cover" />
      </div>
      <div className="flex space-x-3 mt-[17px] mb-1">
        <img src="/assets/btc.png" />
        <span className="text-[#676E89] text-sm font-medium">BTC</span>
      </div>
      <span className="text-white text-lg font-semibold mb-[10px]">
      {name}
      </span>
      <div className="flex justify-between mb-2">
        <p className="text-white font-semibold text-[22px] w-1/2">
          <span className="text-[#676E89] block text-sm font-medium">
            Amount Raised
          </span>
          {Number(ethers.utils.formatUnits(amountRaised, 8).toString())
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                  USD
        </p>
        <p className="text-white font-semibold text-[22px] w-1/2">
          <span className="text-[#676E89] block text-sm font-medium">
            Proposed Amount
          </span>
          {Number(
                      ethers.utils.formatUnits(PaymentRequested, 8).toString()
                    )
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                    USD
        </p>
      </div>
      <progress className="w-full" max="100" value={percent}></progress>
      <div className="flex justify-between mt-[12px] mb-[17px]">
        <div className="flex space-x-3">
          <img src="/assets/person.png" />
          <span className="text-[#676E89] text-sm font-medium">
          {donors} Donors
          </span>
        </div>
        <div className="flex space-x-3">
          <img src="/assets/clock.png" />
          <span className="text-[#676E89] text-sm font-medium">
          {moment
                  .unix(Number(contractData?.duration?.toString()))
                  .format("DD MMM YYYY")}
          </span>
        </div>
      </div>
      <div className="flex space-x-3">
        {/* <button className="bg-[#06D6A0] border border-[#06D6A0] rounded-[80px] text-center text-white py-[11.9531px] px-[23.9062px] w-1/2">
          Donate
        </button> */}
          <VoteModal id={proposalId} showButton setOpen={setOpen} open={open} />
          <DonateModal id={proposalId} />
      </div>
    </div>
  );
};

export default CampaignCard;
