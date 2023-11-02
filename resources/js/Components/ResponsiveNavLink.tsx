import { forwardRef } from 'react';

// Inertia JS
import { InertiaLinkProps, Link } from '@inertiajs/react';

export interface ResponsiveNavLinkProps extends InertiaLinkProps {
    active?: boolean    
}

const ResponsiveNavLink = forwardRef<typeof Link, ResponsiveNavLinkProps>(({ active = false, className, children, ...props }, forwardedRef) => {
    return (
        <Link
            {...props}
            ref={forwardedRef}
            className={`
                px-4 py-2 rounded flex shadow outline-none border-teal-200 duration-150
                hover:bg-teal-300 hover:scale-105
                focus:bg-teal-300 focus:scale-105
                ${active 
                    ? 'bg-teal-600 scale-100 border-b-0 pointer-events-none' 
                    : 'bg-teal-400 border-b-2 scale-100'}
            `}
        >
            {children}
        </Link>
    );
})

export default ResponsiveNavLink
