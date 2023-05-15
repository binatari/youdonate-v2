import React from "react";
import Layout from "../../components/app/Layout";
import Countdown from "react-countdown";
import { useIsMounted } from "connectkit";

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return (
      <div className=" text-[24px] md:text-[31.18px] flex-wrap flex text-center nippo w-full text-bold justify-center gap-x-2 text-white space-x-8">
        <div className="flex flex-col justify-center">
          <span className="md:text-[25.51px] text-white mb-4">Hour</span>
          <span className="p-2 px-4 block clock text-[31px]">{hours}</span>
        </div>
        <img src="/assets/dots.png" className="object-contain"/>
        <div className="flex flex-col justify-center">
          <span className="md:text-[25.51px] text-white mb-4">Min</span>
          <span className="p-2 px-4 clock block text-[31px]">{minutes}</span>
        </div>
        <img src="/assets/dots.png" className="object-contain"/>
        <div className="flex flex-col justify-center">
          <span className="md:text-[25.51px] text-white mb-4">Sec</span>
          <span className="p-2 px-4 clock  block text-[31px]">{seconds}</span>
        </div>
      </div>
    );
  }
};

const LotterySystem = () => {
  const isMounted = useIsMounted();
  return (
    <div className="pb-[200px]">
      <h3 className="text-[24px] text-white text-center font-extrabold">
        Donate Now and Get a Chance to Win <br /> Daily Lottery Rewards!
      </h3>
      <div className="bg-[#152238] py-[95px] rounded-[40px] w-full max-w-[637px] mx-auto mt-[30px] flex items-center flex-col">
        <h2 className="text-[85.94px] text-white text-center font-extrabold">
        🏆
        </h2>
        <h2 className="text-[32.23px] text-white text-center font-extrabold">
        Get winning today!
        </h2>
        <button className="bg-[#344054] text-[19px] rounded-[53px] font-medium text-white px-6 py-3 mt-10 mb-5">
          Next draw time
        </button>
        {isMounted ? (
          <Countdown
            zeroPadTime={2}
            daysInHours
            key={100000}
            date={1000000000}
            renderer={renderer}
            autoStart={true}
          />
        ) : null}
             <div className="flex space-x-3 mt-10">
        <button className="bg-[#06D6A0] border border-[#06D6A0] rounded-[80px] text-center text-white py-[11.9531px] px-[23.9062px]">
          Buy Tickets
        </button>
        <button className="border border-[#06D6A0] rounded-[80px] text-center text-[#06D6A0] py-[11.9531px] px-[23.9062px]">
         How to play
        </button>
      </div>
      </div>
    </div>
  );
};

LotterySystem.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default LotterySystem;
