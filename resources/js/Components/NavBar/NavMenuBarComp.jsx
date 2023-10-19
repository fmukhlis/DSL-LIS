import { forwardRef } from 'react'

// Radix UI
import * as PrimitivesMenuBar from '@radix-ui/react-menubar'

export const MBTrigger = forwardRef((props, forwardedRef) => {
    const className = {
        default: 'flex items-center py-1 pl-2 pr-1 rounded outline-none duration-150 ',
        onHover: 'hover:bg-teal-400 ',
        onOpen: 'data-[state=open]:bg-teal-400 ',
        onHighlighted: 'data-[highlighted]:bg-teal-400 ',
    }

    return (
        <button
            { ...props }
            ref={forwardedRef}
            className={ 
                className.default +
                className.onOpen +
                className.onHover +
                className.onHighlighted +
                props.className
            }
        >
            {props.children}
        </button>
    )
})



export const MBItem = (props) => {
    const className = {
        default: 'flex py-1 px-2 outline-none duration-100 select-none items-center w-full ',
        onDisabled: 'data-[disabled]:text-teal-300 data-[disabled]:pointer-events-none ',
        onHover: 'hover:bg-teal-300 hover:text-teal-600 hover:pl-3 ',
        onHighlighted: 'data-[highlighted]:bg-teal-300 data-[highlighted]:text-teal-600 data-[highlighted]:pl-3 ',
    }

    return (
        <PrimitivesMenuBar.Item
            { ...props }
            className={ 
                className.default +
                className.onDisabled +
                className.onHover +
                className.onHighlighted +
                props.className
            }
        >
            { props.children }
        </PrimitivesMenuBar.Item>
    )
}

export const MBLink = (props) => {
    const className = {
        default: 'flex flex-col py-1.5 px-2 outline-none rounded-sm duration-100 select-none w-full ',
        onDisabled: 'data-[disabled]:text-teal-300 data-[disabled]:pointer-events-none ',
        onHover: 'hover:bg-teal-300 hover:text-teal-600 ',
        onHighlighted: 'data-[highlighted]:bg-teal-300 data-[highlighted]:text-teal-600 ',
    }

    return (
        <PrimitivesMenuBar.Item asChild>
            <a
                { ...props }
                href="#"
                className={
                    className.default +
                    className.onDisabled +
                    className.onHover +
                    className.onHighlighted +
                    props.className
                }
            >
                { props.children }
            </a>
        </PrimitivesMenuBar.Item>
    )
}