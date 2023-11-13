import {
    useRef,
    useEffect,
    forwardRef,
    ComponentPropsWithRef,
} from 'react'

const Textarea = forwardRef<HTMLTextAreaElement, ComponentPropsWithRef<'textarea'> & { isFocused?: boolean }>(
    ({ isFocused = false, className, ...props }, forwardedRef) => {
        const input = forwardedRef ? forwardedRef : useRef<HTMLTextAreaElement>(null)

        useEffect(() => {
            if (isFocused) {
                (input as React.MutableRefObject<HTMLTextAreaElement>).current.focus()
            }
        }, []);

        return (
            <textarea
                {...props}
                ref={forwardedRef}
                className={`
                    border-gray-300 rounded-sm shadow-sm text-sm form-textarea
                    focus:text-black focus:border-teal-600 focus:ring-teal-500 focus:ring-2 focus:ring-offset-2
                    ${className}
                `}
            ></textarea>
        )
    }
)

export default Textarea