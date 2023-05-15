import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function Sidebar({ show, setter }) {
    const router = useRouter();

    // Define our base class
    const className = "bg-[#152238] min-h-screen w-[250px] transition-[margin-left] ease-in-out duration-500 fixed top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

    // Clickable menu items
    const MenuItem = ({ icon, name, route }) => {
        // Highlight menu item based on currently displayed route
        const colorClass = router.pathname === route ? "text-white bg-[#344054]" : "text-white/50 hover:text-white";

        return (
            <Link
                href={route}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
                className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3  ${colorClass}`}
            >
                {/* <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                    {icon}
                </div> */}
                <div>{name}</div>
            </Link>
        )
    }

    // Overlay to prevent clicks in background, also serves as our close button
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div className="pb-[42px] pt-[30px] flex justify-center">
                    <Link href="/">
                        {/*eslint-disable-next-line*/}
                        <img src={'/assets/logo-2.png'} alt="Company Logo"  />
                    </Link>
                </div>
                <div className="flex flex-col">
                    <MenuItem
                        name="Dashboard"
                        route="/app"
                       
                    />
                    <MenuItem
                        name="Explore campaigns"
                        route="/app/explore-campaigns"
                       
                    />
                    <MenuItem
                        name="My Campaigns"
                        route="/app/my-campaigns"
                        
                    />
                    <MenuItem
                        name="Donations"
                        route="/app/donations"
                       
                    />
                    <MenuItem
                        name="Donors"
                        route="/app/donors"
                   
                    />
                     <MenuItem
                        name="Lottery system"
                        route="/app/lottery-system"
                   
                    />
                     <MenuItem
                        name="Stake"
                        route="/app/stake"
                   
                    />
                     <MenuItem
                        name="Fundraised history"
                        route="/app/fundraised-history"
                   
                    />
                     <MenuItem
                        name="Settings"
                        route="/app/settings"
                   
                    />
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
}