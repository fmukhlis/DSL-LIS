import { forwardRef } from 'react'

// Internal
import SecondaryButton from './SecondaryButton'

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
    ({ children, ...props }, forwardedRef) => (
        <PrimitivesDialog.Portal>
            <PrimitivesDialog.Overlay className='z-50 bg-black/40 fixed inset-0 overflow-y-auto grid place-items-center'>
                <PrimitivesDialog.Content
                    {...props}
                    ref={forwardedRef}
                    className='z-50 relative max-h-[90vh] w-[90vw] max-w-[500px] rounded bg-teal-50 p-6 shadow outline-none overflow-x-auto'
                >
                    {children}
                </PrimitivesDialog.Content>
            </PrimitivesDialog.Overlay>
        </PrimitivesDialog.Portal>
    )
);

