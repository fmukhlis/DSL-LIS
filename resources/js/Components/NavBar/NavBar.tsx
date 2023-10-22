import { useState } from 'react'

// Radix UI
import * as PrimitivesNavigationMenu from '@radix-ui/react-navigation-menu'
import * as PrimitivesMenuBar from '@radix-ui/react-menubar'
import { 
    BellIcon,
    CheckCircledIcon,
    DiscordLogoIcon,
    GitHubLogoIcon,
    InfoCircledIcon,
} from '@radix-ui/react-icons'

// Internal Component
import ApplicationLogo from '../ApplicationLogo'
import NavBarLink from './NavBarLink'
import {
    MBItem,
    MBLink,
} from './NavMenuBarComp'
import NavMenuBar from './NavMenuBar'


const NavBar = (props) => {
    const [openedMenuBar, setOpenedMenuBar] = useState('')

    return (
        <PrimitivesNavigationMenu.Root
            orientation='horizontal'
            className='bg-teal-500 text-teal-50 font-semibold shadow-md p-2 z-10 relative'
        >
            <PrimitivesNavigationMenu.List className='flex w-full max-w-6xl mx-auto items-center h-9'>
                <PrimitivesNavigationMenu.Item className='mr-5'>
                    <PrimitivesNavigationMenu.Link href='#'>
                        <ApplicationLogo className="w-9 fill-current text-teal-200" />
                    </PrimitivesNavigationMenu.Link>
                </PrimitivesNavigationMenu.Item>

                <PrimitivesNavigationMenu.Item className="mr-auto" >
                    <PrimitivesNavigationMenu.Link asChild>
                        <PrimitivesMenuBar.Root 
                            onValueChange={(e) => setOpenedMenuBar(e)}
                            value={openedMenuBar}
                            asChild
                        >
                            <NavMenuBar
                                menuID={1}
                                openedMenuBar={openedMenuBar}
                                menuName={"Settings"}
                                contentMinWidth={"250px"}
                                withIcon={true}
                            >
                                <MBItem>
                                    Item A <GitHubLogoIcon className='ml-auto' />
                                </MBItem>
                                <MBItem>
                                    Item B <GitHubLogoIcon className='ml-auto' />
                                </MBItem>
                                <PrimitivesMenuBar.Separator className='h-0.5 bg-teal-200 my-1.5'/>
                                <MBItem>
                                    Item C <GitHubLogoIcon className='ml-auto' />
                                </MBItem>
                            </NavMenuBar>
                        </PrimitivesMenuBar.Root>
                    </PrimitivesNavigationMenu.Link>
                </PrimitivesNavigationMenu.Item>

                <PrimitivesNavigationMenu.Item className='mr-2'>
                    <PrimitivesNavigationMenu.Link asChild>
                        <NavBarLink href={route('order')}>
                            <DiscordLogoIcon width={18} height={18} />
                        </NavBarLink>
                    </PrimitivesNavigationMenu.Link>
                </PrimitivesNavigationMenu.Item>
                <PrimitivesNavigationMenu.Item className='mr-2'>
                    <PrimitivesNavigationMenu.Link asChild>
                        <NavBarLink href={route('dashboard')}>
                            <DiscordLogoIcon width={18} height={18} />
                        </NavBarLink>
                    </PrimitivesNavigationMenu.Link>
                </PrimitivesNavigationMenu.Item><PrimitivesNavigationMenu.Item className='mr-2'>
                    <PrimitivesNavigationMenu.Link asChild>
                        <NavBarLink href={route('dashboard')}>
                            <DiscordLogoIcon width={18} height={18} />
                        </NavBarLink>
                    </PrimitivesNavigationMenu.Link>
                </PrimitivesNavigationMenu.Item><PrimitivesNavigationMenu.Item className='mr-2'>
                    <PrimitivesNavigationMenu.Link asChild>
                        <NavBarLink href={route('dashboard')}>
                            <DiscordLogoIcon width={18} height={18} />
                        </NavBarLink>
                    </PrimitivesNavigationMenu.Link>
                </PrimitivesNavigationMenu.Item>

                <PrimitivesNavigationMenu.Item className='ml-auto mr-2'>
                    <PrimitivesNavigationMenu.Link asChild>
                        <PrimitivesMenuBar.Root 
                            onValueChange={(e) => setOpenedMenuBar(e)}
                            value={openedMenuBar}
                            asChild
                        >
                            <NavMenuBar
                                menuID={2}
                                openedMenuBar={openedMenuBar}
                                menuName={<BellIcon width={24} height={24} />}
                                contentMinWidth={"500px"}
                            >
                                <PrimitivesMenuBar.Label
                                    className={"flex px-2 items-center py-1 mb-1 text-teal-50 font-bold text-lg justify-between"} 
                                    disabled
                                >
                                    <div>Today's Notification</div>
                                    <div className='text-sm bg-teal-500 rounded-xl px-3 py-1'>17 Oct 2023</div>
                                </PrimitivesMenuBar.Label>
                                <PrimitivesMenuBar.Separator className='h-0.5 bg-teal-200 my-1.5'/>

                                <MBLink>
                                    <div className='flex items-center justify-between font-bold'>
                                        <div className='flex items-center'>
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
                                </MBLink>
                                <MBLink className={'text-teal-200'}>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center'><CheckCircledIcon className='mr-1'/> An order request has been submitted.</div>
                                        <div>161020230001</div>
                                    </div>
                                    <div className='mt-1'>Patient: <span className=''>Muhammad Novani Fajar</span></div>
                                    <div>Referring Physician: <span className=''>Muhammad Novani Fajar</span></div>
                                    <div className='flex justify-between mt-1'>
                                        <div><span className=''>Test 1</span>, <span className=''>Test 2</span>, and <span className=''>Test 3</span>.</div>
                                        <div>about 4 minutes ago</div>
                                    </div>
                                </MBLink>
                            </NavMenuBar>
                        </PrimitivesMenuBar.Root>
                    </PrimitivesNavigationMenu.Link>
                </PrimitivesNavigationMenu.Item>

                <PrimitivesNavigationMenu.Item>
                    <PrimitivesNavigationMenu.Link asChild>
                    <PrimitivesMenuBar.Root 
                            onValueChange={(e) => setOpenedMenuBar(e)}
                            value={openedMenuBar}
                            withIcon={true}
                            asChild
                        >
                            <NavMenuBar
                                menuID={3}
                                openedMenuBar={openedMenuBar}
                                menuName={'Analyst'}
                            >
                                <PrimitivesMenuBar.Label
                                    className={"flex px-2 items-center py-1 mb-1 text-teal-50 text-base justify-between "} 
                                    disabled
                                >
                                    <div className='font-bold mr-1'>Fajar Mukhlis Imananda</div>
                                    <div>(Analyst)</div>
                                </PrimitivesMenuBar.Label>
                                <PrimitivesMenuBar.Separator className='h-0.5 bg-teal-200 my-1.5' />
                                <MBLink className="bg-teal-600 font-bold text-center">
                                    Log Out
                                </MBLink>
                            </NavMenuBar>
                        </PrimitivesMenuBar.Root>
                    </PrimitivesNavigationMenu.Link>
                </PrimitivesNavigationMenu.Item>
            </PrimitivesNavigationMenu.List>
        </PrimitivesNavigationMenu.Root>
    )
}

export default NavBar

{/* 
<Link href="/">
<ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
</Link>

<NavLink href={route('dashboard')} active={route().current('dashboard')}>
Dashboard
</NavLink>
{user.name}
<Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
<Dropdown.Link href={route('logout')} method="post" as="button">
Log Out
</Dropdown.Link>
<ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
Dashboard
</ResponsiveNavLink>
<div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
<ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
<ResponsiveNavLink method="post" href={route('logout')} as="button">
Log Out
</ResponsiveNavLink> */
}