import { forwardRef } from 'react'

// Internal
import SecondaryButton from './PrimaryOutlineButton'

// Radix UI
import * as PrimitivesDialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import PrimaryButton from './PrimaryButton'

export const Dialog = PrimitivesDialog.Root
export const DialogTitle = PrimitivesDialog.Title
export const DialogClose = PrimitivesDialog.Close
export const DialogTrigger = PrimitivesDialog.Trigger
export const DialogDescription = PrimitivesDialog.Description

export const DialogContent = forwardRef<HTMLDivElement, PrimitivesDialog.DialogContentProps>(
    ({ className, children, ...props }, forwardedRef) => (
        <PrimitivesDialog.Portal>
            <PrimitivesDialog.Overlay className='z-50 bg-black/40 fixed inset-0 grid place-items-center'>
                <PrimitivesDialog.Content
                    {...props}
                    ref={forwardedRef}
                    className={'z-50 max-h-[90vh] relative w-[90vw] max-w-[500px] rounded bg-teal-50 shadow outline-none ' + className}
                >
                    {children}
                </PrimitivesDialog.Content>
            </PrimitivesDialog.Overlay>
        </PrimitivesDialog.Portal>
    )
);

