import { ConnectKitButton, useIsMounted } from "connectkit";
import React from "react";

const AppNav = () => {
  const isMounted = useIsMounted();
  return (
    <nav className=" pt-[30px] pb-[37px] flex justify-between">
      <div className=" w-full max-w-[432px] pl-6 items-center py-3 pr-2 bg-[#152238] rounded-[60px] flex justify-between">
        <input
          type={"text"}
          placeholder="Search campaign, donations, donors..."
          className={`bg-transparent border-none placeholder-[#344054] w-full max-w-[290px] max-h-6 ring-0 focus:ring-0 focus:border-none text-white`}
        />
        <img
          src="/assets/search.png"
          className="object-contain"
          alt="search key"
        />
      </div>
      <div>
        {isMounted ? (
         <ConnectKitButton.Custom>
         {({ isConnected, show, truncatedAddress, ensName }) => {
           return (
             <button className="bg-[#06D6A0] border border-[#06D6A0] rounded-[80px] text-center text-white py-[11.9531px] px-[23.9062px]" onClick={show}>
               {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
             </button>
           );
         }}
       </ConnectKitButton.Custom>
        ) : null}
      </div>
    </nav>
  );
};

export default AppNav;
