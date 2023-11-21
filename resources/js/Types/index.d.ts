import { 
    ReactElement, 
    ComponentPropsWithRef,
    ComponentPropsWithoutRef, 
} from "react"

// TanStack Table
import { 
    ColumnDef, 
    Row,
} from "@tanstack/react-table"

// Inertia
import { InertiaLinkProps } from "@inertiajs/react"

// Radix UI
import { 
    DropdownMenuContentProps as DMContentProps, 
    DropdownMenuTriggerProps as DMTriggerProps,
} from "@radix-ui/react-dropdown-menu"
import { TransitionFn } from "@react-spring/web"

// React Select
import { GroupBase } from "react-select"
import type { } from "react-select/base"

export interface TestOrderProps {
    registrationID: string
    patientName: string
    payment: 'BPJS' | 'Self-Payment' | 'Insurance'
    referringPhysician: string
    dateTime: Date
    tests: Record<string, unknown>[]
    confirmed_at : Date
}

export interface DataTableProps<TData> {
    data: TData[]
    columns: ColumnDef<TData>[]
    isLoading: boolean
    getRowCanExpand: (row: Row<TData>) => boolean
    renderSubComponent: (props: {row: Row<TData>}) => React.ReactElement
}

export interface AnchorProps extends InertiaLinkProps {
    children: React.ReactNode
    className?: string
}

export interface AuthenticatedLayoutProps extends ComponentPropsWithoutRef<'button'> {
    user?: string;
    header?: string; 
}

export interface DropdownMenuContentProps extends DMContentProps {
    transition: TransitionFn<boolean>
    minWidth: string
}

export interface NavigationMenuDropdownProps extends DMTriggerProps {
    trigger: { title: JSX.Element, withIcon: boolean }
    minWidth: string
}

export interface InputProps extends ComponentPropsWithRef<'input'> {
    isFocused? : boolean
}
