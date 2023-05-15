import React from 'react'
import Layout from "../../components/app/Layout";
const LotterySystem = () => {
  return (
    <div>lottery-system</div>
  )
}

LotterySystem.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default LotterySystem