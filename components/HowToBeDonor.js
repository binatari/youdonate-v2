import React from "react";

const HowToBeDonor = () => {
  return (
    <div className="bg-[#152238] py-[60px]">
    <div className="container mx-auto mb-12">
    <span className="text-sm block leading-7 text-[#676E89]">
        HOW TO BECOME A DONOR
      </span>
      <h3 className="text-[35px] font-extrabold leading-[35px] text-white mb-4">
        Donate with ease to worthy causes
      </h3>
    </div>
    
      <div className="mx-auto container justify-around items-center  flex-col md:flex-row flex md:space-x-28">
        <div className="max-w-[344px]">
          <div className="w-[68px] h-[68px] rounded-full flex  justify-center items-center border text-[30px] border-main text-main font-medium text-white">
            1
          </div>
          <h5 className="text-[25px] font-extrabold leading-[27px] text-white my-4">
            Choose
          </h5>
          <p className="text-[#676E89] text-lg  pb-[54px]">
          Choose from our variety of campaigns to donate to and make a difference. We offer multiple campaigns for you to give to and support causes that matter to you.

          </p>
        </div>
        <div className="max-w-[344px]">
          <div className="w-[68px] h-[68px] rounded-full flex  justify-center items-center border text-[30px] border-main text-main font-medium text-white">
            2
          </div>
          <h5 className="text-[25px] font-extrabold leading-[27px] text-white my-4">
          Donate
          </h5>
          <p className="text-[#676E89] text-lg  pb-[54px]">
          After donating to a campaign, you will be issued our native token [YDT] as proof of donation. This token can be used to get tickets and participate in the lottery
          </p>
        </div>
        <div className="max-w-[344px]">
          <div className="w-[68px] h-[68px] rounded-full flex  justify-center items-center border text-[30px] border-main text-main font-medium text-white">
            3
          </div>
          <h5 className="text-[25px] font-extrabold leading-[27px] text-white my-4">
          Lottery
          </h5>
          <p className="text-[#676E89] text-lg  pb-[54px]">
          You have the opportunity to participate in a permission - less, free-run smart contract lottery and win amazing rewards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToBeDonor;
