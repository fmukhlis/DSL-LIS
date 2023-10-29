// TanStack Table
import { 
    ColumnDef, 
    Row,
} from "@tanstack/react-table"

// Inertia
import { InertiaLinkProps } from "@inertiajs/react"

export interface TestOrderProps {
    registrationID: string
    patient: string
    payment: 'BPJS' | 'Self-Payment' | 'Insurance'
    referringPhysician: string
    dateTime: Date
    test: string[]
}

export interface DataTableProps<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]
    getRowCanExpand: (row: Row<TData>) => boolean
    renderSubComponent: (props: {row: Row<TData>}) => React.ReactElement
}

export interface AnchorProps extends InertiaLinkProps {
    children: React.ReactNode
    className?: string
}