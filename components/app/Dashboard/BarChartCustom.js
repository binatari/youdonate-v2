import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const BarChartCustom = ({data}) => {
  return (
    <div className="rounded-[5px] p-6 bg-[#152238] col-span-2">
      <div className="md:flex justify-between">
        <span className="font-medium md:inline-block block  md:mb-0 mb-4 text-xl text-white">
          Fundraised Analytics
        </span>
        <div className="bg-[#0F172A] rounded-[37px] flex overflow-x-hidden">
          {/* <div className="pt-2 pb-1 px-4 text-[#667085] cursor-pointer">
            Daily
          </div>
          <div className="pt-2 pb-1 px-4 text-[#667085] cursor-pointer">
            Weekly
          </div> */}
          <div className="pt-2 pb-1 px-4 bg-white rounded-[20px] font-medium text-sm text-[#152238] cursor-pointer">
            Monthly
          </div>
        </div>
      </div>
      <div className="h-[300px] w-full mt-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data}  barSize={10}>
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip  />
            <Bar
              dataKey="amt"
              fill="#8884d8"
              radius={8}
              // label={{
              //   position: "insideBottom",
              //   angle: -60,
              //   fill: "black",
              //   offset: 25,
              // }}
              background={{ fill: '#667085' }}
            >
              {/* <LabelList dataKey="name" /> */}
              {data.map((entry, index) => (
                <Cell fill={'#06D6A0'} key={`cell-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartCustom;
