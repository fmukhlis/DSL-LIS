import { ComponentPropsWithRef, forwardRef } from 'react';

// Radix UI
import * as PrimitivesPopover from '@radix-ui/react-popover';

export const Popover = PrimitivesPopover.Root;
export const PopoverTrigger = PrimitivesPopover.Trigger;

export const PopoverContent = forwardRef<HTMLDivElement, PrimitivesPopover.PopoverContentProps>(
    ({ children, ...props }, forwardedRef) => (
        <PrimitivesPopover.Portal>
            <PrimitivesPopover.Content sideOffset={3} align='end' {...props} ref={forwardedRef}>
                {children}
                <PrimitivesPopover.Arrow className='fill-teal-100' />
            </PrimitivesPopover.Content>
        </PrimitivesPopover.Portal>
    )
);
