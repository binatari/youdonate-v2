import React from 'react'
import Layout from "../../components/app/Layout";
const donors = () => {
  return (
    <div>donors</div>
  )
}
donors.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default donors