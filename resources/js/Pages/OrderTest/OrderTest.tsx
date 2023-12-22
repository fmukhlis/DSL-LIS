import {
  useRef,
  useState,
  useEffect,
} from "react"

// Inertia
import { Head, usePage } from "@inertiajs/react"

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
import {
  OrderModelProps,
  DoctorModelProps,
  CategoryModelProps,
} from "@/Types"
import { CheckCircledIcon, UpdateIcon } from "@radix-ui/react-icons"
import { Toast, ToastProvider, ToastTitle, ToastViewport } from "@/Components/Toast"
import useOrderTest from "./Hooks/useOrderTest"

// const defaultData: TestOrderProps[] = generateOrderData(10)

const OrderTest = ({ categories, externalDoctors, orders }: {
  categories: CategoryModelProps[]
  externalDoctors: DoctorModelProps[]
  orders: OrderModelProps[]
}) => {

  const { data, isLoading, refreshTable, toastRef, flash, renderSubComponent } = useOrderTest({ categories, orders })

  return (
    <ToastProvider>
      <AuthenticatedLayout>
        <Head title="Order Test" />
        <div className="py-3 max-w-6xl w-full mx-auto">
          <div className="flex">
            <CreateOrderModal externalDoctors={externalDoctors} categories={categories} />
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
          <Toast
            ref={toastRef}
            title='Success!'
            icon={<CheckCircledIcon width={20} height={20} />}
          >
            <div className="text-sm">
              {flash.operationResponse}
            </div>
          </Toast>
        </div>
      </AuthenticatedLayout>
      <ToastViewport className="fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] [--viewport-padding:_15px] gap-1 w-96 max-w-[100vw] list-none z-[999] outline-none" />
    </ToastProvider>
  )
}

export default OrderTest