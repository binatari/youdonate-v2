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

const index = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: "Wallet address",
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
      <div className="grid-cols-1 md:grid-cols-3 grid gap-4">
        <div className="rounded-[5px] col-span-2 md:col-span-1 w-full  p-6 bg-[#152238]">
          <div className="flex justify-between">
            <span className="text-white">Total Fundraised 💸</span>
            <img src="/assets/up-arrow.png" className="object-contain" />
          </div>
          <div className="w-full flex">
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-[30px] leading-[44px] text-white mb-4">
                $100,000
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
                  {/* <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="pv"
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
                $56,000
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
                $100,000
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
                    dataKey="pv"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <BarChartCustom />
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
