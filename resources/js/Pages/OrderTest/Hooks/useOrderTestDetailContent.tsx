import { useContext } from "react"

// Internal
import { OrderTestDetailContext } from "../Context/OrderTestDetailContext"

const useOrderTestDetailContent = () => {

    const orderTestDetailContext = useContext(OrderTestDetailContext)!

    return ({
        order: orderTestDetailContext.order
    })
}

export default useOrderTestDetailContent