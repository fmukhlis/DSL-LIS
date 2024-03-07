// Inertia
import { Head } from "@inertiajs/react"

// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import InputResultContent from "./Components/InputResultContent"
import { columns } from "./Components/Columns"
import { ToastProvider, ToastViewport } from "@/Components/Toast"
import { InputResultPage } from "@/Types/input-result"
import { InputResultContextProvider } from "./Contexts/InputResultContext"
import { TableContextProvider } from "./Contexts/TableContext"

const InputResult = ({ can, confirmedOrders }: InputResultPage) => {

  return (
    <InputResultContextProvider can={can} confirmedOrders={confirmedOrders}>
      <TableContextProvider tableColumns={columns}>
        <ToastProvider>
          <AuthenticatedLayout>
            <Head title="Input Result" />
            <InputResultContent />
          </AuthenticatedLayout>
          <ToastViewport className="fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] [--viewport-padding:_15px] gap-1 w-96 max-w-[100vw] list-none z-[999] outline-none" />
        </ToastProvider>
      </TableContextProvider>
    </InputResultContextProvider>
  )
}

export default InputResult