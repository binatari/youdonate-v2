import React from "react";

const HomeNav = () => {
  return (
    <nav class=" fixed w-full z-20 top-0 left-0">
      <div class="container flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border  md:flex-row md:space-x-8 md:mt-0 md:border-0 font-inter">
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 fontmd:dark:text-blue-500"
                aria-current="page"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 fontmd:dark:text-blue-500"
                aria-current="page"
              >
                Campaigns
              </a>
            </li>
          </ul>
        </div>
        <a href="https://flowbite.com/" class="flex items-center">
          <img src="/assets/logo.png" class="h-10 mr-3" alt="Home Logo" />
        </a>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto "
          id="navbar-sticky"
        >
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 fontmd:dark:text-blue-500"
                aria-current="page"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 fontmd:dark:text-blue-500"
                aria-current="page"
              >
                Campaigns
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
