import { gql, useQuery } from '@apollo/client';
import React from 'react'
import { useAccount } from 'wagmi';
import { convertToMoney } from '../../../utils/func';

const MY_PROPOSALS = gql`
  query getMyProposals($address: String!) {
    approvedDonations(where: { beneficiary: $address }) {
      senderAddress
      proposalId
      amountRaised
      paymentRequested
      name
    }
  }
`;

const ActiveCampaigns = () => {
  const { address } = useAccount();

  const smallCase = address?.toLowerCase();


  //use address not smallcase

  const {
    loading: proposalLoading,
    error: proposalError,
    data: proposalData,
  } = useQuery(MY_PROPOSALS, {
    variables: {
      address: address,
    },
    enabled: address,
  });
  

  console.log(proposalData)

 
  return (
    <div className="rounded-[5px] p-6 bg-[#152238]">
          <div className="flex justify-between mb-[37px]">
            <span className="text-white text-[20px]">Active Campaigns <span className='text-[#676E89]'>({proposalData?.approvedDonations?.length})</span></span>
            <img src="/assets/up-arrow.png" className="object-contain" />
          </div>
          {
            proposalData?.approvedDonations?.filter((campaign, i)=> i < 3).map((campaign)=>   <div className=''>
            <div className='flex space-x-3'>
            <img src='/assets/kids.png' className='max-h-[52px]'/>
            <div>
            <div className='flex space-x-2'>
            <img src='/assets/btc.png' className='contain'/>
            <span className="text-[#676E89] text-sm font-medium">BTC</span>
            </div>
            <span className='font-medium text-[15px] text-white mt-2'>{campaign?.name}</span>
         
            </div>
            </div>
            <div className='mt-4'>
            <progress className='w-full' max={campaign?.paymentRequested} value={campaign?.amountRaised}></progress>
            <p className='text-white '>
            ${convertToMoney(campaign?.amountRaised)}<span className='text-[#667085]'>/${convertToMoney(campaign?.paymentRequested)}</span>
            </p>
            </div>
          </div>)
          }
       

        </div>
  )
}

export default ActiveCampaigns