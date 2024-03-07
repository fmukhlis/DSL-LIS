import { useEffect, useRef, useState } from "react"

// Internal
import PrimaryAnchor from "@/Components/PrimaryAnchor"
import { FlashDataProps, OrderModelProps } from "@/Types"

// Tanstack Table
import { Row } from "@tanstack/react-table"
import { usePage } from "@inertiajs/react"

const useInputResult = ({ confirmedOrders }: {
    confirmedOrders: OrderModelProps[]
}) => {

    const [data, setData] = useState(confirmedOrders)
    const { flash } = usePage<{ flash: FlashDataProps }>().props
    const [isLoading, setIsLoading] = useState(false)
    const toastRef = useRef<{ publish: () => void }>(null)

    const refreshTable = () => {
        setIsLoading(true)
        window.axios.get(route('fetch.confirmed.orders'))
            .then(response => {
                if (response.statusText === "OK") {
                    setData(response.data)
                    setIsLoading(false)
                }
            }).catch(error => {
                console.log(error.toJSON())
            })
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
                        {result.test!.name}
                    </div>
                ))}
                <PrimaryAnchor
                    className="px-2 py-0.5 ml-auto"
                    href={route('input.detail', { order: row.original.registration_id })}
                >
                    See Detail
                </PrimaryAnchor>
            </div >
        )
    }

    useEffect(() => {
        if (flash.toastMsg) {
            toastRef.current?.publish()
        }
        refreshTable()
    }, [confirmedOrders])

    return ({
        data,
        flash,
        isLoading,
        refreshTable,
        renderSubComponent,
        toastRef,
    })
}

export default useInputResult