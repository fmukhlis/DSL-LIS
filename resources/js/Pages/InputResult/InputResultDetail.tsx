// Inertia JS
import { Head } from "@inertiajs/react"

// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import PrimaryOutlineAnchor from "@/Components/PrimaryOutlineAnchor"
import ChangeAnalystModal from "./Components/ChangeAnalystModal"
import { AnalystModelProps, OrderModelProps } from "@/Types"

// Radix UI
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import PatientInformation from "@/Components/PatientInformation"
import SubmitResultButton from "./Components/SubmitResultButton"
import TestDetailsTab from "./Components/TestDetailsTab"
import OrderDetailsTab from "./Components/OrderDetailsTab"
import { InputResultDetailsContextProvider } from "./Contexts/InputResultDetailsContext"
import { InputResultDetailPage } from "@/Types/input-result"
import InputResultDetailContent from "./Components/InputResultDetailContent"
import { ToastProvider, ToastViewport } from "@/Components/Toast"



const InputResultDetail = ({ analysts, order, parameters }: InputResultDetailPage) => {

    return (
        <InputResultDetailsContextProvider analysts={analysts} order={order} parameters={parameters}>
            <ToastProvider>
                <AuthenticatedLayout>
                    <Head title="Input Result Detail" />
                    <InputResultDetailContent />
                </AuthenticatedLayout>
                <ToastViewport className="fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] [--viewport-padding:_15px] gap-1 w-96 max-w-[100vw] list-none z-[999] outline-none" />
            </ToastProvider>
        </InputResultDetailsContextProvider>
    )
}

export default InputResultDetail