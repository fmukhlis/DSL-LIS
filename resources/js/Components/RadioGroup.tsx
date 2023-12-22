import { ComponentPropsWithRef, forwardRef } from 'react'

// Radix UI
import * as PrimitivesRadioGroup from '@radix-ui/react-radio-group'

export const RadioGroup = forwardRef<HTMLDivElement, PrimitivesRadioGroup.RadioGroupProps>(
    ({ className, ...props }, forwardedRef) => {
        return (
            <PrimitivesRadioGroup.Root {...props} ref={forwardedRef} className={'flex ' + className} />
        )
    }
)

export const RadioItem = forwardRef<HTMLButtonElement, PrimitivesRadioGroup.RadioGroupItemProps>(
    ({ className, ...props }, forwardedRef) => {
        return (
            <PrimitivesRadioGroup.Item
                {...props}
                ref={forwardedRef}
                className={'bg-gray-50 shadow-md rounded-full outline-none cursor-default hover:bg-gray-200 focus:ring-2 ring-teal-600 ' + className}
            />
        )
    }
)

export const RadioIndicator = forwardRef<HTMLSpanElement, PrimitivesRadioGroup.RadioGroupIndicatorProps>(
    ({ className, ...props }, forwardedRef) => {
        return (
            <PrimitivesRadioGroup.Indicator
                {...props}
                ref={forwardedRef}
                className={'relative flex items-center justify-center h-full w-full after:content-[""] after:block after:rounded-[50%] after:bg-teal-600 ' + className}
            />
        )
    }
)