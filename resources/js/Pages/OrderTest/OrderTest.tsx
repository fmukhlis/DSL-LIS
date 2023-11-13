import { useEffect, useState } from "react"

// Inertia
import { Head } from "@inertiajs/react"

// TanStack Table
import { Row } from "@tanstack/react-table"

// Internal
import DataTable from "./DataTable"
import CreateOrderModal from "./CreateOrderModal"
import PrimaryButton from "@/Components/PrimaryButton"
import PrimaryAnchor from "@/Components/PrimaryAnchor"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { columns } from "./Columns"
import { generateOrderData } from "../Faker"
import { TestOrderProps } from "@/Types"
import { UpdateIcon } from "@radix-ui/react-icons"

const defaultData: TestOrderProps[] = generateOrderData(1000)

const OrderTest = () => {
  const [data, setData] = useState(() => [...defaultData])

  return (
    <AuthenticatedLayout>
      <Head title="Order Test" />
      <div className="py-3 max-w-6xl w-full mx-auto">
        <div className="flex">
          <CreateOrderModal />
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

export default OrderTest

const renderSubComponent = ({ row }: { row: Row<TestOrderProps> }) => {
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