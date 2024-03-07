import { forwardRef } from 'react'

// Internal
import { DialogContentProps } from '@/Types'

// Radix UI
import * as PrimitivesDialog from '@radix-ui/react-dialog'

// React Spring
import { animated, useTransition } from '@react-spring/web'

export const Dialog = PrimitivesDialog.Root
export const DialogTitle = PrimitivesDialog.Title
export const DialogClose = PrimitivesDialog.Close
export const DialogTrigger = PrimitivesDialog.Trigger
export const DialogDescription = PrimitivesDialog.Description

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
    ({ className, children, style, ...props }, forwardedRef) => {

        const AnimatedDialogOverlay = animated(PrimitivesDialog.Overlay)
        const AnimatedDialogContent = animated(PrimitivesDialog.Content)

        return (
            <PrimitivesDialog.Portal forceMount>
                <AnimatedDialogOverlay
                    {...props}
                    style={{ opacity: style.opacity }}
                    className='z-50 bg-black/40 fixed inset-0 grid place-items-center'
                >
                    <AnimatedDialogContent
                        {...props}
                        style={style}
                        forceMount
                        ref={forwardedRef}
                        className={'relative max-h-[85vh] max-w-[80vw] rounded bg-teal-50 shadow outline-none ' + className}
                    >
                        {children}
                    </AnimatedDialogContent>
                </AnimatedDialogOverlay>
            </PrimitivesDialog.Portal>
        )
    }
);

export const dialogTransition = (isOpen: boolean) => {
    return useTransition([isOpen], () => ({
        from: {
            transform: 'scale(0.75) translate3D(0rem,0rem,0)',
            opacity: 0,
        },
        enter: {
            transform: 'scale(1) translate3D(0rem,0rem,0)',
            opacity: 1,
        },
        leave: {
            transform: 'scale(1) translate3D(0rem,5rem,0)',
            opacity: 0,
        },
        config: (item, key, phase) => {
            return (item && phase === 'enter' ? ({
                tension: 500,
                friction: 26,
                clamp: false,
            }) : ({
                tension: 200,
                friction: 19,
                clamp: true,
            }))
        }
    }))

}