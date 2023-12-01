// Tanstack Table
import {
    ColumnDef,
    FilterFnOption,
} from "@tanstack/react-table";

// Internal
import { OrderModelProps } from '@/Types'
import PrimaryButton from "@/Components/PrimaryButton";
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
        id: 'more',
        enableGlobalFilter: false,
        header: (headerContext) => (
            <div className="flex items-center justify-center">
                <PrimaryButton
                    className="rounded-[99px]"
                    onClick={
                        headerContext.table.getToggleAllRowsExpandedHandler()
                    }
                >
                    {headerContext.table.getIsAllRowsExpanded()
                        ? <TriangleUpIcon width={18} height={18} />
                        : <TriangleDownIcon width={18} height={18} />}
                </PrimaryButton>
            </div>
        ),
        cell: cellContext => {
            return (
                <div className="flex items-center justify-center">
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
    {
        accessorKey: 'registration_id',
        enableGlobalFilter: true,
        header: () => {
            return (
                <div>Reg. ID</div>
            )
        },
        cell: cellContext => (
            <div>
                {cellContext.getValue<string>()}
            </div>
        ),
    },
    {
        accessorKey: 'patient',
        enableGlobalFilter: true,
        accessorFn: row => `${row.patient!.name}`,
        header: () => {
            return (
                <div>Patient</div>
            )
        },
    },
    {
        accessorKey: 'payment_method',
        enableGlobalFilter: false,
        filterFn: 'arrIncludesSome',
        header: () => {
            return (
                <div>Payment</div>
            )
        },
        cell: cellContext => (
            <div>
                {cellContext.getValue<'BPJS' | 'Self-Payment' | 'Insurance'>()}
            </div>
        ),
    },
    {
        accessorKey: 'doctor',
        enableGlobalFilter: true,
        accessorFn: row => `Dr. ${row.doctor!.name}, ${row.doctor!.specializations!.map(specialization => specialization.title)}`,
        header: () => {
            return (
                <div>Referring Physician</div>
            )
        },
    },
    {
        accessorKey: 'is_cito',
        enableGlobalFilter: false,
        header: () => {
            return (
                <div className="flex justify-center">CITO</div>
            )
        },
        cell: cellContext => (
            <div className="flex justify-center">{
                cellContext.getValue<boolean>()
                    ? <CheckCircledIcon className="text-green-600" width={19} height={19} />
                    : <CrossCircledIcon className="text-red-600" width={19} height={19} />
            }</div>
        )
    },
    {
        accessorKey: 'created_at',
        enableGlobalFilter: false,
        filterFn: 'filterByDate' as FilterFnOption<any>,
        sortingFn: 'datetime',
        header: headerContext => {
            return (
                <div className="flex items-center">
                    Order Date
                </div>
            )
        },
        cell: cellContext => (
            <div>
                {new Date(cellContext.getValue<string>()).toLocaleDateString('en-GB', dateTimeConfig)}
            </div>
        ),
    },
]