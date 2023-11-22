import { useState } from "react"

// Tanstack Table
import { Row } from "@tanstack/react-table"

// Inertia
import { Head } from "@inertiajs/react"

// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { InputResultProps } from "@/Types"
import DataTable from "./DataTable"
import { columns } from "./Columns"
import PrimaryAnchor from "@/Components/PrimaryAnchor"
import PrimaryButton from "@/Components/PrimaryButton"
import { UpdateIcon } from "@radix-ui/react-icons"
import PrimaryOutlineAnchor from "@/Components/PrimaryOutlineAnchor"

const InputResult = ({ orders }: { orders: InputResultProps[] }) => {
  const [data, setData] = useState(() => [...orders])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AuthenticatedLayout>
      <Head title="Input Result" />
      <div className="py-3 max-w-6xl w-full mx-auto">
        <div className="flex">
          <PrimaryOutlineAnchor
            className="px-3 py-2"
            href={
              orders[0]
                ? route('input.result.detail', { order: orders[0].registration_id })
                : '#'
            }
          >
            Quick Input
          </PrimaryOutlineAnchor>
          <PrimaryButton
            className="px-3 py-2 ml-auto"
            onClick={() => {
              setIsLoading(true)
              fetch(route('get.all.orders'))
                .then(
                  response => {
                    if (!response.ok) {
                      throw new Error(`Http error. (${response.status})`)
                    }
                    return response.json()
                  }
                )
                .then(
                  (data: InputResultProps[]) => {
                    setData(data.filter(d => d.confirmed_at === undefined))
                    setIsLoading(false)
                  }
                )
                .catch(
                  error => {
                    console.log(error)
                  }
                )
            }}
          >
            Refresh <UpdateIcon className="ml-1" />
          </PrimaryButton>
        </div>
        <div className="mt-3">
          <DataTable
            data={data}
            columns={columns}
            isLoading={isLoading}
            getRowCanExpand={() => true}
            renderSubComponent={renderSubComponent}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default InputResult

const renderSubComponent = ({ row }: { row: Row<InputResultProps> }) => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        Test ordered :
      </div>
      {row.original.tests.map((test) => (
        <div key={test._id as string} className={`px-2 py-0.5 bg-teal-600 rounded-md text-white mr-1 flex items-center`}>
          {test.name as string}
        </div>
      ))}
      <PrimaryAnchor
        className="px-2 py-0.5 ml-auto"
        href={route('input.result.detail', { order: row.original.registration_id })}
      >
        See Detail
      </PrimaryAnchor>
    </div >
  )
}