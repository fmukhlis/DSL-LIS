import { createContext, useContext, useEffect, useState } from "react";

// Tanstack Table
import { FilterFn, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

// Internal
import { DateParamProps, OrderModelProps } from "@/Types";
import { TableContextProps, TableContextProviderProps } from "@/Types/input-result";

const TableContext = createContext<TableContextProps | null>(null)

const TableContextProvider = ({
    children,
    tableColumns,
}: TableContextProviderProps) => {

    const [tableData, setTableData] = useState<OrderModelProps[]>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const handleGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        table.resetExpanded()
        setGlobalFilter(e.target.value)
    }
    const table = useReactTable({
        columns: tableColumns,
        data: tableData,
        filterFns: {
            filterByDate: filterByDate,
        },
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getRowCanExpand: () => true,
        getSortedRowModel: getSortedRowModel(),
        globalFilterFn: fuzzyFilter,
        state: {
            globalFilter,
        },
    })

    const [dateParam, setDateParam] = useState<DateParamProps>({})
    const handleDateParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateParam(prev =>
            e.target.name === 'start-date' ? ({
                ...prev,
                startDate: e.target.value,
            }) : ({
                ...prev,
                endDate: e.target.value,
            })
        )
    }
    const applyDateParam = () => {
        table.resetExpanded()
        table.getColumn('confirmed_at')?.setFilterValue(
            Object.keys(dateParam).length !== 0
                ? dateParam
                : undefined)
    }
    const resetDateParam = () => {
        table.resetExpanded()
        setDateParam({})
    }

    const [isLoading, setIsLoading] = useState(false)

    const [paymentFilter, setPaymentFilter] = useState(
        table.getColumn('payment_method')?.getFilterValue() as string[] ?? []
    )
    const handlePaymentFilterChange = (value: string[] | undefined) => {
        table.resetExpanded()
        setPaymentFilter(value ?? [])
        table.getColumn('payment_method')?.setFilterValue(value)
    }

    const [rowCount, setRowCount] = useState<string>('10')
    const handleRowCountChange = (value: string) => {
        table.resetExpanded()
        setRowCount(value)
    }

    const handleSortingChange = () => {
        table.resetExpanded()
        table.getColumn('confirmed_at')?.toggleSorting(
            table.getColumn('confirmed_at')?.getIsSorted() === 'asc'
        )
    }

    useEffect(() => {
        table.setPageSize(Number(rowCount))
    }, [rowCount])

    useEffect(() => {
        table.getColumn('confirmed_at')?.toggleSorting(true)
    }, [])

    const context = {
        applyDateParam,
        dateParam,
        globalFilter,
        handleDateParamChange,
        handleGlobalFilterChange,
        handlePaymentFilterChange,
        handleRowCountChange,
        handleSortingChange,
        isLoading,
        paymentFilter,
        resetDateParam,
        rowCount,
        setIsLoading,
        setTableData,
        table,
    }

    return (
        <TableContext.Provider value={context}>
            {children}
        </TableContext.Provider>
    )
}

export { TableContext, TableContextProvider }

const filterByDate: FilterFn<any> = (row, column, value, addMeta) => {
    const cellValue: Date = new Date(row.getValue(column))
    let startDate: Date | null = new Date(value.startDate)
    let endDate: Date | null = new Date(value.endDate)

    if (isNaN(startDate.getTime())) {
        startDate = null
    }
    if (isNaN(endDate.getTime())) {
        endDate = null
    }
    if (startDate) {
        startDate.setHours(0, 0, 0, 0)
    }
    if (endDate) {
        endDate.setHours(23, 59, 59, 999)
    }

    return (
        startDate
            ? endDate
                ? startDate.getTime() === endDate.getTime()
                    ? cellValue.getTime() === startDate.getTime()
                    : (cellValue >= startDate) && (cellValue <= endDate)
                : (cellValue >= startDate)
            : endDate
                ? (cellValue <= endDate)
                : true
    )
}

const fuzzyFilter: FilterFn<any> = (row, column, value, addMeta) => {
    const cellValue: string = row.getValue(column)
    const itemRank = rankItem(cellValue, value)
    addMeta(itemRank)
    return itemRank.passed
}