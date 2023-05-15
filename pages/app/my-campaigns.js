import React from 'react'
import Layout from "../../components/app/Layout";
const MyCampaigns = () => {
  return (
    <div>MyCampaigns</div>
  )
}
MyCampaigns.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default MyCampaigns