import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
const Categories = () => {
    const solutions = [
        {
          name: 'Clubs & communities',
          description: 'Provide supports to local clubs and communitiesMeasure actions your users take',
          href: '##',
          icon: '/assets/category/clubs.png',
        },

        {
          name: 'Creative projects',
          description: 'Fundraise your creativity and ideas to life',
          href: '##',
          icon: '/assets/category/creative.png',
        },
        {
            name: 'Disaster reliefs',
            description: 'Provide support to people affected by disasters.',
            href: '##',
            icon: '/assets/category/disaster.png',
          },
          {
            name: 'Fraternities & sororities',
            description: 'Raise funds for fraternities & sororities to support their goal',
            href: '##',
            icon: '/assets/category/frats.png',
          },
          {
            name: 'Fun & special events',
            description: 'Support fun events and help make them memorable',
            href: '##',
            icon: '/assets/category/fun.png',
          },
          {
            name: 'Kids & family',
            description: 'Raise funds for a kids’ activity/family-focused cause',
            href: '##',
            icon: '/assets/category/family.png',
          },
          {
            name: 'LGBTQs',
            description: 'Support LGBTQs initiatives and create a more inclusive world',
            href: '##',
            icon: '/assets/category/clubs.png',
          },
          {
            name: 'Medical activities',
            description: 'Raise funds for medical and health causes',
            href: '##',
            icon: '/assets/category/medical.png',
          },
          {
            name: 'Memorials & funerals',
            description: 'Fund a memorial or funeral to honor the life of a loved one',
            href: '##',
            icon: '/assets/category/memorial.png',
          },
          {
            name: 'Non profit organizations',
            description: 'Raise funds for a nonprofit organization or charity',
            href: '##',
            icon: '/assets/category/non-profit.png',
          },
          {
            name: 'Pets and animals',
            description: 'Raise funds to help animals and support pet causes',
            href: '##',
            icon: '/assets/category/pets.png',
          },
          {
            name: 'Politics and public offices',
            description: 'Fundraise political campaigns or public offices initiative',
            href: '##',
            icon: '/assets/category/politics.png',
          },
          {
            name: 'Religious organizations',
            description: 'Raise funds for a religious organization',
            href: '##',
            icon: '/assets/category/religous.png',
          },
          {
            name: 'Runs, walks and rides',
            description: 'Support and fund a run, walk, or ride event',
            href: '##',
            icon: '/assets/category/runs.png',
          },
          {
            name: 'Security personnels',
            description: 'Raise funds to support military personnel and their families',
            href: '##',
            icon: '/assets/category/security.png',
          },
          {
            name: 'School teams & sports',
            description: 'Raise funds to support schools and educational initiatives',
            href: '##',
            icon: '/assets/category/school.png',
          },
          {
            name: 'Trips & adventures',
            description: 'Fundraise exciting trips and adventures',
            href: '##',
            icon: '/assets/category/trips.png',
          },
      ]
      
  return (
    <div className=" w-full max-w-sm">
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
           className="text-lg flex items-center py-3 px-4 text-white bg-[#344054] rounded-[5px]"
          >
            <span>all</span>
            <i className={`las la-angle-down ${open ? '' : 'text-opacity-70'}
                ml-2 h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"></i>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-[100%] z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-3">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                        {/* <item.icon aria-hidden="true" /> */}
                        <img src={item.icon}/>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  </div>
)
}

function IconOne() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  function IconTwo() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  function IconThree() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
        <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
        <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
        <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
        <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
        <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
      </svg>
    )
  }

export default Categories