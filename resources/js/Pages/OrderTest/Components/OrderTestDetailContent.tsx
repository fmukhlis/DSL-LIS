
// Internal
import PrimaryOutlineAnchor from "@/Components/PrimaryOutlineAnchor"
import ConfirmOrderModal from "./ConfirmOrderModal"
import PrimaryOutlineButton from "@/Components/PrimaryOutlineButton"
import PatientInformation from "@/Components/PatientInformation"
import * as PrimitivesTabs from '@radix-ui/react-tabs'

// Radix UI
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import OrderDetailsTab from "@/Components/OrderDetailsTab"
import useOrderTestDetailContent from "../Hooks/useOrderTestDetailContent"

const OrderTestDetailContent = () => {

    const { order } = useOrderTestDetailContent()

    return (
        <div className="flex flex-col py-3 gap-3">
            <div className="max-w-6xl w-full mx-auto flex justify-between">
                <PrimaryOutlineAnchor
                    className="px-3 py-2 flex items-center gap-2"
                    href={route('order.test')}
                >
                    <ArrowLeftIcon /> Back
                </PrimaryOutlineAnchor>

                <ConfirmOrderModal>
                    <PrimaryOutlineButton className="px-3 py-2">
                        Confirm
                    </PrimaryOutlineButton>
                </ConfirmOrderModal>
            </div>

            <PatientInformation order={order} />

            <div className="max-w-6xl w-full mx-auto bg-teal-100 text-teal-800 rounded relative">
                <PrimitivesTabs.Root
                    value="order-details"
                >
                    <PrimitivesTabs.List
                        className="flex border-b-2 border-teal-600 overflow-hidden items-center"
                        aria-label="View details"
                    >
                        <PrimitivesTabs.Trigger
                            disabled
                            className="
                                    px-5 pt-3 pb-2.5 duration-150 border-0 border-teal-600
                                    data-[state=active]:font-bold hover:bg-teal-100 
                                "
                            value="order-details"
                        >
                            Order Details
                        </PrimitivesTabs.Trigger>
                    </PrimitivesTabs.List>
                    <PrimitivesTabs.Content className="outline-none" value="order-details">
                        <OrderDetailsTab order={order} />
                    </PrimitivesTabs.Content>
                </PrimitivesTabs.Root>
            </div>
        </div>
    )
}

export default OrderTestDetailContent