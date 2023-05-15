import React from 'react'

const ActiveCampaigns = () => {
  return (
    <div className="rounded-[5px] p-6 bg-[#152238]">
          <div className="flex justify-between mb-[37px]">
            <span className="text-white text-[20px]">ActiveCampaigns <span className='text-[#676E89]'>(4)</span></span>
            <img src="/assets/up-arrow.png" className="object-contain" />
          </div>
          <div className=''>
            <div className='flex space-x-3'>
            <img src='/assets/kids.png' className='max-h-[52px]'/>
            <div>
            <div className='flex space-x-2'>
            <img src='/assets/btc.png' className='contain'/>
            <span className="text-[#676E89] text-sm font-medium">BTC</span>
            </div>
            <span className='font-medium text-[15px] text-white mt-2'>The Girl Child Education</span>
         
            </div>
            </div>
            <div className='mt-4'>
            <progress className='w-full' max="100" value="70"></progress>
            <p className='text-white '>
            $20,000 <span className='text-[#667085]'>/$30,000</span>
            </p>
            </div>
          </div>

        </div>
  )
}

export default ActiveCampaigns