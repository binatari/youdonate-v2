import React from 'react'
import Layout from "../../components/app/Layout";
const donations = () => {
  return (
    <div>donations</div>
  )
}

donations.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default donations