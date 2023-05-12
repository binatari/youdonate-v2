import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HomeNav from "../components/HomeNav";
import Hero from "../components/Hero";
import FundraiserSteps from "../components/FundraiserSteps";

export default function Home() {
  const imgArr = Array.from(Array(10).keys());
  return (
    <main className="bg-[#0F172A] bg-[url(/assets/noise.png)] min-h-screen overflow-x-hidden">
      <HomeNav />
      <Hero />
      <div className="flex space-x-4 opacity-10 mt-9">
        {imgArr.map((element, i) => (
          <img key={i} src="/assets/give.png" />
        ))}
        <img src="/assets/give.png" />
      </div>
      <div className="bg-[#152238] py-[30px]">
        <div className="container mx-auto flex justify-start  my-[30px] ">
          <div className="max-w-3xl">
            <span className="text-sm leading-7 text-[#676E89] text-center">
              INCENTIZING SOCIAL GOOD
            </span>
            <h3 className="text-[35px] font-extrabold leading-[35px] text-white my-4">
              Fundraising powered by robust <br/> innovation
            </h3>
            <p className="text-[#676E89] text-lg  pb-[54px]">
              YouDonate Protocol is designed to be simple to use. Donors can simply select a charity or non-profit they wish to donate to, and donate with a few clicks. The donation is then recorded on the blockchain,providing a permanent, immutable record of the transaction.
            </p>
            <button className="bg-[#06D6A0] border border-[#06D6A0] rounded-[80px] text-center text-white py-[11.9531px] px-[23.9062px]">
              Learn more
            </button>
          </div>
        </div>
      </div>
      <FundraiserSteps/>
    </main>
  );
}
