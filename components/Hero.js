import React from 'react'

const Hero = () => {
  return (
    <div className="mx-auto pt-[170px] flex justify-center text-white flex-col items-center max-w-2xl relative">
      <span className="text-sm leading-7 text-[#676E89] text-center">
        WELCOME TO YOUDONATE PROTOCOL
      </span>
      <h1 className="text-[45px] font-extrabold leading-[45px] text-center my-4">
        Receive and donate funds to worthy causes seamlessly
      </h1>
      <p className="text-[#676E89] text-lg text-center pb-[54px]">
        We offers a secure, transparent and efficient way to collect and donate
        funds for causes you believe in. Join us and make a difference!
      </p>
      <div className="flex space-x-3">
        <button className="bg-[#06D6A0] border border-[#06D6A0] rounded-[80px] text-center text-white py-[11.9531px] px-[23.9062px]">
          Get started
        </button>
        <button className="border border-[#06D6A0] rounded-[80px] text-center text-[#06D6A0] py-[11.9531px] px-[23.9062px]">
          Connect wallet
        </button>
      </div>
      <img src='/assets/gradient-lower.png' className='absolute -bottom-80 -right-80' />
    </div>
  );
}

export default Hero