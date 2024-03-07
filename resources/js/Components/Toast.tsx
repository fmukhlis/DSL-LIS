import {
    useState,
    forwardRef,
    useImperativeHandle,
} from "react"

// Radix UI
import * as PrimitivesToast from '@radix-ui/react-toast'

// Internal
import { ToastProps } from "@/Types"

export const Toast = forwardRef<{ publish: () => void }, ToastProps>(
    ({ title, icon, children, ...props }, forwardedRef) => {

        // const [count, setCount] = useState(1)
        // useImperativeHandle(forwardedRef, () => ({
        //     publish: () => {
        //         setCount(c => c + 1)
        //     },
        // }))


        return (
            <>
                {/* Array.from({ length: count }).map((_, index) => ( */}
                <PrimitivesToast.Root
                    {...props}
                    className="relative bg-teal-50 flex flex-col shadow-[0_0_1px_0_,_0_3px_4px] text-teal-700 shadow-gray-400 rounded 
                    focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 outline-none
                    data-[state=open]:animate-slideIn data-[state=closed]:animate-hide 
                    data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] 
                    data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] 
                    data-[swipe=end]:animate-swipeOut
                    "
                >
                    <div className="p-3">
                        <PrimitivesToast.Title className="font-bold flex items-center gap-2 mb-2">{icon}{title}</PrimitivesToast.Title>
                        <PrimitivesToast.Description>{children}</PrimitivesToast.Description>
                    </div>
                </PrimitivesToast.Root>
                {/* )) */}
            </>
        )
    }
)

export const ToastTitle = PrimitivesToast.Title
export const ToastProvider = PrimitivesToast.Provider
export const ToastViewport = PrimitivesToast.Viewport