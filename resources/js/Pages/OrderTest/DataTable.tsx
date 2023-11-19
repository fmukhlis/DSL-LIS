import React, {
    useEffect,
    useState,
} from 'react'

// Internal
import Input from '@/Components/Input'
import PrimaryButton from '@/Components/PrimaryButton'
import {
    DataTableProps,
    TestOrderProps,
} from "@/Types"
import {
    Select,
    SelectItem
} from '@/Components/Select'

// Radix UI
import * as PrimitivesToggleGroup from '@radix-ui/react-toggle-group'
import * as PrimitivesSeparator from '@radix-ui/react-separator'
import {
    ArrowRightIcon,
    CaretSortIcon,
    CheckIcon,
    ThickArrowLeftIcon,
    ThickArrowRightIcon,
    UpdateIcon
} from '@radix-ui/react-icons'

// TanStack Table
import {
    FilterFn,
    flexRender,
    SortingState,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    getExpandedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table"

export default function DataTable({
    data,
    columns,
    isLoading = false,
    getRowCanExpand,
    renderSubComponent,
}: DataTableProps<TestOrderProps>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = React.useState('')
    const [dateParam, setDateParam] = React.useState<{
        endDate?: string
        startDate?: string
    }>({})

    const table = useReactTable({
        data,
        columns,
        getRowCanExpand,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        filterFns: {
            filterByDate: filterByDate,
        }
    })

    const [rowCount, setRowCount] = useState<string>('10')

    useEffect(() => {
        table.setPageSize(Number(rowCount))
    }, [rowCount])

    return (
        <div>
            <div className='flex items-center p-2 bg-teal-200 rounded h-12 overflow-x-auto'>
                <Input
                    placeholder='Search data...'
                    className='py-1 border-teal-800 bg-teal-50 text-teal-700 form-input'
                    value={globalFilter ?? ''}
                    onChange={e => {
                        setGlobalFilter(e.target.value)
                    }}
                />

                <PrimitivesSeparator.Root
                    decorative
                    orientation='vertical'
                    className='bg-teal-500 w-px h-full mx-2'
                />

                <Input
                    type='date'
                    className='py-1 border-teal-800 bg-teal-50 text-teal-700 w-[9.5rem] form-input'
                    value={dateParam.startDate ?? ''}
                    onChange={e => {
                        setDateParam(fo => ({
                            ...fo,
                            startDate: e.target.value,
                        }))
                    }}
                />

                <ArrowRightIcon className='mx-1 text-teal-600' />

                <Input
                    type='date'
                    className='py-1 border-teal-800 bg-teal-50 text-teal-700 w-[9.5rem] form-input'
                    value={dateParam.endDate ?? ''}
                    onChange={e => {
                        setDateParam(fo => ({
                            ...fo,
                            endDate: e.target.value,
                        }))
                    }}
                />

                <PrimaryButton
                    className='rounded-[999px] p-0.5 ml-2'
                    onClick={e => {
                        table.getColumn('dateTime')?.setFilterValue(dateParam)
                    }}
                >
                    <CheckIcon />
                </PrimaryButton>

                <PrimitivesSeparator.Root
                    decorative
                    orientation='vertical'
                    className='bg-teal-500 w-px h-full mx-2'
                />

                <PrimitivesToggleGroup.Root
                    type='multiple'
                    value={table.getColumn('payment')?.getFilterValue() as string[] ?? []}
                    aria-label='Payment method'
                    onValueChange={e => {
                        table.getColumn('payment')?.setFilterValue(e)
                    }}
                    className='flex items-center rounded gap-1'
                >
                    <PrimitivesToggleGroup.Item
                        value='BPJS'
                        className={`
                            bg-teal-50 text-teal-700 text-sm px-5 py-1 rounded-sm border border-teal-700
                            hover:bg-teal-100 data-[state=on]:bg-teal-500 data-[state=on]:text-teal-50
                            focus:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2
                        `}
                    >
                        BPJS
                    </PrimitivesToggleGroup.Item>

                    <PrimitivesToggleGroup.Item
                        value='Self-Payment'
                        className={`
                            bg-teal-50 text-teal-700 text-sm px-5 py-1 rounded-sm border border-teal-700
                            hover:bg-teal-100 data-[state=on]:bg-teal-500 data-[state=on]:text-teal-50
                            focus:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2
                        `}
                    >
                        Self-Payment
                    </PrimitivesToggleGroup.Item>

                    <PrimitivesToggleGroup.Item
                        value='Insurance'
                        className={`
                            bg-teal-50 text-teal-700 text-sm px-5 py-1 rounded-sm border border-teal-700
                            hover:bg-teal-100 data-[state=on]:bg-teal-500 data-[state=on]:text-teal-50
                            focus:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2
                        `}
                    >
                        Insurance
                    </PrimitivesToggleGroup.Item>

                </PrimitivesToggleGroup.Root>

                <PrimitivesSeparator.Root
                    decorative
                    orientation='vertical'
                    className='bg-teal-500 w-px h-full mx-2'
                />

                <PrimaryButton
                    onClick={() => {
                        table.getColumn('dateTime')?.toggleSorting(table.getColumn('dateTime')?.getIsSorted() === 'asc')
                    }}
                >
                    <CaretSortIcon width={18} height={18} />
                </PrimaryButton>

                <PrimitivesSeparator.Root
                    decorative
                    orientation='vertical'
                    className='bg-teal-500 w-px h-full mx-2'
                />

                <Select
                    value={rowCount}
                    triggerProps={{
                        className: 'px-2 py-1 w-28 ml-auto'
                    }}
                    onValueChange={value => {
                        setRowCount(value)
                    }}
                >
                    {['100', '50', '25', '10'].map(pageSize => (
                        <SelectItem key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <div className='max-h-[335px] h-full overflow-y-auto mt-1 rounded overflow-x-hidden shadow'>
                <table className="table-auto min-w-[1000px] w-full text-sm relative">
                    <thead className='text-teal-50 uppercase'>
                        {table.getHeaderGroups().map(headerGroup => {
                            return (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => {
                                        return (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                className={`text-start px-3.5 py-2 sticky top-0 bg-teal-600 ${header.id === 'more' && 'w-5'}`}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }
                                            </th>
                                        )
                                    }
                                    )}
                                </tr>
                            )
                        }
                        )}
                    </thead>
                    <tbody>
                        {
                            !isLoading ? (
                                table.getRowModel().rows.length
                                    ? (
                                        table.getRowModel().rows.map(row => {
                                            return (
                                                <React.Fragment key={row.id}>
                                                    <tr className={`bg-teal-${!row.getIsExpanded() ? '100 border-b' : '200'} border-teal-300 hover:bg-teal-200 duration-75`}>
                                                        {row.getVisibleCells().map(cell => (
                                                            <td key={cell.id} className="px-3.5 py-1.5">
                                                                {flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext()
                                                                )}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    {row.getIsExpanded() &&
                                                        <tr className='border-b border-teal-300 bg-teal-50'>
                                                            <td colSpan={row.getVisibleCells().length} className="px-3.5 py-1.5">
                                                                {renderSubComponent({ row })}
                                                            </td>
                                                        </tr>
                                                    }
                                                </React.Fragment>
                                            )
                                        })
                                    ) : (
                                        <tr className='border-b border-teal-300 bg-teal-50'>
                                            <td colSpan={6} className="px-3.5 py-1.5 text-center text-gray-400">
                                                No orders currently.
                                            </td>
                                        </tr>
                                    )
                            ) : (
                                <tr className='border-b border-teal-300 bg-teal-50'>
                                    <td colSpan={6} className="px-3.5 py-1.5 text-gray-400">
                                        <div className='flex items-center justify-center'>
                                            Loading...<UpdateIcon className='animate-spin ml-2' />
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className='flex items-center mt-2'>
                <div className='mr-auto text-sm text-gray-400'>
                    Page
                    <span className='font-bold mx-1'>{table.getState().pagination.pageIndex + 1}</span>
                    of
                    <span className='font-bold mx-1'>{table.getPageCount()}</span>
                    (Total data: {table.getFilteredRowModel().rows.length})
                </div>
                <PrimaryButton
                    className='flex items-center mr-3 px-2 py-1'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ThickArrowLeftIcon className='mr-1' width={20} height={20} /> Prev
                </PrimaryButton>
                <PrimaryButton
                    className='flex items-center px-2 py-1'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next <ThickArrowRightIcon className='ml-1' width={20} height={20} />
                </PrimaryButton>
            </div>
        </div>
    )
}

const filterByDate: FilterFn<any> = (row, column, value, addMeta) => {
    let startDate: Date | null = new Date(value.startDate)
    let endDate: Date | null = new Date(value.endDate)
    const cellValue: Date = new Date(row.getValue(column))

    if (isNaN(startDate.getTime())) {
        startDate = null
    }

    if (isNaN(endDate.getTime())) {
        endDate = null
    }

    if (startDate && endDate && (startDate.getTime() === endDate.getTime())) {
        cellValue.setHours(0, 0, 0, 0)
        startDate.setHours(0, 0, 0, 0)
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