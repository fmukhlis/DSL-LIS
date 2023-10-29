import { 
    useRef, 
    useEffect, 
    forwardRef, 
    ComponentPropsWithRef,
} from "react"

export interface InputProps extends ComponentPropsWithRef<'input'> {
    isFocused? : boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({isFocused = false, ...props}, forwardedRef) => {
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
                border-gray-300 rounded-sm shadow-sm text-sm
                focus:text-black focus:border-teal-600 focus:ring-teal-500 focus:ring-2 focus:ring-offset-2
                ${props.className}
            `} 
        />
    )
})

export default Input