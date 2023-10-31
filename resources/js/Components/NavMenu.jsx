import
    { forwardRef } 
from 'react'

// Internal
import useBoop from '@/CustomHooks/useBoop'

// Inertia JS
import { Link } from '@inertiajs/react'

// React Spring
import { animated } from "@react-spring/web"

// Radix UI
import * as PrimitivesNavigationMenu from '@radix-ui/react-navigation-menu'
import { NavDropdown } from './DropdownMenu'

export const NavMenu = (props) => {
    return (
        <PrimitivesNavigationMenu.Root 
            {...props}
            className="bg-teal-500 text-teal-50 font-semibold shadow-md p-2 z-10 relative"
        >
            <PrimitivesNavigationMenu.List
                className='flex w-full max-w-6xl mx-auto items-center h-9 gap-2'
            >
                {props.children}
            </PrimitivesNavigationMenu.List>
        </PrimitivesNavigationMenu.Root>
    )
}

export const NavItem = forwardRef(
    ({type = 'single', children, ...props}, forwardedRef) => {
        return (
            <PrimitivesNavigationMenu.Item {...props}>
                {type === 'multiple' 
                    ? (
                        <>
                            <PrimitivesNavigationMenu.Trigger>
                                Trigger
                            </PrimitivesNavigationMenu.Trigger>
                            <PrimitivesNavigationMenu.Content>
                                {children}
                            </PrimitivesNavigationMenu.Content>
                        </>
                    )
                    : (children)
                } 
                
            </PrimitivesNavigationMenu.Item>
        )
    }
)

export const NavLink = forwardRef(
    ({type = 'link', dropdownTrigger, useAnimation = false, children, className, ...props}, forwardedRef) => {
    
        const [springVal, startAnimation] = useBoop(useAnimation)

        return (
            <PrimitivesNavigationMenu.Link
                asChild
                {...props}
            >
                {type === 'link' 
                ? (
                    <Link 
                        className={`flex items-center justify-center ${className}`}
                        onMouseEnter={startAnimation}
                    >
                        <animated.div 
                            style={springVal}
                        >
                            {children}
                        </animated.div>
                    </Link>
                )
                : type === 'dropdown' 
                    ? ( 
                        <NavDropdown trigger={dropdownTrigger}>{children}</NavDropdown>
                    )
                    : null
                }
            </PrimitivesNavigationMenu.Link>
        )
    }
)