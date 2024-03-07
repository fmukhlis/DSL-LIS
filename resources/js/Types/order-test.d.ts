import { ReactNode } from "react"
import { AnalystModelProps, CategoryModelProps, DateParamProps, DoctorModelProps, OrderModelProps } from "."
import { ColumnDef, Table } from "@tanstack/react-table"

interface AuthorizationStatus {
    selectExternalDoctor: boolean
    viewDetail: boolean
}

export interface OrderTestPage {
    can: AuthorizationStatus
    categories: CategoryModelProps[]
    externalDoctors: DoctorModelProps[]
    processedRegID: string[]
    unconfirmedOrders: OrderModelProps[]
}

export interface OrderTestDetailPage {
    order: OrderModelProps
    analysts: AnalystModelProps[]
}

export interface TableContextProviderProps {
    children: ReactNode
    tableColumns: ColumnDef<OrderModelProps>[]
}

export interface TableContextProps {
    applyDateParam: () => void
    dateParam: DateParamProps
    globalFilter: string
    handleDateParamChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handlePaymentFilterChange: (value: string[] | undefined) => void
    handleRowCountChange: (value: string) => void
    handleSortingChange: () => void
    isLoading: boolean
    paymentFilter: string[] | undefined
    resetDateParam: () => void
    rowCount: string
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setTableData: React.Dispatch<React.SetStateAction<OrderModelProps[]>>
    table: Table<OrderModelProps>
}