import { useState } from "react"

// Internal
import PrimaryAnchor from "@/Components/PrimaryAnchor"
import { OrderModelProps, UserModelProps } from "@/Types"

// Tanstack Table
import { Row } from "@tanstack/react-table"

// Inertia JS
import { usePage } from "@inertiajs/react"

const useInputResult = ({ orders }: {
    orders: OrderModelProps[]
}) => {

    const [data, setData] = useState(orders)
    const [isLoading, setIsLoading] = useState(false)
    const { auth } = usePage<{
        auth: { user: UserModelProps }
    }>().props

    const refreshTable = () => {
        setIsLoading(true)
        fetch(route('cobain'))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Http error. (${response.status})`)
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                // setData(data)
                // setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
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

    return ({
        data,
        isLoading,
        refreshTable,
        renderSubComponent
    })
}

export default useInputResult