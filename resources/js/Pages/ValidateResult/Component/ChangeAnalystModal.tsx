// Radix UI
import { CheckIcon, UpdateIcon } from "@radix-ui/react-icons"

// Internal
import Alert from "@/Components/Alert"
import Input from "@/Components/Input"
import { AnalystModelProps } from "@/Types"
import PrimaryButton from "@/Components/PrimaryButton"
import SecondaryButton from "@/Components/SecondaryButton"
import SearchableSelect from "@/Components/SearchableSelect"
import useChangeAnalystModal from "../Hooks/useChangeAnalystModal"
import {
    Dialog,
    DialogClose,
    DialogTitle,
    DialogContent,
    DialogTrigger,
} from "@/Components/Dialog"

const ChangeAnalystModal = ({ analysts, order_id }: {
    analysts: AnalystModelProps[]
    order_id: string
}) => {

    const {
        data,
        errors,
        isOpen,
        setData,
        setIsOpen,
        processing,
        submitForm,
        analystOptions,
    } = useChangeAnalystModal(analysts, order_id)

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <SecondaryButton className="bg-transparent border-transparent p-0.5 rounded-[100px]">
                    <UpdateIcon />
                </SecondaryButton>
            </DialogTrigger>
            <DialogContent className='w-[450px] overflow-hidden select-none'>
                <form
                    onSubmit={submitForm}
                    className='flex flex-col h-full'
                >
                    <DialogTitle
                        className="
                            pt-6 pl-7 pr-6 pb-2 z-10
                            flex items-center justify-between 
                            font-bold uppercase text-teal-800 text-lg
                            shadow-[0px_0px_13px_7px_rgba(240,_253,_250,_1)]
                        "
                    >
                        Change Analyst
                        <div className="rounded bg-teal-800 text-teal-50 ">
                            <CheckIcon width={20} height={20} />
                        </div>
                    </DialogTitle>

                    <div className='px-7 pt-2 pb-7 flex flex-col gap-2 h-full'>

                        {errors.analyst && <Alert formID={0} message={errors.analyst} type='error' />}
                        {errors.pin && <Alert formID={0} message={errors.pin} type='error' />}

                        <div className="text-teal-800">Please enter your pin to proceed</div>

                        <div className="flex gap-3 justify-between">
                            <SearchableSelect
                                value={data.analyst}
                                maxMenuHeight={150}
                                menuPosition="fixed"
                                options={analystOptions}
                                className="w-full text-sm"
                                placeholder="Select analyst..."
                                noOptionsMessage={() => "Analyst not found"}
                                onChange={(newValue) => {
                                    setData('analyst', newValue)
                                }}
                            />
                            <Input
                                value={data.pin}
                                type="password"
                                className="w-36"
                                placeholder="Insert your pin..."
                                onChange={(e) => {
                                    setData('pin', e.target.value)
                                }}
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-auto">
                            <DialogClose asChild>
                                <SecondaryButton
                                    className="px-4 py-2"
                                >
                                    Cancel
                                </SecondaryButton>
                            </DialogClose>
                            <PrimaryButton
                                disabled={processing}
                                className="px-4 py-2"
                            >
                                Confirm
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeAnalystModal