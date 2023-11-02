import { forwardRef }
    from 'react'

// Internal
import useBoop from '@/CustomHooks/useBoop'

// React Spring
import { animated } from "@react-spring/web"

// Radix UI
import * as PrimitivesNavigationMenu from '@radix-ui/react-navigation-menu'

export const NavigationMenuLink = PrimitivesNavigationMenu.Link
export const NavigationMenuItem = PrimitivesNavigationMenu.Item
export const NavigationMenuTrigger = PrimitivesNavigationMenu.Trigger
export const NavigationMenuContent = PrimitivesNavigationMenu.Content

export const NavigationMenu = forwardRef<HTMLDivElement, PrimitivesNavigationMenu.NavigationMenuProps>(
    (props, forwardedRef) => (
        <PrimitivesNavigationMenu.Root
            {...props}
            ref={forwardedRef}
            orientation='horizontal'
            className={`bg-teal-500 text-teal-50 font-semibold shadow-md p-2 z-10 relative ${props.className}`}
        >
            {props.children}
        </PrimitivesNavigationMenu.Root>
    )
)

export const NavigationMenuList = forwardRef<HTMLUListElement, PrimitivesNavigationMenu.NavigationMenuListProps>(
    (props, forwardedRef) => (
        <PrimitivesNavigationMenu.List
            {...props}
            ref={forwardedRef}
            className={`flex w-full max-w-6xl mx-auto items-center h-9 gap-2 ${props.className}`}
        >
            {props.children}
        </PrimitivesNavigationMenu.List>
    )
)