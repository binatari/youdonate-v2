import React from 'react'

const FundraiserSteps = () => {
  return (
    <div className="mx-auto container py-[60px]">
      <span className="text-sm text-center block leading-7 text-[#676E89]">
        HOW TO BECOME A FUNDRAISER
      </span>
      <h3 className="text-[35px] text-center font-extrabold leading-[35px] text-white mb-4">
        Kickstart a campaign today
      </h3>
      <div className="flex sm:flex-row flex-col items-center justify-center space-x-10 md:space-x-40 mt-[78px]">
        <div className="max-w-[344px]">
          <div className="w-[68px] h-[68px] rounded-full flex  justify-center items-center border text-[30px] border-main text-main font-medium text-white">
            1
          </div>
          <h5 className="text-[25px] font-extrabold leading-[27px] text-white my-4">
            Campaign
          </h5>
          <p className="text-[#676E89] text-lg  pb-[54px]">
            Create a campaign of your choice and share it with your friends and
            family on social media!
          </p>
        </div>
        <div>
          <img src="/assets/speaker.png" />
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-center justify-center space-x-10 md:space-x-40 mt-[78px]">
        <div className='order-2'>
          <img src="/assets/monitor.png" />
        </div>
        <div className="max-w-[344px] sm:order-3">
          <div className="w-[68px] h-[68px] rounded-full flex  justify-center items-center border text-[30px] border-main text-main font-medium text-white">
            2
          </div>
          <h5 className="text-[25px] font-extrabold leading-[27px] text-white my-4">
            Monitor
          </h5>
          <p className="text-[#676E89] text-lg  pb-[54px]">
            Once your Campaign is successfully set up, you can keep track of
            your progress from your dashboard. Monitor the success of your
            campaign and make adjustments as needed.
          </p>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-center justify-center space-x-10 md:space-x-40 mt-[78px]">
        <div className="max-w-[344px]">
          <div className="w-[68px] h-[68px] rounded-full flex  justify-center items-center border text-[30px] border-main text-main font-medium text-white">
            3
          </div>
          <h5 className="text-[25px] font-extrabold leading-[27px] text-white my-4">
            Vote
          </h5>
          <p className="text-[#676E89] text-lg  pb-[54px]">
            Gain visibility for your Campaign, Share your campaign with our
            community and get more votes as your reach increases.
          </p>
        </div>
        <div>
          <img src="/assets/vote.png" />
        </div>
      </div>
    </div>
  );
}

export default FundraiserSteps