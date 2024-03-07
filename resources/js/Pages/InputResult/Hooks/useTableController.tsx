import { useContext } from "react"

// React Spring
import { animated, useTransition } from "@react-spring/web"

// Internal
import SecondaryButton from "@/Components/SecondaryButton"
import { TableContext } from "../Contexts/TableContext"

// Radix UI
import { Cross2Icon } from "@radix-ui/react-icons"

const useTableController = () => {

    const {
        applyDateParam,
        dateParam,
        globalFilter,
        handleDateParamChange,
        handleGlobalFilterChange,
        handlePaymentFilterChange,
        handleRowCountChange,
        handleSortingChange,
        paymentFilter,
        resetDateParam,
        rowCount,
        table,
    } = useContext(TableContext)!

    const resetDateTransition = useTransition(
        table.getColumn('confirmed_at')?.getFilterValue() !== undefined,
        {
            from: {
                maxWidth: '0rem',
                opacity: 0.75,
            },
            enter: {
                maxWidth: '1.5rem',
                opacity: 1,
            },
            leave: {
                boxShadow: 'none',
                border: 'none',
                maxWidth: '0rem',
                opacity: 0,
            },
            config: { tension: 300, friction: 30 }
        }
    )

    const handleResetDateParamClick = () => {
        //@ts-ignore
        table.setExpanded(false)
        table.getColumn('confirmed_at')?.setFilterValue(undefined)
        resetDateParam()
    }

    const AnimatedSecondaryButton = animated(SecondaryButton)

    const ClearDateButton = resetDateTransition((style, item) => {
        return (
            item &&
            <>
                <animated.div className={'w-1'} style={{ maxWidth: style.maxWidth }}></animated.div>
                <AnimatedSecondaryButton
                    style={style}
                    className='rounded-[999px] h-6 w-6'
                    onClick={handleResetDateParamClick}
                >
                    <Cross2Icon />
                </AnimatedSecondaryButton>
                <animated.div className={'w-1'} style={{ maxWidth: style.maxWidth }}></animated.div>
            </>
        )
    })

    return ({
        applyDateParam,
        ClearDateButton,
        dateParam,
        globalFilter,
        handleDateParamChange,
        handleGlobalFilterChange,
        handlePaymentFilterChange,
        handleRowCountChange,
        handleSortingChange,
        paymentFilter,
        rowCount,
    })
}

export default useTableController