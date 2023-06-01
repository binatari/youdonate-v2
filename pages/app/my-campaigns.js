import React, { useState } from "react";
import Layout from "../../components/app/Layout";
import CampaignCard from "../../components/CampaignCard";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { InView } from "react-intersection-observer";
import DatePicker from "../../components/app/DatePicker";

const MY_PROPOSALS = gql`
  query getMyProposals($address: String!) {
    approvedDonations(where: { senderAddress: $address }) {
      senderAddress
      proposalId
      amountRaised
      paymentRequested
      name
      donors
    }
  }
`;
const MyCampaigns = () => {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid");
  const imgArr = Array.from(Array(10).keys());
  const { address, isConnecting, isDisconnected } = useAccount();

  const { loading, error, data,  fetchMore,
    refetch } = useQuery(MY_PROPOSALS, {
    variables: { address },
    enabled: address,
  });


  return (
    <div>
      <div className="flex justify-between space-x-8 flex-wrap">
        <div className="flex rounded-[5px] border-[#676E894D] border overflow-x-hidden">
          <button
            className={`py-3 px-8 text-lg text-center border-[#676E894D] border-r  ${
              filter == "all" ? "bg-[#344054] text-white" : "text-[#676E89]"
            }`}
            onClick={() => setFilter("all")}
          >
            All campaigns
          </button>
          <button
            className={`py-3 px-8 text-lg text-center border-[#676E894D] border-r  ${
              filter == "new" ? "bg-[#344054] text-white" : "text-[#676E89]"
            }`}
            onClick={() => setFilter("new")}
          >
            New
          </button>
          <button
            className={`py-3 px-8 text-lg text-center border-[#676E894D] border-r ${
              filter == "goal-met"
                ? "bg-[#344054] text-white"
                : "text-[#676E89]"
            }`}
            onClick={() => setFilter("goal-met")}
          >
            Goal reached
          </button>
          <button
            className={`py-3 px-8 text-lg text-center ${
              filter == "not-reached"
                ? "bg-[#344054] text-white"
                : "text-[#676E89]"
            }`}
            onClick={() => setFilter("not-reached")}
          >
            Goal unreached
          </button>
        </div>
        <div className="flex space-x-2 ">
          <div className="flex overflow-x-hidden border-[#676E894D] border rounded-[5px]">
            <button
              className={`py-3 flex items-center space-x-2 px-8 text-lg text-center border-r border-[#676E894D]  ${
                view == "grid" ? "bg-[#344054] text-white" : "text-[#676E89]"
              }`}
              onClick={() => setView("grid")}
            >
              <i class="las la-th-large"></i>
              Grid
            </button>
            <button
              className={`py-3 flex items-center space-x-2 px-8 text-lg text-center  ${
                view == "list" ? "bg-[#344054] text-white" : "text-[#676E89]"
              }`}
              onClick={() => setView("list")}
            >
              <i class="las la-list"></i>
              List
            </button>
          </div>
          <DatePicker/>
        </div>
      </div>
      {
        loading ? <div className="h-[80vh] w-full flex justify-center items-center">
        <span className="dot-falling"></span>
              </div> :      <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mt-12">
        {data?.approvedDonations?.map(
          (
            { proposalId, amountRaised, paymentRequested, donors, name },
            index
          ) => (
            <CampaignCard
              name={name}
              duration={100000}
              media={""}
              status={""}
              donors={donors}
              approved
              details={""}
              proposalId={proposalId}
              PaymentRequested={paymentRequested}
              amountRaised={amountRaised}
              key={proposalId}
            />
          )
        )}
          {/* {data && (
        <InView
          onChange={async (inView) => {
            const currentLength = data.approvedDonations.length || 0;
            if (inView) {
              await fetchMore({
                variables: {
                  address
                },
              }).then(res=>{
                console.log(res)
               return res}).catch(err=>console.log(err));
            }
          }}
        />
      )} */}
      </div>
      }
 
    </div>
  );
};
MyCampaigns.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default MyCampaigns;
