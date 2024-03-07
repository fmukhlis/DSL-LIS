import { useContext } from "react"

// Internal
import { useTransition } from "@react-spring/web"
import { TableContext } from "../Context/TableContext"

const useDataTable = () => {

    const { isLoading, table } = useContext(TableContext)!

    const rowsTransition = useTransition(
        (isLoading
            ? [null]
            : table.getRowModel().rows),
        ({
            from: item => ({
                maxHeight: item ? '0rem' : '2.25rem',
                transform: item ? 'translate3D(0,5rem,0)' : 'translate3D(0,0rem,0)',
                opacity: 0,
            }),
            enter: {
                maxHeight: '2.25rem',
                transform: 'translate3D(0,0rem,0)',
                opacity: 1,
            },
            leave: {
                maxHeight: '0rem',
                transform: 'translate3D(0,0rem,0)',
                opacity: 0,
            },
            trail: 100,
            config: (item, key, phase) => {
                return (item && phase === 'enter' ? ({ tension: 170, friction: 26 }) : ({
                    duration: 200
                }))
            }
        })
    )

    const emptyRowTransition = useTransition(
        [!isLoading && (table.getRowModel().rows.length === 0)],
        ({
            from: {
                maxHeight: '0rem',
                transform: 'translate3D(0,5rem,0)',
                opacity: 0.5,
            },
            enter: {
                maxHeight: '2.25rem',
                transform: 'translate3D(0,0rem,0)',
                opacity: 1,
            },
            leave: {
                maxHeight: '0rem',
                transform: 'translate3D(0,0rem,0)',
                opacity: 0,
            },
        })
    )

    return ({
        emptyRowTransition,
        rowsTransition,
        table,
    })
}
export default useDataTable