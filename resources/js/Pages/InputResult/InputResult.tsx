import { useState } from "react"

// Tanstack Table
import { Row } from "@tanstack/react-table"

// Inertia
import { Head } from "@inertiajs/react"

// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { OrderModelProps } from "@/Types"
import DataTable from "./DataTable"
import { columns } from "./Columns"
import PrimaryAnchor from "@/Components/PrimaryAnchor"
import PrimaryButton from "@/Components/PrimaryButton"
import { UpdateIcon } from "@radix-ui/react-icons"
import PrimaryOutlineAnchor from "@/Components/PrimaryOutlineAnchor"
import useInputResult from "./Hooks/useInputResult"

const InputResult = ({ orders }: { orders: OrderModelProps[] }) => {

  const { data, isLoading, refreshTable, renderSubComponent } = useInputResult({ orders })

  return (
    <AuthenticatedLayout>
      <Head title="Input Result" />
      <div className="py-3 max-w-6xl w-full mx-auto">
        <div className="flex">
          <PrimaryOutlineAnchor
            className="px-3 py-2"
            href={
              orders[0]
                ? route('input.detail', { order: orders[0].registration_id })
                : '#'
            }
          >
            Quick Input
          </PrimaryOutlineAnchor>
          <PrimaryButton
            className="px-3 py-2 ml-auto"
            onClick={refreshTable}
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