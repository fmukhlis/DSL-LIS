import {
    useState,
    forwardRef,
    useImperativeHandle,
    ComponentPropsWithRef,
} from "react"
import * as PrimitivesToast from '@radix-ui/react-toast'
import { Cross2Icon } from "@radix-ui/react-icons"

export const Toast = forwardRef<{ publish: () => void }, PrimitivesToast.ToastProps & { icon?: JSX.Element }>(
    ({ title, icon, children, ...props }, forwardedRef) => {
        const [count, setCount] = useState(0)

        useImperativeHandle(forwardedRef, () => ({
            publish: () => {
                setCount(c => c + 1)
            },
        }))

        return (
            <>
                {Array.from({ length: count }).map((_, index) => (
                    <PrimitivesToast.Root
                        defaultOpen
                        {...props}
                        key={index}
                        className="relative bg-teal-50 flex flex-col border-t-[3px] border-teal-700 text-teal-700 shadow-xl rounded p-3"
                    >
                        <PrimitivesToast.Title className="font-bold flex items-center gap-2 mb-2">{icon}{title}</PrimitivesToast.Title>

                        <PrimitivesToast.Description>{children}</PrimitivesToast.Description>
                        <PrimitivesToast.Close className="absolute top-2 right-2 opacity-60 hover:opacity-100 duration-150"><Cross2Icon width={17} height={17} /></PrimitivesToast.Close>
                    </PrimitivesToast.Root>
                ))}
            </>
        )
    }
)

export const ToastTitle = PrimitivesToast.Title
export const ToastProvider = PrimitivesToast.Provider
export const ToastViewport = PrimitivesToast.Viewport