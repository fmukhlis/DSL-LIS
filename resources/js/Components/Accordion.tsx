import {
    forwardRef
} from 'react'

// Radix UI
import * as PrimitivesAccordion from '@radix-ui/react-accordion'
import { ThickArrowRightIcon, TriangleDownIcon } from '@radix-ui/react-icons'

export const AccordionRoot = PrimitivesAccordion.Root

export const AccordionItem = forwardRef<HTMLDivElement, PrimitivesAccordion.AccordionItemProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <PrimitivesAccordion.Item
                {...props}
                ref={forwardedRef}
                className={`
                    overflow-hidden focus-within:shadow-[0_0_0_2px_#0d9488] duration-200
                    ${className}
                `}
            >
                {children}
            </PrimitivesAccordion.Item>
        )
    }
)

export const AccordionTrigger = forwardRef<HTMLButtonElement, PrimitivesAccordion.AccordionTriggerProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <PrimitivesAccordion.Header className='flex'>
                <PrimitivesAccordion.Trigger
                    {...props}
                    ref={forwardedRef}
                    className={`
                        group flex items-center justify-between outline-none cursor-default flex-1 font-bold
                        ${className}
                    `}
                >
                    <div className='flex items-center'>
                        {children}
                    </div>
                    <TriangleDownIcon
                        width={17}
                        height={17}
                        className='group-data-[state=open]:-rotate-180 duration-300'
                        aria-hidden
                    />
                </PrimitivesAccordion.Trigger>
            </PrimitivesAccordion.Header>
        )
    }
)

export const AccordionContent = forwardRef<HTMLDivElement, PrimitivesAccordion.AccordionContentProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <PrimitivesAccordion.Content
                {...props}
                ref={forwardedRef}
                className={`
                    overflow-hidden
                    ${className}
                `}
            >
                {children}
            </PrimitivesAccordion.Content>
        )
    }
)
