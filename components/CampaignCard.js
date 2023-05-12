import React from "react";

const CampaignCard = () => {
  return (
    <div className="border border-[#676E894D] rounded-[10px] bg-[#0F172A] p-5 max-w-[390px]">
      <div className="h-[237px] w-full rounded-md">
        <img src="/assets/kids.png" className="w-full h-full object-cover" />
      </div>
      <div className="flex space-x-3 mt-[17px] mb-1">
        <img src="/assets/btc.png" />
        <span className="text-[#676E89] text-sm font-medium">BTC</span>
      </div>
      <span className="text-white text-lg font-semibold mb-[10px]">
        Mazer Gamer X YouDonate
      </span>
      <div className="flex justify-between mb-2">
       <p className="text-white font-semibold text-[22px] w-1/2">
       <span className="text-[#676E89] block text-sm font-medium">Amount Raised</span>
       $50,000
       </p>
       <p className="text-white font-semibold text-[22px] w-1/2">
       <span className="text-[#676E89] block text-sm font-medium">Proposed Amount</span>
       $800,000
       </p>
      </div>
      <div className="flex justify-between mt-[12px] mb-[17px]">
        <div className="flex space-x-3">
        <img src="/assets/person.png" />
        <span className="text-[#676E89] text-sm font-medium">12,000 Donors</span> 
        </div>
        <div className="flex space-x-3">
        <img src="/assets/clock.png" />
        <span className="text-[#676E89] text-sm font-medium">24 days left</span> 
        </div>
      </div>
      <div className="flex space-x-3">
        <button className="bg-[#06D6A0] border border-[#06D6A0] rounded-[80px] text-center text-white py-[11.9531px] px-[23.9062px] w-1/2">
          Donate
        </button>
        <button className="border border-[#06D6A0] rounded-[80px] text-center text-[#06D6A0] py-[11.9531px] px-[23.9062px] w-1/2">
          Vote
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
