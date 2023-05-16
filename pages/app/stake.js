import React from "react";
import Layout from "../../components/app/Layout";
import { useIsMounted } from "connectkit";
import Countdown from "react-countdown";

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return (
      <div className=" text-[24px] md:text-[31.18px] flex-wrap items-center flex text-center nippo w-full text-bold justify-center gap-x-2 text-white space-x-2">
        <div className="flex flex-col justify-center items-center">
          <span className="p-2 px-4 block clock text-[12px]">{hours}hr</span>
        </div>
        <img src="/assets/dots.png" className="object-contain" />
        <div className="flex flex-col justify-center  items-center">
          <span className="p-2 px-4 clock block text-[12px]">{minutes}m</span>
        </div>
        <img src="/assets/dots.png" className="object-contain" />
        <div className="flex flex-col justify-center  items-center">
          <span className="p-2 px-4 clock  block text-[12px]">{seconds}s</span>
        </div>
      </div>
    );
  }
};

const stake = () => {
  const isMounted = useIsMounted();
  return (
    <div className="pb-[200px]">
      <div className="bg-[#152238] py-[95px] rounded-[40px] w-full max-w-[752px] mx-auto mt-[30px] flex items-center flex-col">
        <h2 className="text-[20px] text-white text-center font-medium">
          AVAILABLE ASSETS
        </h2>
        <div className="grid grid-cols-2 gap-4 border-b border-[#676E894D] pb-[53px] mb-[37px]"  >
          <div className="flex flex-col items-center">
          <img src="/assets/arb.png"/>  
          <span className="text-xl my-[14px] text-[#676E89]">
          AVAILABLE YDT
          </span>
          <span className="text-[23px] mb-[9px]  font-semibold text-white">
          $100,000
          </span>
          <span className="text-xl text-[#676E89]">
          0.0038420 YDT
          </span>
            <div className="flex space-x-3 mt-5">
              <button className="bg-[#06D6A0] border border-[#06D6A0] rounded-[80px] text-center text-white py-[11.9531px] px-[23.9062px]">
                Stake YDT
              </button>
              <button className="border border-[#06D6A0] rounded-[80px] text-center text-[#06D6A0] py-[11.9531px] px-[23.9062px]">
                Unstake YDT
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
          <img src="/assets/arb.png"/>  
          <span className="text-xl my-[14px] text-[#676E89]">
          AVAILABLE ETH
          </span>
          <span className="text-[23px] mb-[9px]  font-semibold text-white">
          $100,000
          </span>
          <span className="text-xl text-[#676E89]">
          0.0038420 ETH
          </span>
            <div className="flex space-x-3 mt-5">
              <button className="bg-[#06D6A0] border border-[#06D6A0] rounded-[80px] text-center text-white py-[11.9531px] px-[23.9062px]">
                Stake ETH
              </button>
              <button className="border border-[#06D6A0] rounded-[80px] text-center text-[#06D6A0] py-[11.9531px] px-[23.9062px]">
                Unstake ETH
              </button>
            </div>
          </div>
        </div>
        <h2 className="text-[20px] text-white text-center">
        STAKED ASSETS
        </h2>
        <div className="grid grid-cols-2 gap-10  mb-[37px]"  >
        <div className="flex flex-col items-center">
          <img src="/assets/arb.png"/>  
          <span className="text-xl my-[14px] text-[#676E89]">
          STAKED YDT
          </span>
          <span className="text-[23px] mb-[9px]  font-semibold text-white">
          $100,000
          </span>
          <span className="text-xl text-[#676E89] mb-4">
          0.0038420 YDT
          </span>
          <Countdown
            zeroPadTime={2}
            daysInHours
            key={100000}
            date={1000000000}
            renderer={renderer}
            autoStart={true}
          />
            <p className="text-white mt-4 text-lg text-center">
          $30,000 <span className="text-[#06D6A0] text-sm font-medium underline">
          Claim reward 🏆
          </span>
          </p>
          </div>
          <div className="flex flex-col items-center">
          <img src="/assets/arb.png"/>  
          <span className="text-xl my-[14px] text-[#676E89]">
          STAKED ETH
          </span>
          <span className="text-[23px] mb-[9px]  font-semibold text-white">
          $100,000
          </span>
          <span className="text-xl text-[#676E89] mb-4">
          0.0038420 ETH
          </span>
          <Countdown
            zeroPadTime={2}
            daysInHours
            key={100000}
            date={1000000000}
            renderer={renderer}
            autoStart={true}
          />
          <p className="text-white mt-4 text-lg text-center">
          $30,000 <span className="text-[#06D6A0] text-sm font-medium underline">
          Claim reward 🏆
          </span>
          </p>
          </div>
        </div>
        <p className="text-[#667085] text-lg mb-4">
        Associated fees: <span className="text-white font-medium">$5,000 </span>
        </p>
        <p className="text-[#667085] text-lg mb-4">
        Potential risk:<span className="text-[#F04438] font-medium"> 10%  </span>
        </p>
      </div>
    </div>
  );
};

stake.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default stake;
