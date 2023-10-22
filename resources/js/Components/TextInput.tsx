import { forwardRef, useRef, useEffect } from "react"


const TextInput = ({type = 'text', className = '', isFocused = false, ...props}, ref) => {
    const input = ref ? ref : useRef()
    const defaultClass = 'border-gray-300 rounded-sm shadow-sm '

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input 
            {...props}
            type={type}
            className={
                defaultClass + className + ' focus:text-black focus:border-teal-600 focus:ring-teal-500 focus:ring-2 focus:ring-offset-2'
            } 
            ref={input}
        />
    )
}

export default forwardRef(TextInput)