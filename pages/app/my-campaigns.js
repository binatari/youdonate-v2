import React, { useState } from "react";
import Layout from "../../components/app/Layout";
import CampaignCard from "../../components/CampaignCard";
const MyCampaigns = () => {
    const [filter, setFilter] = useState('all')
    const [view, setView] = useState('grid')
    const imgArr = Array.from(Array(10).keys());
  return (
    <div>
      <div className="flex justify-between space-x-8 flex-wrap">
        <div className="flex rounded-[5px] border-[#676E894D] border overflow-x-hidden">
          <button className={`py-3 px-8 text-lg text-center border-[#676E894D] border-r  ${filter == 'all' ? 'bg-[#344054] text-white' : 'text-[#676E89]'}`} onClick={()=>setFilter('all')}>All campaigns</button>
          <button className={`py-3 px-8 text-lg text-center border-[#676E894D] border-r  ${filter == 'new' ? 'bg-[#344054] text-white' : 'text-[#676E89]'}`}onClick={()=>setFilter('new')}>New</button>
          <button className={`py-3 px-8 text-lg text-center border-[#676E894D] border-r ${filter == 'goal-met' ? 'bg-[#344054] text-white' : 'text-[#676E89]'}`} onClick={()=>setFilter('goal-met')}>Goal reached</button>
          <button className={`py-3 px-8 text-lg text-center ${filter == 'not-reached' ? 'bg-[#344054] text-white' : 'text-[#676E89]'}`} onClick={()=>setFilter('not-reached')}>Goal unreached</button>
        </div>
        <div className="flex space-x-2 " >
          <div className="flex overflow-x-hidden border-[#676E894D] border rounded-[5px]">
            <button className={`py-3 flex items-center space-x-2 px-8 text-lg text-center border-r border-[#676E894D]  ${view == 'grid' ? 'bg-[#344054] text-white' : 'text-[#676E89]'}`} onClick={()=>setView('grid')}>
            <i class="las la-th-large"></i>
            Grid
            </button>
            <button className={`py-3 flex items-center space-x-2 px-8 text-lg text-center  ${view == 'list' ? 'bg-[#344054] text-white' : 'text-[#676E89]'}`} onClick={()=>setView('list')}>
            <i class="las la-list"></i>
            List
            </button>
          </div>
        <button className="text-lg flex items-center py-3 px-4 text-white bg-[#344054] rounded-[5px]">
        <i class="las la-calendar-day"></i>
          Date posted
        </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mt-12">
        {
          imgArr.map((entry)=><div className="flex justify-center md:justify-start" ><CampaignCard/></div>)
        }
      </div>
    </div>
  );
};
MyCampaigns.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default MyCampaigns;
