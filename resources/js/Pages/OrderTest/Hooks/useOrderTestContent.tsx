import { useContext, useEffect, useRef, useState } from "react"

// Inertia JS
import { usePage } from "@inertiajs/react"

// Internal
import { OrderTestContext } from "../Context/OrderTestContext"
import { TableContext } from "../Context/TableContext"
import { FlashDataProps } from "@/Types"

const useOrderTestContent = () => {

  const { unconfirmedOrders } = useContext(OrderTestContext)!
  const { isLoading, table, setIsLoading, setTableData, } = useContext(TableContext)!

  const { flash } = usePage<{ flash: FlashDataProps }>().props
  const [open, setOpen] = useState(flash.toastMsg ? true : false)

  const refreshTable = () => {
    if (!isLoading) {
      //@ts-ignore
      table.setExpanded(false)
      setIsLoading(true)
      window.axios.get(route('fetch.created.orders'))
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
  }, [unconfirmedOrders])

  useEffect(() => {
    setOpen(flash.toastMsg ? true : false)
  }, [flash.toastMsg])

  useEffect(() => {
    if (!open) {
      flash.toastMsg = null
    }
  }, [open])

  return ({
    flash,
    refreshTable,
    open,
    setOpen,
  })
}

export default useOrderTestContent