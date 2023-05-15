import React from "react";

const AppNav = () => {
  return (
    <nav className=" pt-[30px] pb-[37px]">
      <div className=" w-full max-w-[432px] pl-6 items-center py-3 pr-2 bg-[#152238] rounded-[60px] flex justify-between">
        <input
          type={"text"}
          placeholder="Search campaign, donations, donors..."
          className={`bg-transparent border-none placeholder-[#344054] w-full max-w-[290px] max-h-6 ring-0 focus:ring-0 focus:border-none text-white`}
        />
        <img src="/assets/search.png" className="object-contain" alt="search key" />
      </div>
    </nav>
  );
};

export default AppNav;
