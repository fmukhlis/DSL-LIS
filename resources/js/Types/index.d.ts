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
    is_cito: boolean
    created_at: Date
    doctor_id: string
    patient_id: string
    confirmed_at : Date
    registration_id: string
    payment_method: 'BPJS' | 'Self-Payment' | 'Insurance'

    patient: {
        _id: string
        name: string
    }
    doctor: {
        _id: string
        name: string
        specializations: {
            _id: string
            name: string
            title: string
            doctor_ids: string[]
        }[]
    }
    tests: {
        _id: string
        name: string
        category_id: string
        is_manual: boolean
        order_id: string[]
        parameter_ids: string[]
        price: number
    }[]
}

export interface InputResultProps {
    registration_id: string
    confirmed_at : Date
    created_at: Date
    patient_id: string
    analyst_id: string
    is_cito: boolean

    patient: {
        _id: string
        name: string
    }
    analyst: {
        _id: string
        name: string
        title: string
    }
    tests: {
        _id: string
        name: string
        category_id: string
        is_manual: boolean
        order_id: string[]
        parameter_ids: string[]
        price: number
    }[]
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
