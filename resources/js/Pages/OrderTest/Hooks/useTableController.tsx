import { useContext } from "react"

// React Spring
import { animated, useTransition } from "@react-spring/web"

// Internal
import { TableContext } from "../Context/TableContext"
import SecondaryButton from "@/Components/SecondaryButton"

// Radix UI
import { Cross2Icon } from "@radix-ui/react-icons"

const useTableController = () => {

    const tableContext = useContext(TableContext)

    const resetDateTransition = useTransition(
        tableContext?.table.getColumn('created_at')?.getFilterValue() !== undefined,
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
        tableContext?.table.setExpanded(false)
        tableContext?.table.getColumn('created_at')?.setFilterValue(undefined)
        tableContext?.resetDateParam()
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
        tableContext,
        ClearDateButton
    })
}

export default useTableController