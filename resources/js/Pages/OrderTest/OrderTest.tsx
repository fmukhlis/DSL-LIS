import { useState } from "react"

// Inertia
import { Head, Link } from "@inertiajs/react"

// TanStack Table
import { Row } from "@tanstack/react-table"

// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import PrimaryButton from "@/Components/PrimaryButton"
import SecondaryButton from "@/Components/SecondaryButton"
import DataTable from "./DataTable"
import { UpdateIcon } from "@radix-ui/react-icons"
import { TestOrderProps } from "@/Types"
import { columns } from "./Columns"
import { generateData } from "./Faker"
import PrimaryAnchor from "@/Components/PrimaryAnchor"

const defaultData: TestOrderProps[] = generateData(10000)

const TestOrder = () => {
  const [data, setData] = useState(() => [...defaultData])

  return (
    <AuthenticatedLayout>
        <Head title="Test Order"/>
        <div className="py-3 max-w-6xl w-full mx-auto">
            <div className="flex">
                <SecondaryButton
                  className="px-3 py-2"
                >
                    Make new order
                </SecondaryButton>
                <PrimaryButton
                  className="px-3 py-2 ml-auto"
                >
                  Refresh <UpdateIcon className="ml-1" />
                </PrimaryButton>
            </div>
            <div className="mt-3">
              <DataTable 
                columns={columns} 
                data={data}
                getRowCanExpand={() => true}
                renderSubComponent={renderSubComponent}
              />
            </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default TestOrder

const renderSubComponent = ({row}: {row: Row<TestOrderProps>}) => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        Test ordered : 
      </div>
      {row.original.test.map((to) => (
        <div key={to} className="px-2 py-0.5 bg-teal-600 rounded-md text-white mr-1">
          {to}
        </div>
      ))}
      <PrimaryAnchor
        className="px-2 py-0.5 ml-auto"
        href={route('dashboard')}
      >
        See Detail
      </PrimaryAnchor>
    </div>
  )
}