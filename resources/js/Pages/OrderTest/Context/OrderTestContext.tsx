import { ReactNode, createContext } from "react"

// Internal
import { OrderTestPage } from "@/Types/order-test"

const OrderTestContext = createContext<OrderTestPage | null>(null)

const OrderTestContextProvider = ({
    can,
    categories,
    children,
    externalDoctors,
    processedRegID,
    unconfirmedOrders
}: OrderTestPage & { children: ReactNode }) => {

    const context = {
        can,
        categories,
        externalDoctors,
        processedRegID,
        unconfirmedOrders,
    }

    return (
        <OrderTestContext.Provider value={context}>
            {children}
        </OrderTestContext.Provider>
    )
}

export { OrderTestContext, OrderTestContextProvider }
