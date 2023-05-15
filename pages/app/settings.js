import React from 'react'
import Layout from "../../components/app/Layout";
const settings = () => {
  return (
    <div>settings</div>
  )
}
settings.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default settings