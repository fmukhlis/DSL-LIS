import { forwardRef } from 'react'

// React Spring
import { 
    useTransition,
    animated,
} from "@react-spring/web";

// Radix UI
import { TriangleDownIcon } from '@radix-ui/react-icons'
import * as PrimitivesMenuBar from '@radix-ui/react-menubar'

// Internal Component
import { MBTrigger } from './NavMenuBarComp'

// Default Component
const NavMenuBar = forwardRef(({
    menuID = "default", 
    openedMenuBar = "", 
    menuName, 
    contentMinWidth = "",
    withIcon, 
    className, 
    children, 
    ...props
}, forwardedRef) => {
    
    const transitions = useTransition(openedMenuBar, {
        from: {
            opacity: 0,
            transform: `scale(0.95) translateY(-10px)`
        },
        enter: {
            opacity: 1,
            transform: `scale(1.0) translateY(0)`
        },
        config: {
            tension: 500,
            friction: 20
        }
    })

    return (
        <PrimitivesMenuBar.Menu value={menuID}>
            <PrimitivesMenuBar.Trigger asChild>
                <MBTrigger
                    {...props} 
                    ref={forwardedRef}
                    className={`${!withIcon ? " pr-2 " : ""}` + className}
                >
                    {menuName} {withIcon && <TriangleDownIcon className='ml-0.5' />}
                </MBTrigger>
            </PrimitivesMenuBar.Trigger>
            {transitions((style, item) => (
                <>
                    {item === menuID ?
                        <PrimitivesMenuBar.Portal forceMount asChild>
                            <PrimitivesMenuBar.Content 
                                sideOffset={1}
                                forceMount asChild
                            >
                                <animated.div    
                                    style={style}
                                    className={
                                        'text-sm z-10 p-1.5 text-teal-50 bg-teal-400 rounded shadow border-2 border-teal-300 ' + 
                                        `min-w-[${contentMinWidth}] `
                                    }
                                >
                                    {children}
                                    <PrimitivesMenuBar.Arrow width={9} height={9} className='fill-teal-300'/>
                                </animated.div>
                            </PrimitivesMenuBar.Content>
                        </PrimitivesMenuBar.Portal>
                    : null}
                </>
            ))}
        </PrimitivesMenuBar.Menu>
    )
})

export default NavMenuBar