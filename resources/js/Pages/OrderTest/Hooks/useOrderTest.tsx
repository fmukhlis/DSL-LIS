import { FormEvent, useEffect, useRef, useState } from "react"

// Internal
import { CategoryModelProps, DoctorModelProps, OrderModelProps, UserModelProps } from "@/Types"
import PrimaryAnchor from "@/Components/PrimaryAnchor"

// Inertia JS
import { usePage } from "@inertiajs/react"

// Tanstack Table
import { Row } from "@tanstack/react-table"
import SecondaryButton from "@/Components/SecondaryButton"
import EditOrderModal from "../Components/EditOrderModal"

const useOrderTest = ({ can, categories, externalDoctors, unconfirmedOrders, processedRegID }: {
  can: {
    selectExternalDoctor: boolean
    viewDetail: boolean
  }
  categories: CategoryModelProps[]
  externalDoctors: DoctorModelProps[]
  unconfirmedOrders: OrderModelProps[]
  processedRegID: string[]
}) => {

  const [data, setData] = useState(unconfirmedOrders)
  const [isLoading, setIsLoading] = useState(false)
  const toastRef = useRef<{ publish: () => void }>(null)

  const { flash } = usePage<{ flash: { operationResponse: string } }>().props

  const refreshTable = () => {
    setIsLoading(true)
    window.axios.get(route('fetch.created.orders')).then(response => {
      if (response.statusText === "OK") {
        setData(response.data)
        setIsLoading(false)
      }
    }).catch(function (error) {
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
            {result.test?.name}
          </div>
        ))}
        <EditOrderModal
          can={can}
          processedRegID={processedRegID}
          triggerElement={
            <SecondaryButton className="ml-auto px-2 py-0.5 rounded-sm">Edit</SecondaryButton>
          }
          defaultData={
            row.original.doctor?.department ? {
              doctor: {
                name: row.original.doctor!.name,
                department: row.original.doctor!.department
              },
              is_cito: row.original.is_cito,
              patient: {
                name: row.original.patient!.name,
                patient_id: row.original.patient!.patient_id,
                registration_id: row.original.registration_id,
                contacts: row.original.patient!.contacts.map(contact => ({ [contact.type]: contact.contact }))
              },
              payment_method: row.original.payment_method,
              tests: row.original.results.map(result => result.test!),
              note: row.original.note,
            } : {
              doctor: {
                name: 'External doctor...',
                department: 'External doctor...',
              },
              externalDoctor: row.original.doctor,
              is_cito: row.original.is_cito,
              patient: {
                name: row.original.patient!.name,
                patient_id: row.original.patient!.patient_id,
                registration_id: row.original.registration_id,
                contacts: row.original.patient!.contacts.map(contact => ({ [contact.type]: contact.contact }))
              },
              payment_method: row.original.payment_method,
              tests: row.original.results.map(result => result.test!),
              note: row.original.note,
            }}
          externalDoctors={externalDoctors}
          categories={categories}
        />
        {can.viewDetail &&
          <PrimaryAnchor
            className="px-2 py-0.5 ml-1.5 rounded-sm"
            href={route('order.detail', { order: row.original.registration_id })}
          >
            See Detail
          </PrimaryAnchor>
        }
      </div >
    )
  }

  useEffect(() => {
    if (flash.operationResponse) {
      toastRef.current?.publish()
    }
    refreshTable()
  }, [unconfirmedOrders])

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