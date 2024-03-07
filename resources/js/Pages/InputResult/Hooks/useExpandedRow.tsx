import { useContext, useEffect } from "react"

// Tanstack Table
import { Row } from "@tanstack/react-table"

// React Spring
import { useTransition } from "@react-spring/web"

// Internal
import { OrderModelProps } from "@/Types"

const useExpandedRow = ({ row }: { row: Row<OrderModelProps> }) => {

    const [transition, transitionAPI] = useTransition(
        [row.getIsExpanded()],
        () => ({
            from: {
                maxHeight: '0rem',
                opacity: 0.5,
            },
            enter: {
                maxHeight: '2.25rem',
                opacity: 1,
            },
            leave: {
                maxHeight: '0rem',
                opacity: 0,
            },
        }))

    useEffect(() => {
        transitionAPI.start()
    }, [row.getIsExpanded()])

    return ({
        transition,
    })
}

export default useExpandedRow