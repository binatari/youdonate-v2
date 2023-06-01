import React, { useState, useMemo } from "react";
import Layout from "../../components/app/Layout";
import BasicTable from "../../components/app/Table.js/BasicTable";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import moment from "moment";
import { convertToMoney } from "../../utils/func";
import { InView } from "react-intersection-observer";
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
  const [date, setDate] = React.useState()
  const [view, setView] = useState("grid");

  //change to campaign name
  const columns = useMemo(
    () => [
      {
        Header: "Wallet address",
        accessor: "beneficiary",
      },
      {
        // id:'donor',
        Header: "Asset type",
        accessor: "tokenSymbol",
        Cell: ({ value, cell }) => (
          <div className="flex space-x-2 items-center w-full justify-center">
            <img src="/assets/btc.png" className="contain" />
            <p className="text-white ">
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
            ${convertToMoney(value)}
            {/* <span className="text-[13px] block text-[#667085]">
              0.218128 BTC
            </span> */}
          </p>
        ),
      },
      {
        Header: "Type",
        accessor: "category",
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell:({value})=> moment
          .unix(Number(value?.toString()))
          .format("DD MMM YYYY")
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
    fetchMore
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
          <Popover>
      <PopoverTrigger asChild>
      <button
            className={`py-3 flex items-center space-x-2 px-8 text-lg text-center  ${
              view == "list" ? "bg-[#344054] text-white" : "text-[#676E89]"
            }`}
            onClick={() => setView("list")}
          >
            <i class="las la-calendar-day"></i>
            Date posted
          </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
       
        </div>
      </div>
      <BasicTable data={rows} columns={columns} isLoading={donationsLoading} title={'My donations'} />
      {/* {data && (
        <InView
          onChange={async (inView) => {
            const currentLength = data.length || 0;
            if (inView) {
              await fetchMore({
                variables: {
                  first: currentLength +  8,
                  category:filter
                },
              }).then(res=>{
                console.log(res)
               return res}).catch(err=>console.log(err));
            }
          }}
        />
      )} */}
    </div>
  );
};

donations.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default donations;
