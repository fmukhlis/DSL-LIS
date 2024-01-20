import {
    useRef,
    useEffect,
    forwardRef,
} from "react"

// Internal
import { InputProps } from "@/Types"

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ isFocused = false, className, ...props }, forwardedRef) => {
        const input = forwardedRef ? forwardedRef : useRef<HTMLInputElement>(null)

        useEffect(() => {
            if (isFocused) {
                (input as React.MutableRefObject<HTMLInputElement>).current.focus()
            }
        }, []);

        return (
            <input
                {...props}
                ref={input}
                className={`
                border-gray-300 rounded-sm shadow-sm text-sm form-input
                focus:text-black focus:border-teal-600 focus:ring-teal-500 focus:ring-2 focus:ring-offset-2
                disabled:bg-gray-100 disabled:text-gray-400
                ${className}
            `}
            />
        )
    }
)

export default Input