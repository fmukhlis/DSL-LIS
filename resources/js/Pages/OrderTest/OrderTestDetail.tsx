// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import OrderTestDetailContent from "./Components/OrderTestDetailContent"
import { OrderTestDetailPage } from "@/Types/order-test"
import { OrderTestDetailContextProvider } from "./Context/OrderTestDetailContext"

// Inertia JS
import { Head } from "@inertiajs/react"

const OrderTestDetail = ({ order, analysts }: OrderTestDetailPage) => {
    return (
        <OrderTestDetailContextProvider analysts={analysts} order={order}>
            <AuthenticatedLayout>
                <Head title="Order Details" />
                <OrderTestDetailContent />
            </AuthenticatedLayout>
        </OrderTestDetailContextProvider>
    )
}

export default OrderTestDetail