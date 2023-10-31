import { useState } from 'react'

// Internal
import ApplicationLogo from '@/Components/ApplicationLogo'
import {
    NavMenu,
    NavItem,
    NavLink,
} from '@/Components/NavMenu'
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/Components/DropdownMenu'

// Inertia 
import { usePage } from '@inertiajs/react'

// Radix UI
import { BellIcon, DiscordLogoIcon, GearIcon, GlobeIcon, InfoCircledIcon, MixerHorizontalIcon, MixerVerticalIcon } from '@radix-ui/react-icons'

export default function Authenticated({ user, header, children }) {

    const { url } = usePage()

    return (
        <div>
            <NavMenu orientation='horizontal'>
                <NavItem className='mr-3'>
                    <NavLink href='#'>
                        <ApplicationLogo className='w-9 fill-current text-teal-200' />
                    </NavLink>
                </NavItem>

                <NavItem className='mr-auto'>
                    <NavLink 
                        type='dropdown'
                        dropdownTrigger={{ title: <>Settings</> }}
                    >
                        <DropdownMenuItem
                            className={`
                                rounded-sm flex items-center px-2 py-0.5 relative select-none outline-none
                                text-teal-50
                                hover:bg-teal-500
                                data-[highlighted]:bg-teal-500
                                data-[disabled]:text-teal-400 data-[disabled]:pointer-events-none 
                            `}
                        >
                            Item A
                            <MixerHorizontalIcon className='ml-auto' />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`
                                rounded-sm flex items-center px-2 py-0.5 relative select-none outline-none
                                text-teal-50
                                hover:bg-teal-500
                                data-[highlighted]:bg-teal-500
                                data-[disabled]:text-teal-400 data-[disabled]:pointer-events-none 
                            `}
                        >
                            Item B
                            <GlobeIcon className='ml-auto'/>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="h-[1px] bg-teal-300 m-1.5" />
                        <DropdownMenuItem
                            className={`
                                rounded-sm flex items-center px-2 py-0.5 relative select-none outline-none
                                text-teal-50
                                hover:bg-teal-500
                                data-[highlighted]:bg-teal-500
                                data-[disabled]:text-teal-400 data-[disabled]:pointer-events-none 
                            `}
                        >
                            Item C
                            <GearIcon className='ml-auto'/>
                        </DropdownMenuItem>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink 
                        href={ url === '/dashboard' ? `#` : route('dashboard') }
                        active={url.startsWith('/dashboard') ? true : false}
                        className={`
                            px-4 py-2 rounded shadow outline-none border-teal-200 duration-150
                            bg-teal-400 border-b-2 scale-100
                            hover:bg-teal-300 hover:scale-105
                            focus:bg-teal-300 focus:scale-105
                            active:bg-teal-600 active:scale-100 active:border-teal-400
                            data-[active]:bg-teal-600 data-[active]:scale-100 data-[active]:border-b-0
                        `}
                    >
                        <DiscordLogoIcon width={18} height={18} />
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink 
                        href='#'
                        className={`
                            px-4 py-2 rounded flex shadow outline-none border-teal-200 duration-150
                            bg-teal-400 border-b-2 scale-100
                            hover:bg-teal-300 hover:scale-105
                            focus:bg-teal-300 focus:scale-105
                            active:bg-teal-600 active:scale-100 active:border-teal-400
                            data-[active]:bg-teal-600 data-[active]:scale-100 data-[active]:border-b-0
                        `}
                    >
                        <DiscordLogoIcon width={18} height={18} />
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink 
                        href='#'
                        className={`
                            px-4 py-2 rounded flex shadow outline-none border-teal-200 duration-150
                            bg-teal-400 border-b-2 scale-100
                            hover:bg-teal-300 hover:scale-105
                            focus:bg-teal-300 focus:scale-105
                            active:bg-teal-600 active:scale-100 active:border-teal-400
                            data-[active]:bg-teal-600 data-[active]:scale-100 data-[active]:border-b-0
                        `}
                    >
                        <DiscordLogoIcon width={18} height={18} />
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink 
                        href='#'
                        className={`
                            px-4 py-2 rounded flex shadow outline-none border-teal-200 duration-150
                            bg-teal-400 border-b-2 scale-100
                            hover:bg-teal-300 hover:scale-105
                            focus:bg-teal-300 focus:scale-105
                            active:bg-teal-600 active:scale-100 active:border-teal-400
                            data-[active]:bg-teal-600 data-[active]:scale-100 data-[active]:border-b-0
                        `}
                    >
                        <DiscordLogoIcon width={18} height={18} />
                    </NavLink>
                </NavItem>

                <NavItem className='ml-auto'>
                    <NavLink
                        minWidth='500px'
                        type='dropdown'
                        dropdownTrigger={{ title: <BellIcon width={24} height={24} />, withIcon: false }}
                    >
                        <DropdownMenuItem
                            className={`
                                rounded-sm flex flex-col text-sm px-2 py-1.5 relative select-none outline-none duration-150
                                text-teal-50
                                hover:bg-teal-500
                                data-[highlighted]:bg-teal-500
                                data-[disabled]:text-teal-400 data-[disabled]:pointer-events-none 
                                data-[hasBeenRead]:text-teal-300
                            `}
                        >
                            <div className='flex items-center justify-between font-bold'>
                                <div className='flex items-center text-base'>
                                    <InfoCircledIcon className='mr-1'/>
                                    An order request has been submitted.
                                </div>
                                <div className='text-xs'>161020230001</div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <div className='mt-1'>Patient: <span className='font-bold'>Muhammad Novani Fajar</span></div>
                                    <div>Referring Physician: <span className='font-bold'>Muhammad Novani Fajar</span></div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-1'>
                                <div><span className='font-bold'>Test 1</span>, <span className='font-bold'>Test 2</span>, and <span className='font-bold'>Test 3</span>.</div>
                                <div className='font-bold'>about 4 minutes ago</div>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`
                                rounded-sm flex flex-col text-sm px-2 py-1.5 relative select-none outline-none duration-150
                                text-teal-50
                                hover:bg-teal-500
                                data-[highlighted]:bg-teal-500
                                data-[disabled]:text-teal-400 data-[disabled]:pointer-events-none 
                                data-[hasBeenRead]:text-teal-300
                            `}
                        >
                            <div className='flex items-center justify-between font-bold'>
                                <div className='flex items-center text-base'>
                                    <InfoCircledIcon className='mr-1'/>
                                    An order request has been submitted.
                                </div>
                                <div className='text-xs'>161020230001</div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <div className='mt-1'>Patient: <span className='font-bold'>Muhammad Novani Fajar</span></div>
                                    <div>Referring Physician: <span className='font-bold'>Muhammad Novani Fajar</span></div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-1'>
                                <div><span className='font-bold'>Test 1</span>, <span className='font-bold'>Test 2</span>, and <span className='font-bold'>Test 3</span>.</div>
                                <div className='font-bold'>about 4 minutes ago</div>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`
                                rounded-sm flex flex-col text-sm px-2 py-1.5 relative select-none outline-none duration-150
                                text-teal-50
                                hover:bg-teal-500
                                data-[highlighted]:bg-teal-500
                                data-[disabled]:text-teal-400 data-[disabled]:pointer-events-none 
                                data-[hasBeenRead]:text-teal-300
                            `}
                        >
                            <div className='flex items-center justify-between font-bold'>
                                <div className='flex items-center text-base'>
                                    <InfoCircledIcon className='mr-1'/>
                                    An order request has been submitted.
                                </div>
                                <div className='text-xs'>161020230001</div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <div className='mt-1'>Patient: <span className='font-bold'>Muhammad Novani Fajar</span></div>
                                    <div>Referring Physician: <span className='font-bold'>Muhammad Novani Fajar</span></div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-1'>
                                <div><span className='font-bold'>Test 1</span>, <span className='font-bold'>Test 2</span>, and <span className='font-bold'>Test 3</span>.</div>
                                <div className='font-bold'>about 4 minutes ago</div>
                            </div>
                        </DropdownMenuItem>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        minWidth='350px'
                        type='dropdown'
                        dropdownTrigger={{ title: <>Analyst</> }}
                    >
                        <DropdownMenuLabel
                            className={`
                                flex px-2 items-center py-1 mb-1 text-teal-50 text-base justify-between
                            `}
                        >
                            <div className='font-bold mr-1'>Fajar Mukhlis Imananda</div>
                            <div>(Analyst)</div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="h-[1px] bg-teal-300 my-1.5" />
                        <DropdownMenuItem
                            asChild
                        >
                            
                            <NavLink 
                                method='post'
                                as='button'
                                href={route('logout')}
                                className={`
                                    flex py-1.5 px-2 outline-none rounded-sm duration-100 select-none font-bold text-center w-full
                                    bg-teal-800 text-teal-50
                                    hover:bg-teal-500
                                    data-[highlighted]:bg-teal-500
                                `}
                            >Log Out</NavLink>
                        </DropdownMenuItem>
                    </NavLink>
                </NavItem>
            </NavMenu>


            {/* <NavBar/> */}
            {children}
        </div>
        // <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        //     <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        //             <div className="flex justify-between h-16">
        //                 <div className="flex">
        //                     <div className="shrink-0 flex items-center">
        //                         <Link href="/">
        //                             <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
        //                         </Link>
        //                     </div>

        //                     <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
        //                         <NavLink href={route('dashboard')} active={route().current('dashboard')}>
        //                             Dashboard
        //                         </NavLink>
        //                     </div>
        //                 </div>

        //                 <div className="hidden sm:flex sm:items-center sm:ml-6">
        //                     <div className="ml-3 relative">
        //                         <Dropdown>
        //                             <Dropdown.Trigger>
        //                                 <span className="inline-flex rounded-md">
        //                                     <button
        //                                         type="button"
        //                                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
        //                                     >
        //                                         {user.name}

        //                                         <svg
        //                                             className="ml-2 -mr-0.5 h-4 w-4"
        //                                             xmlns="http://www.w3.org/2000/svg"
        //                                             viewBox="0 0 20 20"
        //                                             fill="currentColor"
        //                                         >
        //                                             <path
        //                                                 fillRule="evenodd"
        //                                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        //                                                 clipRule="evenodd"
        //                                             />
        //                                         </svg>
        //                                     </button>
        //                                 </span>
        //                             </Dropdown.Trigger>

        //                             <Dropdown.Content>
        //                                 <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
        //                                 <Dropdown.Link href={route('logout')} method="post" as="button">
        //                                     Log Out
        //                                 </Dropdown.Link>
        //                             </Dropdown.Content>
        //                         </Dropdown>
        //                     </div>
        //                 </div>

        //                 <div className="-mr-2 flex items-center sm:hidden">
        //                     <button
        //                         onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
        //                         className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
        //                     >
        //                         <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        //                             <path
        //                                 className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M4 6h16M4 12h16M4 18h16"
        //                             />
        //                             <path
        //                                 className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M6 18L18 6M6 6l12 12"
        //                             />
        //                         </svg>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
        //             <div className="pt-2 pb-3 space-y-1">
        //                 <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
        //                     Dashboard
        //                 </ResponsiveNavLink>
        //             </div>

        //             <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
        //                 <div className="px-4">
        //                     <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
        //                     <div className="font-medium text-sm text-gray-500">{user.email}</div>
        //                 </div>

        //                 <div className="mt-3 space-y-1">
        //                     <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
        //                     <ResponsiveNavLink method="post" href={route('logout')} as="button">
        //                         Log Out
        //                     </ResponsiveNavLink>
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>

        //     {header && (
        //         <header className="bg-white dark:bg-gray-800 shadow">
        //             <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        //         </header>
        //     )}

        //     <main>{children}</main>
        // </div>
    );
}
