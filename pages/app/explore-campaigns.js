import React from 'react'
import Layout from "../../components/app/Layout";
const ExploreCampaigns = () => {
  return (
    <div>explore-campaigns</div>
  )
}

ExploreCampaigns.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };

export default ExploreCampaigns