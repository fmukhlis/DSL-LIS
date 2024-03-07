import { ComponentPropsWithoutRef, ReactNode } from "react";

// Inertia JS
import { useForm } from "@inertiajs/react";

// Internal
import { AnalystModelProps, DateParamProps, OrderModelProps, ParameterModelProps } from ".";
import { ColumnDef, Table } from "@tanstack/react-table";

interface TestDetailsTabProps extends ComponentPropsWithoutRef<'div'> {
    order: OrderModelProps
}

interface OrderDetailsTabProps extends ComponentPropsWithoutRef<'div'> {
    order: OrderModelProps
}


export interface AuthorizationStatus {
    inputResult: boolean
}

export interface InputResultPage {
    can: AuthorizationStatus
    confirmedOrders: OrderModelProps[]
}

export interface InputResultDetailPage {
    analysts: AnalystModelProps[]
    order: OrderModelProps
    parameters: ParameterModelProps[]
}

export interface InputResultDetailContext extends InputResultDetailPage {
    submitForm: ReturnType<typeof useForm>
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