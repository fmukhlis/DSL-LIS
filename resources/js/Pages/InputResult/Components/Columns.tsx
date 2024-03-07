// Tanstack Table
import { ColumnDef, FilterFnOption } from "@tanstack/react-table";

// Internal
import { OrderModelProps } from '@/Types'
import PrimaryButton from "@/Components/PrimaryButton";

// Radix UI
import {
    CheckCircledIcon,
    Cross2Icon,
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
        accessorKey: 'registration_id',
        enableGlobalFilter: true,
        header: () => 'Reg. ID',
        cell: cellContext => (
            <div className="overflow-hidden whitespace-nowrap text-ellipsis pl-3.5">
                {cellContext.getValue<string>()}
            </div>
        ),
    },
    {
        accessorKey: 'patient',
        enableGlobalFilter: true,
        accessorFn: row => `${row.patient!.name}`,
        header: () => 'Patient',
        cell: cellContext => (
            <div className="overflow-hidden whitespace-nowrap text-ellipsis pl-3.5">
                {cellContext.getValue<string>()}
            </div>
        ),
    },
    {
        accessorKey: 'payment_method',
        enableGlobalFilter: false,
        filterFn: 'arrIncludesSome',
        header: () => 'Payment',
        cell: cellContext => (
            <div className="overflow-hidden whitespace-nowrap text-ellipsis pl-3.5">
                {cellContext.getValue<'BPJS' | 'Self-Payment' | 'Insurance'>()}
            </div>
        ),
    },
    {
        accessorKey: 'analyst',
        enableGlobalFilter: true,
        accessorFn: row => `${row.analyst!.name}, ${row.analyst!.title}`,
        header: () => 'Confirming Analyst',
        cell: cellContext => (
            <div className="overflow-hidden whitespace-nowrap text-ellipsis pl-3.5">
                {cellContext.getValue<string>()}
            </div>
        ),
    },
    {
        accessorKey: 'is_cito',
        enableGlobalFilter: false,
        header: () => <div className="flex justify-center">CITO</div>,
        cell: cellContext => (
            <div className="flex items-center justify-center mx-auto">{
                cellContext.getValue<boolean>()
                    ? <CheckCircledIcon className="text-green-600" width={19} height={19} />
                    : <CrossCircledIcon className="text-red-600" width={19} height={19} />
            }</div>
        )
    },
    {
        accessorKey: 'confirmed_at',
        enableGlobalFilter: false,
        filterFn: 'filterByDate' as FilterFnOption<any>,
        sortingFn: 'datetime',
        header: () => 'Confirmed Date',
        cell: cellContext => (
            <div className="pl-3.5">
                {new Date(cellContext.getValue<string>()).toLocaleDateString('en-GB', dateTimeConfig)}
            </div>
        ),
    },
    {
        id: 'more',
        enableGlobalFilter: false,
        header: () => <div className="flex justify-center">More</div>,
        cell: cellContext => {
            return (
                <div className="flex justify-center items-center mx-auto">
                    {cellContext.row.getCanExpand()
                        ? <PrimaryButton
                            className="rounded-[99px]"
                            onClick={cellContext.row.getToggleExpandedHandler()}
                        >
                            {cellContext.row.getIsExpanded()
                                ? <TriangleUpIcon />
                                : <TriangleDownIcon />}
                        </PrimaryButton>
                        : <Cross2Icon />
                    }
                </div>
            )

        }
    },
]