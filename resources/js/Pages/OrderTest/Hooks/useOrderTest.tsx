import { useEffect, useRef, useState } from "react"

// Internal
import {
  CategoryModelProps,
  DoctorModelProps,
  OrderModelProps
} from "@/Types"
import PrimaryAnchor from "@/Components/PrimaryAnchor"

// Inertia JS
import { usePage } from "@inertiajs/react"

// Tanstack Table
import { Row } from "@tanstack/react-table"

const useOrderTest = ({ orders, categories }: {
  orders: OrderModelProps[]
  categories: CategoryModelProps[]
}) => {

  const [data, setData] = useState(orders)
  const [isLoading, setIsLoading] = useState(false)
  const toastRef = useRef<{ publish: () => void }>(null)

  const { flash } = usePage<{
    flash: {
      operationResponse: string
    }
  }>().props

  const refreshTable = () => {
    setIsLoading(true)
    fetch(route('fetch.created.orders'))
      .then(response => {
        if (!response.ok) {
          throw new Error(`Http error. (${response.status})`)
        }
        return response.json()
      }
      )
      .then((data: OrderModelProps[]) => {
        setData(data)
        setIsLoading(false)
      }
      )
      .catch(error => { console.log(error) })
  }

  const renderSubComponent = ({ row }: { row: Row<OrderModelProps> }) => {
    return (
      <div className="flex items-center">
        <div className="mr-2">
          Test ordered :
        </div>
        {row.original.results.map((result) => (
          <div
            key={result._id}
            className={`px-2 py-0.5 bg-teal-600 rounded-md text-white mr-1 flex items-center`}
          >
            {result.test?.name}
          </div>
        ))}
        <PrimaryAnchor
          className="px-2 py-0.5 ml-auto"
          href={route('order.detail', { order: row.original.registration_id })}
        >
          See Detail
        </PrimaryAnchor>
      </div >
    )
  }

  useEffect(() => {
    if (flash.operationResponse) {
      toastRef.current?.publish()
    }
    setData(() => orders.filter(order => order.status === 'need_confirmation'))
  }, [flash.operationResponse])

  return ({
    data,
    flash,
    isLoading,
    refreshTable,
    renderSubComponent,
    toastRef,
  })
}

export default useOrderTest