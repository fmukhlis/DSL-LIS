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
import { TestOrderProps } from "@/Types"
import { CheckCircledIcon, UpdateIcon } from "@radix-ui/react-icons"
import { Toast, ToastProvider, ToastTitle, ToastViewport } from "@/Components/Toast"

const defaultData: TestOrderProps[] = generateOrderData(10)

const OrderTest = ({
  orders,
  doctors,
  categories,
}: {
  orders: TestOrderProps[]
  doctors: Record<string, unknown>[]
  categories: Record<string, unknown>[]
}) => {
  const [data, setData] = useState(() => orders.filter(order => order.confirmed_at === undefined))
  const [isLoading, setIsLoading] = useState(false)
  const savedRef = useRef<{ publish: () => void }>(null)

  const { flash } = usePage<{
    flash: {
      operationResponse: string
    }
  }>().props

  useEffect(() => {
    if (flash.operationResponse) {
      savedRef.current?.publish()
    }
    setData(() => orders.filter(order => order.confirmed_at === undefined))
  }, [flash.operationResponse])

  return (
    <ToastProvider>
      <AuthenticatedLayout>
        <Head title="Order Test" />
        <div className="py-3 max-w-6xl w-full mx-auto">
          <div className="flex">
            <CreateOrderModal doctors={doctors} categories={categories} />
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
                    data => {
                      setData([...data])
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
          <Toast
            duration={5000}
            ref={savedRef}
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

const renderSubComponent = ({ row }: { row: Row<TestOrderProps> }) => {
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
        href={route('order.detail', { order: row.original.registrationID })}
      >
        See Detail
      </PrimaryAnchor>
    </div >
  )
}