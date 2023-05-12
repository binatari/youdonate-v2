import React from 'react'
import CampaignCard from './CampaignCard'

const TrendingCampaigns = () => {
  return (
    <div className='py-[60px]'>
           <span className="text-sm block text-center leading-7 text-[#676E89]">
           TRENDING CAMPAIGNS
      </span>
      <h3 className="text-[35px] text-center font-extrabold leading-[35px] text-white mb-4">
      Explore trending campaigns
      </h3>
      <CampaignCard/>
      <img src='/assets/gradient-upper.png' className='absolute top-0 left-0' />
    </div>
  )
}

export default TrendingCampaigns