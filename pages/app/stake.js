import React from 'react'
import Layout from "../../components/app/Layout";
const stake = () => {
  return (
    <div>stake</div>
  )
}

stake.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };

export default stake