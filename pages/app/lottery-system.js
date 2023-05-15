import React from "react";
import Layout from "../../components/app/Layout";
import Countdown from "react-countdown";
import { useIsMounted } from "connectkit";

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return (
      <div className=" text-[24px] md:text-[54px] flex-wrap flex text-center nippo w-full text-bold justify-center gap-x-2 text-white">
        <div className="flex flex-col justify-center">
          <span className="md:text-[30px] text-white">Hour</span>
          <div className="p-2 px-4 block clock">{hours}</div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="md:text-[30px] text-[#102520]">Min</span>
          <span className="p-2 px-4 clock block">{minutes}</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="md:text-[30px] text-white">Sec</span>
          <span className="p-2 px-4 clock  block">{seconds}</span>
        </div>
      </div>
    );
  }
};

const LotterySystem = () => {
  const isMounted = useIsMounted();
  return (
    <div>
      <h3 className="text-[24px] text-white text-center font-extrabold">
        Donate Now and Get a Chance to Win <br /> Daily Lottery Rewards!
      </h3>
      <div className="bg-[#152238] rounded-[40px] w-full max-w-[637px] mx-auto mt-[30px] flex items-center flex-col">
        <img />
        <h2 className="text-[85.94px] text-white text-center font-extrabold">
          Get winning today!
        </h2>
        <button className="bg-[#344054] text-[19px] font-medium text-white px-6 py-3">
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
      </div>
    </div>
  );
};

LotterySystem.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default LotterySystem;
