import {
    forwardRef,
    useState
} from 'react'

// Internal
import {
    NavigationMenuDropdownProps,
    DropdownMenuContentProps,
} from '@/Types'

// React Spring
import {
    animated,
    useTransition,
    UseTransitionProps,
} from '@react-spring/web'

// Radix UI
import * as PrimitivesDropdownMenu from '@radix-ui/react-dropdown-menu'
import {
    CheckIcon,
    DividerHorizontalIcon,
    TriangleDownIcon
} from '@radix-ui/react-icons'

export const DropdownMenu = PrimitivesDropdownMenu.Root
export const DropdownMenuItem = PrimitivesDropdownMenu.Item
export const DropdownMenuGroup = PrimitivesDropdownMenu.Group
export const DropdownMenuLabel = PrimitivesDropdownMenu.Label
export const DropdownMenuTrigger = PrimitivesDropdownMenu.Trigger
export const DropdownMenuSeparator = PrimitivesDropdownMenu.Separator
export const DropdownMenuRadioGroup = PrimitivesDropdownMenu.RadioGroup

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
    ({ children, transition, className, minWidth, ...props }, forwardedRef) => {

        const AnimatedContent = animated(PrimitivesDropdownMenu.Content)

        return (
            <PrimitivesDropdownMenu.Portal forceMount>
                {transition((style, isOpen) => (
                    <>
                        {isOpen ? (
                            <AnimatedContent
                                {...props}
                                forceMount
                                style={style}
                                ref={forwardedRef}
                                className={`min-w-[${minWidth}] bg-teal-600 rounded p-1.5 shadow ${className}`}
                            >
                                {children}
                                <PrimitivesDropdownMenu.Arrow className='fill-teal-600' />
                            </AnimatedContent>
                        ) : null}
                    </>
                ))}
            </PrimitivesDropdownMenu.Portal>
        );
    }
);

export const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, PrimitivesDropdownMenu.DropdownMenuCheckboxItemProps>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <PrimitivesDropdownMenu.CheckboxItem
                {...props}
                ref={forwardedRef}
            >
                {children}
                <PrimitivesDropdownMenu.ItemIndicator>
                    {props.checked === 'indeterminate' && <DividerHorizontalIcon />}
                    {props.checked === true && <CheckIcon />}
                </PrimitivesDropdownMenu.ItemIndicator>
            </PrimitivesDropdownMenu.CheckboxItem>
        );
    }
);

export const DropdownMenuRadioItem = forwardRef<HTMLDivElement, PrimitivesDropdownMenu.DropdownMenuRadioItemProps>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <PrimitivesDropdownMenu.RadioItem {...props} ref={forwardedRef}>
                {children}
                <PrimitivesDropdownMenu.ItemIndicator>
                    <CheckIcon />
                </PrimitivesDropdownMenu.ItemIndicator>
            </PrimitivesDropdownMenu.RadioItem>
        );
    }
);

export const NavDropdownMenu = forwardRef<HTMLButtonElement, NavigationMenuDropdownProps>(
    ({ trigger, minWidth, ...props }, forwardedRef) => {

        const [isOpen, setIsOpen] = useState(false)

        const transition = useTransition<boolean, UseTransitionProps>(isOpen, {
            from: {
                opacity: 0,
                transform: `translate3d(0px, -7px, 0px)`,
            },
            enter: {
                opacity: 1,
                transform: `translate3d(0px, 0px, 0px)`,
            },
            leave: {
                opacity: 0,
                transform: `translate3d(0px, 5px, 0px)`,
                config: {
                    duration: 150
                },
            }
        })

        const handleOpenChange = () => {
            setIsOpen(io => !io)
        }

        return (
            <DropdownMenu
                open={isOpen}
                onOpenChange={handleOpenChange}
            >
                <DropdownMenuTrigger
                    {...props}
                    ref={forwardedRef}
                    className={`
                        hover:bg-teal-400
                        focus:bg-teal-400
                        data-[state=open]:bg-teal-600
                        px-2 ${trigger.withIcon && 'pr-1'} py-1 rounded outline-none duration-150 flex items-center
                    `}
                >
                    {trigger.title} {trigger.withIcon && <TriangleDownIcon className='ml-1' />}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    sideOffset={3}
                    className='z-10'
                    minWidth={minWidth}
                    transition={transition}
                >
                    {props.children}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
)