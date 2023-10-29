// Tanstack Table
import { 
    ColumnDef, 
    FilterFnOption, 
} from "@tanstack/react-table";

// Internal
import { TestOrderProps } from '@/Types'
import { 
    CaretSortIcon,
    Cross2Icon, 
    TriangleDownIcon, 
    TriangleUpIcon 
} from "@radix-ui/react-icons";
import PrimaryButton from "@/Components/PrimaryButton";

const dateTimeConfig : Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
}

export const columns : ColumnDef<TestOrderProps>[] = [
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
                        ?   <PrimaryButton
                                className="rounded-[99px]"
                                onClick={cellContext.row.getToggleExpandedHandler()}
                            >
                                {cellContext.row.getIsExpanded() 
                                    ? <TriangleUpIcon /> 
                                    : <TriangleDownIcon />}
                            </PrimaryButton>
                        :   <Cross2Icon />
                    }
                </div>
            )
            
        }
    },
    {
        accessorKey: 'registrationID',
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
        header: () => {
            return (
                <div>Patient</div>
            )
        },
        cell: cellContext => (
            <div>
                {cellContext.getValue<string>()}
            </div>
        ),
    },
    {
        accessorKey: 'payment',
        enableGlobalFilter: false,
        filterFn: 'arrIncludesSome',
        header: () => {
            return (
                <div>Payment</div>
            )
        },
        cell: cellContext => (
            <div>
                {cellContext.getValue<string>()}
            </div>
        ),
    },
    {
        accessorKey: 'referringPhysician',
        enableGlobalFilter: true,
        header: () => {
            return (
                <div>Referring Physician</div>
            )
        },
        cell: cellContext => (
            <div>
                {cellContext.getValue<string>()}
            </div>
        ),
    },
    {
        accessorKey: 'dateTime',
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
                {cellContext.getValue<Date>().toLocaleDateString('en-GB', dateTimeConfig)}
            </div>
        ),
    },
]