// Inertia
import { Head } from "@inertiajs/react"

// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import OrderTestContent from "./Components/OrderTestContent"
import { columns } from "./Components/Columns"
import { ToastProvider, ToastViewport } from "@/Components/Toast"
import { OrderTestContextProvider } from "./Context/OrderTestContext"
import { OrderTestPage } from "@/Types/order-test"
import { TableContextProvider } from "./Context/TableContext"

const OrderTest = ({
  can,
  categories,
  externalDoctors,
  processedRegID,
  unconfirmedOrders
}: OrderTestPage) => {
  return (
    <OrderTestContextProvider
      can={can}
      categories={categories}
      externalDoctors={externalDoctors}
      processedRegID={processedRegID}
      unconfirmedOrders={unconfirmedOrders}
    >
      <TableContextProvider tableColumns={columns}>
        <ToastProvider>
          <AuthenticatedLayout>
            <Head title="Order Test" />
            <OrderTestContent />
          </AuthenticatedLayout>
          <ToastViewport className="fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] [--viewport-padding:_15px] gap-1 w-96 max-w-[100vw] list-none z-[999] outline-none" />
        </ToastProvider>
      </TableContextProvider>
    </OrderTestContextProvider>
  )
}

export default OrderTest