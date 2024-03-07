import PrimaryButton from "@/Components/PrimaryButton"
import PrimaryOutlineAnchor from "@/Components/PrimaryOutlineAnchor"
import { CheckCircledIcon, UpdateIcon } from "@radix-ui/react-icons"
import DataTable from "./DataTable"
import { useContext } from "react"
import { InputResultContext } from "../Contexts/InputResultContext"
import useInputResultContent from "../Hooks/useInputResultContent"
import { Toast } from "@/Components/Toast"

const InputResultContent = () => {

    const { can, confirmedOrders, flash, open, refreshTable, setOpen } = useInputResultContent()

    return (
        <div className="py-3 max-w-6xl w-full mx-auto">
            <div className="flex">
                <PrimaryOutlineAnchor
                    data-disabled={!(confirmedOrders[0] && can.inputResult)}
                    className={`px-3 py-2`}
                    href={confirmedOrders[0] && can.inputResult
                        ? route('input.detail', { order: confirmedOrders!.at(-1)?.registration_id })
                        : '#'}
                >
                    Quick Select
                </PrimaryOutlineAnchor>
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

export default InputResultContent