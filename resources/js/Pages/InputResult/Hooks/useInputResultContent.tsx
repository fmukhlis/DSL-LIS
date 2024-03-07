import { useContext, useEffect, useState } from "react"

// Inertia JS
import { usePage } from "@inertiajs/react"

// Internal
import { InputResultContext } from "../Contexts/InputResultContext"
import { TableContext } from "../Contexts/TableContext"
import { FlashDataProps } from "@/Types"

const useInputResultContent = () => {

    const { can, confirmedOrders } = useContext(InputResultContext)!
    const { isLoading, setIsLoading, setTableData, table, } = useContext(TableContext)!

    const { flash } = usePage<{ flash: FlashDataProps }>().props
    const [open, setOpen] = useState(flash.toastMsg ? true : false)

    const refreshTable = () => {
        if (!isLoading) {
            //@ts-ignore
            table.setExpanded(false)
            setIsLoading(true)
            window.axios.get(route('fetch.confirmed.orders'))
                .then(response => {
                    if (response.statusText === "OK") {
                        setTableData(response.data)
                        setIsLoading(false)
                    }
                })
                .catch(function (error) {
                    console.log(error.toJSON())
                })
        }
    }

    useEffect(() => {
        refreshTable()
    }, [confirmedOrders])

    useEffect(() => {
        setOpen(flash.toastMsg ? true : false)
    }, [flash.toastMsg])

    useEffect(() => {
        if (!open) {
            flash.toastMsg = null
        }
    }, [open])

    return ({
        can,
        confirmedOrders,
        flash,
        open,
        refreshTable,
        setOpen,
    })
}

export default useInputResultContent