import { forwardRef } from "react"

// Inertia
import { InertiaLinkProps, Link } from "@inertiajs/react"

export default forwardRef<HTMLAnchorElement, InertiaLinkProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <Link
                {...props}
                ref={forwardedRef}
                className={`inline-flex items-center justify-center
                bg-teal-50 border-teal-500 text-teal-500
                data-[disabled=true]:pointer-events-none data-[disabled:true]:select-none data-[disabled=true]:opacity-50
                hover:bg-teal-400 focus:bg-teal-400 active:bg-teal-600 focus:text-white hover:text-white
                focus:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2
                border-2 transition ease-in-out duration-150
                font-semibold uppercase tracking-widest text-xs
                ${className}`
                }
            >
                {children}
            </Link >
        )
    })