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
                bg-red-600 border-red-500 text-white
                hover:bg-red-500 focus:bg-red-500 active:bg-red-700
                focus:ring-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25
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