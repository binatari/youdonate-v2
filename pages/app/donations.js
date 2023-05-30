import React, { useState, useMemo } from "react";
import Layout from "../../components/app/Layout";
import BasicTable from "../../components/app/Table.js/BasicTable";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
const MY_DONATIONS = gql`
  query getMyDonations($address: String!) {
    user(id: $address) {
      id
      donation {
        amount
        proposaId
        createdAt
      }
    }
  }
`;
const donations = () => {
  const [view, setView] = useState("grid");
  const columns = useMemo(
    () => [
      {
        Header: "Campaign name",
        accessor: "address",
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



  const { address, isConnecting, isDisconnected } = useAccount();

  const smallCase = address?.toLowerCase();
    const {
    loading: donationsLoading,
    error: donationsError,
    data: donationsData,
  } = useQuery(MY_DONATIONS, {
    variables: { address: smallCase },
    enabled: address,
  });


  const data = donationsData?.user?.donation?.map((entry)=>entry) || []

  
  const rows = useMemo(()=>data,[data]);

  return (
    <div>
      <div className="flex justify-end mb-9">
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
      <BasicTable data={rows} columns={columns} title={'My donations'} />
    </div>
  );
};

donations.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default donations;
