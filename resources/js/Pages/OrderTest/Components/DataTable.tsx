import React from 'react'

// Internal
import PrimaryButton from '@/Components/PrimaryButton'
import ExpandedRow from './ExpandedRow'
import TableController from './TableController'
import useDataTable from '../Hooks/useDataTable'

// Radix UI
import * as PrimitivesScrollArea from '@radix-ui/react-scroll-area'
import {
    ThickArrowLeftIcon,
    ThickArrowRightIcon,
    UpdateIcon
} from '@radix-ui/react-icons'

// TanStack Table
import { flexRender } from "@tanstack/react-table"

// React Spring
import { animated } from "@react-spring/web"

export default function DataTable() {

    const { emptyRowTransition, rowsTransition, table } = useDataTable()

    return (
        <div>
            <TableController />
            <PrimitivesScrollArea.Root className="mt-1 w-[1152px] h-[345px] rounded-sm overflow-hidden shadow bg-gray-50">
                <PrimitivesScrollArea.Viewport className="w-full h-full rounded-sm">
                    <table className="table-fixed w-full text-sm">
                        <thead className='text-teal-50 uppercase'>
                            {table.getHeaderGroups().map(headerGroup => {
                                return (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => {
                                            return (
                                                <th
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                    className={`text-start px-3.5 py-2 sticky top-0 bg-teal-600 
                                                    ${header.id === 'registration_id' && 'w-[125px]'}
                                                    ${header.id === 'patient' && 'w-[250px]'}
                                                    ${header.id === 'payment_method' && 'w-[150px]'}
                                                    ${header.id === 'doctor' && 'w-[300px]'}
                                                    ${header.id === 'is_cito' && 'w-[75px]'}
                                                    ${header.id === 'more' && 'w-[75px]'}
                                                    `}
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
                            {emptyRowTransition((style, isEmpty) => {
                                return (
                                    isEmpty &&
                                    <tr className='bg-teal-100'>
                                        <td colSpan={table.getAllColumns().length} className="p-0">
                                            <animated.div style={style} className='flex items-center justify-center px-3.5 h-10 text-gray-400'>
                                                No order found.
                                            </animated.div>
                                        </td>
                                    </tr>
                                )
                            })}

                            {rowsTransition((style, row) => {
                                return (
                                    row ? (
                                        <React.Fragment key={row.id}>
                                            <tr
                                                className={`bg-teal-${!row.getIsExpanded() ? '100' : '200'} hover:bg-teal-200 duration-75`}
                                            >
                                                {row.getVisibleCells().map(cell => {
                                                    return (
                                                        <td key={cell.id} className={`p-0`}                                                        >
                                                            <animated.div
                                                                style={style}
                                                                className={`flex items-center h-10`}
                                                            >
                                                                {flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext()
                                                                )}
                                                            </animated.div>
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <ExpandedRow row={row} />
                                        </React.Fragment>
                                    ) : (
                                        <tr className='bg-teal-100'>
                                            <td colSpan={table.getAllColumns().length} className="p-0">
                                                <animated.div style={style} className='flex items-center justify-center px-3.5 h-10 text-gray-400'>
                                                    Loading...<UpdateIcon className='animate-spin ml-2' />
                                                </animated.div>
                                            </td>
                                        </tr>
                                    )
                                )
                            })}
                        </tbody>
                    </table>
                </PrimitivesScrollArea.Viewport>
                <PrimitivesScrollArea.Scrollbar
                    className="flex select-none touch-none p-0.5 bg-gray-50 transition-colors duration-150 hover:bg-gray-100 data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-3"
                    orientation="vertical"
                >
                    <PrimitivesScrollArea.Thumb className="flex-1 bg-gray-400 rounded-sm relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[45px] before:min-h-[45px]" />
                </PrimitivesScrollArea.Scrollbar>
                <PrimitivesScrollArea.Scrollbar
                    className="flex select-none touch-none p-0.5 bg-gray-50 transition-colors duration-150 hover:bg-gray-100 data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-3"
                    orientation="horizontal"
                >
                    <PrimitivesScrollArea.Thumb className="flex-1 bg-gray-400 rounded-sm relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[45px] before:min-h-[45px]" />
                </PrimitivesScrollArea.Scrollbar>
                <PrimitivesScrollArea.Corner className="bg-gray-200" />
            </PrimitivesScrollArea.Root>

            <div className='flex items-center mt-2'>
                <div className='mr-auto text-sm text-gray-400'>
                    Page
                    <span className='font-bold mx-1'>{(table.getState().pagination.pageIndex ?? 0) + 1}</span>
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
        </div >
    )
}

