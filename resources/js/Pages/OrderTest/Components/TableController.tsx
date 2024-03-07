// Internal
import Input from '@/Components/Input'
import PrimaryButton from '@/Components/PrimaryButton'
import useTableController from '../Hooks/useTableController'
import { Select, SelectItem } from '@/Components/Select'

// Radix UI
import * as PrimitivesToggleGroup from '@radix-ui/react-toggle-group'
import * as PrimitivesSeparator from '@radix-ui/react-separator'
import {
    ArrowRightIcon,
    CaretSortIcon,
    CheckIcon,
} from '@radix-ui/react-icons'

const TableController = () => {

    const { ClearDateButton, tableContext } = useTableController()

    return (
        <div className='flex items-center p-2 bg-teal-100 rounded-sm h-12 overflow-x-auto'>
            <Input
                placeholder='Search data...'
                className='py-1 border-teal-800 bg-teal-50 text-teal-700 form-input duration-150'
                value={tableContext?.globalFilter}
                onChange={tableContext?.handleGlobalFilterChange}
            />
            <PrimitivesSeparator.Root
                decorative
                orientation='vertical'
                className='bg-teal-500 w-px h-full mx-2'
            />
            <Input
                type='date'
                name='start-date'
                className='py-1 border-teal-800 bg-teal-50 text-teal-700 w-[9.5rem] form-input duration-150'
                value={tableContext?.dateParam.startDate ?? ''}
                onChange={tableContext?.handleDateParamChange}
            />
            <ArrowRightIcon className='mx-1 text-teal-600' />
            <Input
                type='date'
                name='end-date'
                className='py-1 border-teal-800 bg-teal-50 text-teal-700 w-[9.5rem] form-input duration-150'
                value={tableContext?.dateParam.endDate ?? ''}
                onChange={tableContext?.handleDateParamChange}
            />
            <PrimaryButton
                className='rounded-[999px] h-6 w-6 ml-2 mr-1'
                onClick={tableContext?.applyDateParam}
            >
                <CheckIcon />
            </PrimaryButton>
            {ClearDateButton}
            <PrimitivesSeparator.Root
                decorative
                orientation='vertical'
                className='bg-teal-500 w-px h-full ml-1 mr-2'
            />
            <PrimitivesToggleGroup.Root
                type='multiple'
                value={tableContext?.paymentFilter}
                aria-label='Payment method'
                onValueChange={tableContext?.handlePaymentFilterChange}
                className='flex items-center rounded gap-1'
            >
                <PrimitivesToggleGroup.Item
                    value='BPJS'
                    className={`
                    bg-teal-50 text-teal-700 text-sm px-5 py-1 rounded-sm border border-teal-700
                    hover:bg-teal-200 data-[state=on]:bg-teal-500 data-[state=on]:text-teal-50
                    focus:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 duration-150
                `}
                >
                    BPJS
                </PrimitivesToggleGroup.Item>
                <PrimitivesToggleGroup.Item
                    value='Self-Payment'
                    className={`
                    bg-teal-50 text-teal-700 text-sm px-5 py-1 rounded-sm border border-teal-700
                    hover:bg-teal-200 data-[state=on]:bg-teal-500 data-[state=on]:text-teal-50
                    focus:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 duration-150
                `}
                >
                    Self-Payment
                </PrimitivesToggleGroup.Item>
                <PrimitivesToggleGroup.Item
                    value='Insurance'
                    className={`
                    bg-teal-50 text-teal-700 text-sm px-5 py-1 rounded-sm border border-teal-700
                    hover:bg-teal-200 data-[state=on]:bg-teal-500 data-[state=on]:text-teal-50
                    focus:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 duration-150
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
                onClick={tableContext?.handleSortingChange}
            >
                <CaretSortIcon width={18} height={18} />
            </PrimaryButton>
            <PrimitivesSeparator.Root
                decorative
                orientation='vertical'
                className='bg-teal-500 w-px h-full mx-2'
            />
            <Select
                value={tableContext?.rowCount}
                triggerProps={{
                    className: 'px-2 py-1 w-28 ml-auto'
                }}
                onValueChange={tableContext?.handleRowCountChange}
            >
                {['100', '50', '25', '10'].map(pageSize => (
                    <SelectItem key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </SelectItem>
                ))}
            </Select>
        </div>
    )
}

export default TableController