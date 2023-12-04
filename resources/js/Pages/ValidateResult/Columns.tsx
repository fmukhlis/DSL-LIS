
// Tanstack Table
import { ColumnDef, FilterFnOption } from "@tanstack/react-table";

// Internal
import { OrderModelProps } from "@/Types";
import PrimaryButton from "@/Components/PrimaryButton";

// Radix UI
import {
    CheckCircledIcon,
    CrossCircledIcon,
    TriangleDownIcon,
    TriangleUpIcon
} from "@radix-ui/react-icons";

const dateTimeConfig: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
}

export const columns: ColumnDef<OrderModelProps>[] = [
    {
        id: 'more',
        enableGlobalFilter: false,
        header: (headerContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) headerContext@1stColumn: ' + headerContext)
            return (
                <div className="flex items-center justify-center">
                    <PrimaryButton
                        className="rounded-[99px]"
                        onClick={headerContext.table.getToggleAllRowsExpandedHandler()}
                    >
                        {
                            headerContext.table.getIsAllRowsExpanded()
                                ? <TriangleUpIcon width={18} height={18} />
                                : <TriangleDownIcon width={18} height={18} />
                        }
                    </PrimaryButton>
                </div>
            )
        },
        cell: (cellContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) cellContext@1stColumn: ' + cellContext)
            return (
                <div className="flex items-center justify-center">
                    {
                        cellContext.row.getCanExpand() &&
                        <PrimaryButton
                            className="rounded-[99px]"
                            onClick={cellContext.row.getToggleExpandedHandler()}
                        >
                            {cellContext.row.getIsExpanded()
                                ? <TriangleUpIcon />
                                : <TriangleDownIcon />}
                        </PrimaryButton>
                    }
                </div>
            )
        }
    },
    {
        accessorKey: 'registration_id',
        enableGlobalFilter: true,
        header: (headerContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) headerContext@2ndColumn: ' + headerContext)
            return (
                <div>Reg. ID</div>
            )
        },
        cell: (cellContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) cellContext@2ndColumn: ' + cellContext)
            return (
                <div>{cellContext.getValue<string>()}</div>
            )
        }
    },
    {
        accessorKey: 'patient',
        enableGlobalFilter: true,
        accessorFn: (row) => {
            console.log('(Debug-ValidateResult/Columns.tsx) row@3rdColumn: ' + row)
            return (
                `${row.patient!.name}`
            )
        },
        header: (headerContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) headerContext@3rdColumn: ' + headerContext)
            return (
                <div>Patient</div>
            )
        }
    },
    {
        accessorKey: 'analyst',
        enableGlobalFilter: true,
        accessorFn: (row) => {
            console.log('(Debug-ValidateResult/Columns.tsx) row@4thColumn: ' + row)
            return (
                `${row.analyst!.name}, ${row.analyst!.title}`
            )
        },
        header: (headerContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) headerContext@4thColumn: ' + headerContext)
            return (
                <div>Confirming Analyst</div>
            )
        }
    },
    {
        accessorKey: 'is_cito',
        enableGlobalFilter: false,
        header: (headerContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) headerContext@5thColumn: ' + headerContext)
            return (
                <div>CITO</div>
            )
        },
        cell: (cellContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) cellContext@5thColumn: ' + cellContext)
            return (
                <div>
                    {
                        cellContext.getValue<boolean>()
                            ? <CheckCircledIcon className="text-green-600" width={19} height={19} />
                            : <CrossCircledIcon className="text-red-600" width={19} height={19} />
                    }
                </div>
            )
        }
    },
    {
        accessorKey: 'created_at',
        enableGlobalFilter: false,
        filterFn: 'filterByDate' as FilterFnOption<any>,
        sortingFn: 'datetime',
        header: (headerContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) headerContext@6thColumn: ' + headerContext)
            return (
                <div>Ordered At</div>
            )
        },
        cell: (cellContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) cellContext@6thColumn: ' + cellContext)
            return (
                <div>
                    {new Date(cellContext.getValue<string>()).toLocaleDateString('en-GB', dateTimeConfig)}
                </div>
            )
        },
    },
    {
        accessorKey: 'inputted_at',
        enableGlobalFilter: false,
        filterFn: 'filterByDate' as FilterFnOption<any>,
        sortingFn: 'datetime',
        header: (headerContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) headerContext@7thColumn: ')
            console.log(headerContext)
            return (
                <div>Inputted At</div>
            )
        },
        cell: (cellContext) => {
            console.log('(Debug-ValidateResult/Columns.tsx) cellContext@6thColumn: ')
            console.log(cellContext)
            return (
                <div>
                    {new Date(cellContext.getValue<string>()).toLocaleDateString('en-GB', dateTimeConfig)}
                </div>
            )
        },
    },
]