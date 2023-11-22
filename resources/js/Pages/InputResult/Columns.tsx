// Tanstack Table
import {
    ColumnDef,
    FilterFnOption,
} from "@tanstack/react-table";

// Internal
import { InputResultProps } from '@/Types'
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

export const columns: ColumnDef<InputResultProps>[] = [
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
        accessorFn: row => `${row.patient.name}`,
        header: () => {
            return (
                <div>Patient</div>
            )
        },
    },
    {
        accessorKey: 'analyst',
        enableGlobalFilter: true,
        accessorFn: row => `${row.analyst.name}, ${row.analyst.title}`,
        header: () => {
            return (
                <div>Confirming Analyst</div>
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
                <div>Ordered At</div>
            )
        },
        cell: cellContext => (
            <div>
                {new Date(cellContext.getValue<string>()).toLocaleDateString('en-GB', dateTimeConfig)}
            </div>
        ),
    },
    {
        accessorKey: 'confirmed_at',
        enableGlobalFilter: false,
        filterFn: 'filterByDate' as FilterFnOption<any>,
        sortingFn: 'datetime',
        header: headerContext => {
            return (
                <div>Confirmed At</div>
            )
        },
        cell: cellContext => (
            <div>
                {new Date(cellContext.getValue<string>()).toLocaleDateString('en-GB', dateTimeConfig)}
            </div>
        ),
    },
]