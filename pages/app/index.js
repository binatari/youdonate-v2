import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Layout from "../../components/app/Layout";
import BarChart from "../../components/app/Dashboard/BarChartCustom";
import BarChartCustom from "../../components/app/Dashboard/BarChartCustom";
import ActiveCampaigns from "../../components/app/Dashboard/ActiveCampaigns";
import BasicTable from "../../components/app/Table.js/BasicTable";
import { useMemo } from "react";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const MY_DONATIONS = gql`
  query getMyDonations($address: String!) {
    donations(where: { beneficiary: $address }) {
      beneficiary
      amount
      tokenSymbol
      token
      category
      createdAt
    }
  }
`;
const index = () => {

  const { address } = useAccount();

  const smallCase = address?.toLowerCase();

  const {
    loading: donationsLoading,
    error: donationsError,
    data: donationsData,
  } = useQuery(MY_DONATIONS, {
    variables: {
      address: smallCase,
    },
    enabled: address,
  });


  const MONTHS = () => {
    const months = [];
    const dateStart = moment();
    const dateEnd = moment().subtract(11, "month");
    console.log(dateEnd.diff(dateStart, "months"));
    while (dateEnd.diff(dateStart, "months") <= 0) {
      months.push({
        name: dateEnd.format("MMMM"),
        start: dateEnd.startOf("month").unix(),
        end: dateEnd.endOf("month").unix(),
      });
      dateEnd.add(1, "month");
    }
    return months.reverse();
  };


  const convertToMoney = (amount) =>{
   return Number(ethers.utils.formatUnits(amount || 0, 8).toString())
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
  }

  const data = MONTHS().map((month) => {
    const amount = donationsData?.donations
      ?.filter(
        (donation) =>
          donation.createdAt >= month.start && donation.createdAt <= month.end
      )
      .reduce((acc, donation) => acc + Number(donation.amount), 0);
    return {
      ...month,
      amt: Number(ethers.utils.formatUnits(amount || 0, 8).toString())
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
    };
  });

  console.log(data, Number(data[0]?.amt) / Number(data[1]?.amt));

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

  const rows = useMemo(
    () => donationsData?.donations || [],
    [donationsData?.donations]
  );

  const totalFunds = donationsData?.donations?.map((donation)=>{
    return {
      ...donation,
      createdAt: moment
      .unix(Number(donation?.createdAt?.toString()))
      .format("DD MMM YYYY"),
      amount:convertToMoney(donation?.amount)
    }
  })

  const todayFunds = donationsData?.donations
  ?.filter(
    (donation) =>
      donation.createdAt >= moment().startOf('day') && donation.createdAt <= moment().endOf('day')
  )
  .reduce((acc, donation) => acc + Number(donation.amount), 0);

  return (
    <div>
      <div className="grid-cols-1 md:grid-cols-3 grid gap-4">
        <div className="rounded-[5px] col-span-2 md:col-span-1 w-full  p-6 bg-[#152238]">
          <div className="flex justify-between">
            <span className="text-white">Total Fundraised 💸</span>
            <img src="/assets/up-arrow.png" className="object-contain" />
          </div>
          <div className="w-full flex">
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-[30px] leading-[44px] text-white mb-4">
               ${totalFunds?.reduce((acc, donation) => acc + Number(donation.amount), 0) || 0}
              </span>
              <p className="text-sm font-medium text-[#667085]">
                <span className="text-[#06D6A0]">
                  <i class="las la-arrow-up"></i>
                  {isNaN(Number(data[0]?.amt || '0') / Number(data[1]?.amt || '0') * 100) ? '0' :  Number(data[0]?.amt || '0') / Number(data[1]?.amt || '0') * 100 } %
                </span>
                vs last month
              </p>
            </div>
            <div className="h-28 w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={totalFunds} width={600} height={300}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {/* <XAxis dataKey="createdAt" />
              <YAxis /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="rounded-[5px] col-span-2 md:col-span-1 w-full  p-6 bg-[#152238]">
          <div className="flex justify-between">
            <span className="text-white">Fundraised Today💸</span>
            <img src="/assets/up-arrow.png" className="object-contain" />
          </div>
          <div className="w-full flex">
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-[30px] leading-[44px] text-white mb-4">
              ${todayFunds || 0}
              </span>
              <p className="text-sm font-medium text-[#667085]">
                <span className="text-[#F04438]">
                  <i class="las la-arrow-down"></i>
                  15%
                </span>
                vs last month
              </p>
            </div>
            <div className="h-28 w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} width={600} height={300}>
                  <defs>
                    <linearGradient id="colorBv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#F0443826"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#F0443826"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#F04438"
                    fillOpacity={1}
                    fill="url(#colorBv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="rounded-[5px] col-span-2 md:col-span-1 w-full   p-6 bg-[#152238]">
          <div className="flex justify-between">
            <span className="text-white">Active Donors 👥</span>
            <img src="/assets/up-arrow.png" className="object-contain" />
          </div>
          <div className="w-full flex">
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-[30px] leading-[44px] text-white mb-4">
                2
              </span>
              <p className="text-sm font-medium text-[#667085]">
                <span className="text-[#06D6A0]">
                  <i class="las la-arrow-up"></i>
                  40%
                </span>
                vs last month
              </p>
            </div>
            <div className="h-28 w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} width={600} height={300}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amt"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <BarChartCustom data={data} />
        <ActiveCampaigns />
        <div className="md:col-span-3 overflow-x-auto">
          <BasicTable columns={columns} data={rows} showIcon />
        </div>

        <div></div>
      </div>
      <div className=" md:grid-cols-3 grid gap-4"></div>
    </div>
  );
};

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default index;
