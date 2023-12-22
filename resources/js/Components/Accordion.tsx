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
                    overflow-hidden 
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
                        group flex items-center justify-between outline-none flex-1 font-bold
                        ${className}
                    `}
                >
                    <div className='flex items-center'>
                        <ThickArrowRightIcon className='duration-300 group-focus:w-6 mr-1 w-0' />
                        {children}
                    </div>
                    <TriangleDownIcon
                        width={17}
                        height={17}
                        className='group-data-[state=open]:-rotate-180 duration-200'
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
