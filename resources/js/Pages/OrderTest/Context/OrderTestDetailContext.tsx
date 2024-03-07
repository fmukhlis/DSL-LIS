import { ReactNode, createContext } from "react";

// Internal
import { OrderTestDetailPage } from "@/Types/order-test";

const OrderTestDetailContext = createContext<OrderTestDetailPage | null>(null)

const OrderTestDetailContextProvider = ({
    analysts,
    children,
    order
}: OrderTestDetailPage & { children: ReactNode }) => {

    const context = {
        analysts,
        order,
    }

    return (
        <OrderTestDetailContext.Provider value={context}>
            {children}
        </OrderTestDetailContext.Provider>
    )
}

export { OrderTestDetailContext, OrderTestDetailContextProvider }