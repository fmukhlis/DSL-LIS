import React, { forwardRef } from "react"

// Radix UI
import * as PrimitivesSelect from '@radix-ui/react-select'
import {
    CheckIcon,
    CaretDownIcon,
    CaretUpIcon,
} from "@radix-ui/react-icons"

// Internal
export interface SelectProps extends PrimitivesSelect.SelectProps {
    triggerProps: PrimitivesSelect.SelectTriggerProps
    placeholder?: string
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>((props, forwardedRef) => {

    return (
        <PrimitivesSelect.Root {...props}>
            <PrimitivesSelect.Trigger
                ref={forwardedRef}
                {...props.triggerProps}
                className={`inline-flex items-center justify-between
                bg-teal-50
                hover:bg-teal-100 focus:bg-teal-100
                focus:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25
                border rounded-sm transition ease-in-out duration-150 text-sm
                ${props.triggerProps.className}`}
            >
                <PrimitivesSelect.Value
                    placeholder={props.placeholder ?? 'Select...'}
                />
                <PrimitivesSelect.Icon>
                    <CaretDownIcon />
                </PrimitivesSelect.Icon>
            </PrimitivesSelect.Trigger>
            <PrimitivesSelect.Portal>
                <PrimitivesSelect.Content
                    style={{
                        width: `var(--radix-select-trigger-width)`,
                        maxHeight: `var(--radix-select-content-available-height)`,
                    }}
                    position="popper"
                    sideOffset={5}
                    className="bg-white overflow-hidden border-2 p-1 rounded border-teal-500 text-sm z-10"
                >
                    <PrimitivesSelect.Viewport>
                        {props.children}
                    </PrimitivesSelect.Viewport>
                </PrimitivesSelect.Content>
            </PrimitivesSelect.Portal>
        </PrimitivesSelect.Root >
    )
})

export const SelectItem = React.forwardRef<HTMLDivElement, PrimitivesSelect.SelectItemProps>((props, forwardedRef) => {

    return (
        <PrimitivesSelect.Item
            {...props}
            ref={forwardedRef}
            className={`
                rounded flex relative items-center pl-7 pr-2 py-1 select-none transition-colors duration-100 text-teal-700
                data-[highlighted]:outline-none data-[highlighted]:bg-teal-600 data-[highlighted]:text-teal-50
                ${props.className}
            `}
        >
            <PrimitivesSelect.ItemText>{props.children}</PrimitivesSelect.ItemText>
            <PrimitivesSelect.ItemIndicator className="absolute left-2">
                <CheckIcon />
            </PrimitivesSelect.ItemIndicator>
        </PrimitivesSelect.Item>
    )
})
