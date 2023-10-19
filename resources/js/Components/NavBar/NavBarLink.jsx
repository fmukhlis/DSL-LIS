// Radix UI
import { Link } from '@radix-ui/react-navigation-menu'
import { DiscordLogoIcon } from "@radix-ui/react-icons"

// React Spring
import { 
    useSpring,
    animated,
} from "@react-spring/web"

const NavBarLink = ({href, className, children, ...props}) => {
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
    
    const AnimatedNavBarLink = animated(Link)

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
        <AnimatedNavBarLink
            style={springVal}
            href={href}
            onMouseEnter={animateFocus}
            onMouseLeave={animateBlur}
            onFocus={animateFocus}
            onBlur={animateBlur}
            onClick={animateActive}
            className={`px-4 py-2 rounded flex shadow outline-none border-b-2 ${className}`}
        >
            <DiscordLogoIcon width={18} height={18} />
        </AnimatedNavBarLink>
    )
}

export default NavBarLink