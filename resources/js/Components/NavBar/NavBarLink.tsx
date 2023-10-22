import { forwardRef } from 'react'

// Inertia
import { Link as InertiaLink } from '@inertiajs/react'

// Radix UI
import { DiscordLogoIcon } from "@radix-ui/react-icons"

// React Spring
import { 
    useSpring,
    animated,
} from "@react-spring/web"

const NavBarLink = forwardRef(({href, className, children, ...props}, forwardedRef) => {
    const [springVal, api] = useSpring(() => ({
        from: {
          transform: `scale(0.5)`,
        },
        transform: `scale(1.0)`,
        backgroundColor: `rgb(45 212 191)`,
        borderColor: `rgb(153 246 228)`,

        config: {
            tension: 350
        }
    }))
    
    const NavBarLink = animated(InertiaLink)

    const animateFocus = () => {
        api.start({
            transform: `scale(1.1)`,
            backgroundColor: `rgb(94 234 212)`,
        })
    }

    const animateBlur = () => {
        api.start({
            transform: `scale(1.0)`,
            backgroundColor: `rgb(45 212 191)`,
        })
    }

    const animateActive = () => {
        api.start({
            transform: `scale(1.0)`,
            backgroundColor: `rgb(13 148 136)`,
        })
    }

    return (
        <NavBarLink
            { ...props }
            ref={forwardedRef}
            style={springVal}
            href={href}
            onMouseEnter={animateFocus}
            onMouseLeave={animateBlur}
            onFocus={animateFocus}
            onBlur={animateBlur}
            onClick={animateActive}
            className={`px-4 py-2 rounded flex shadow outline-none border-b-2 ${className}`}
        >
            {children}
        </NavBarLink>
    )
})

export default NavBarLink