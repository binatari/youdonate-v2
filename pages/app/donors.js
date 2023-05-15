import React, { useMemo, useState } from 'react'
import Layout from "../../components/app/Layout";
import BasicTable from '../../components/app/Table.js/BasicTable';
const donors = () => {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState('all')
  const columns = useMemo(
    () => [
      {
        Header: "Wallet address",
        accessor: "address",
      },
      {
        Header: "Campaign",
        accessor: "campaign",
      },
      {
        // id:'donor',
        Header: "Asset type",
        accessor: "asset",
        Cell: ({ value }) => (
          <div className="flex space-x-2 items-center">
            <img src="/assets/btc.png" className="contain" />
            <p className="text-white ">
              Bitcoin{" "}
              <span className="text-[13px]  text-[#667085]">{value}</span>
            </p>
          </div>
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value }) => (
          <p className="text-white font-semibold">
            $100,000{" "}
            <span className="text-[13px] block text-[#667085]">
              0.218128 BTC
            </span>
          </p>
        ),
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  const rows = useMemo(
    () => [
      {
        address: "23QWEF4532522",
        asset: "BTC",
        amount: "100,000",
        type: "Disaster relief",
        date: "July 18, 2023",
      },
      {
        address: "23QWEF4532522",
        asset: "BTC",
        amount: "100,000",
        type: "Disaster relief",
        date: "July 18, 2023",
      },
      {
        address: "23QWEF4532522",
        asset: "BTC",
        amount: "100,000",
        type: "Disaster relief",
        date: "July 18, 2023",
      },
      {
        address: "23QWEF4532522",
        asset: "BTC",
        amount: "100,000",
        type: "Disaster relief",
        date: "July 18, 2023",
      },
      {
        address: "23QWEF4532522",
        asset: "BTC",
        amount: "100,000",
        type: "Disaster relief",
        date: "July 18, 2023",
      },
    ],
    []
  );
  return (
    <div>
      <div className="flex justify-between mb-9">
      <div className="flex rounded-[5px] border-[#676E894D] border overflow-x-hidden">
          <button className={`py-3 px-8 text-lg text-center border-[#676E894D] border-r  ${filter == 'all' ? 'bg-[#344054] text-white' : 'text-[#676E89]'}`} onClick={()=>setFilter('all')}>Latest donors 👥</button>
          <button className={`py-3 px-8 text-lg text-center border-[#676E894D] border-r  ${filter == 'new' ? 'bg-[#344054] text-white' : 'text-[#676E89]'}`}onClick={()=>setFilter('new')}>Top Donors 👥</button>
        </div>
        <div className="flex overflow-x-hidden border-[#676E894D] border rounded-[5px]">
          <button
            className={`py-3 flex items-center space-x-2 px-8 text-lg text-center border-r border-[#676E894D]  ${
              view == "grid" ? "bg-[#344054] text-white" : "text-[#676E89]"
            }`}
            onClick={() => setView("grid")}
          >
            Bitcoins
          </button>
          <button
            className={`py-3 flex items-center space-x-2 px-8 text-lg text-center  ${
              view == "list" ? "bg-[#344054] text-white" : "text-[#676E89]"
            }`}
            onClick={() => setView("list")}
          >
            <i class="las la-calendar-day"></i>
            Date posted
          </button>
        </div>
      </div>
      <BasicTable data={rows} columns={columns} title={'My donors'} />
    </div>
  );
}
donors.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default donors