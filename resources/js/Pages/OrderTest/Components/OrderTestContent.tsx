// Internal
import DataTable from "./DataTable"
import CreateOrderModal from "./CreateOrderModal"
import PrimaryButton from "@/Components/PrimaryButton"
import PrimaryOutlineButton from "@/Components/PrimaryOutlineButton"
import useOrderTestContent from "../Hooks/useOrderTestContent"
import { Toast } from "@/Components/Toast"

// Radix UI
import { CheckCircledIcon, UpdateIcon } from "@radix-ui/react-icons"

const OrderTestContent = () => {

    const { open, flash, refreshTable, setOpen } = useOrderTestContent()

    return (
        <div className="py-3 max-w-6xl w-full mx-auto">
            <div className="flex">
                <CreateOrderModal>
                    <PrimaryOutlineButton className="px-3 py-2">
                        Make new order
                    </PrimaryOutlineButton>
                </CreateOrderModal>
                <PrimaryButton
                    className="px-3 py-2 ml-auto"
                    onClick={refreshTable}
                >
                    Refresh <UpdateIcon className="ml-1" />
                </PrimaryButton>
            </div>
            <div className="mt-3">
                <DataTable />
            </div>
            <Toast
                open={open}
                onOpenChange={setOpen}
                duration={3000}
                title='Success!'
                icon={<CheckCircledIcon width={20} height={20} />}
            >
                <div className="text-sm">
                    {flash.toastMsg}
                </div>
            </Toast>
        </div>
    )
}

export default OrderTestContent