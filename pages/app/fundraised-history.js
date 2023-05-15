import React from 'react'
import Layout from "../../components/app/Layout";
const FundraisedHistory = () => {
  return (
    <div>fundraised-history</div>
  )
}

FundraisedHistory.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };

export default FundraisedHistory