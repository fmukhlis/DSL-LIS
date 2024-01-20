import { forwardRef } from "react"

// Inertia
import { InertiaLinkProps, Link } from "@inertiajs/react"

export default forwardRef<HTMLAnchorElement, InertiaLinkProps>(
    ({ children, className = '', ...props }, forwardedRef) => {
        return (
            <Link
                {...props}
                ref={forwardedRef}
                className={`inline-flex items-center justify-center
                bg-teal-500 border-teal-500 text-white
                hover:bg-teal-400 focus:bg-teal-400 active:bg-teal-600
                focus:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25
                border-2 transition ease-in-out duration-150
                font-semibold uppercase tracking-widest text-xs
                ${className}`
                }
            >
                {children}
            </Link>
        )
    }
)