import {
    forwardRef,
    ComponentPropsWithRef,
} from "react";

export default forwardRef<HTMLButtonElement, ComponentPropsWithRef<'button'>>(
    ({ children, className = '', ...props }, forwardedRef) => {
        return (
            <button
                {...props}
                ref={forwardedRef}
                className={`inline-flex items-center justify-center
                bg-gray-300 border-gray-300 text-gray-600
                hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-400
                focus:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25
                border-2 transition ease-in-out duration-150
                font-semibold uppercase tracking-widest text-xs
                ${className}`
                }
            >
                {children}
            </button>
        )
    }
)