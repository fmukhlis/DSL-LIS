import { ComponentPropsWithoutRef } from "react"

// Inertia
import { Link } from "@inertiajs/react"

// Internal
import { AnchorProps } from "@/Types"

export default function PrimaryOutlineAnchor({
    children,
    className,
    ...props
}: AnchorProps) {
    return (
        <Link
            {...props}
            className={`inline-flex items-center justify-center
                bg-teal-50 border-teal-500 text-teal-500
                hover:bg-teal-400 focus:bg-teal-400 active:bg-teal-600 focus:text-white hover:text-white
                focus:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25
                border-2 rounded-sm transition ease-in-out duration-150
                font-semibold uppercase tracking-widest text-xs
                ${className}`
            }
        >
            {children}
        </Link>
    )
}