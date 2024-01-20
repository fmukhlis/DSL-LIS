// Internal
import PrimaryOutlineButton from "@/Components/PrimaryOutlineButton"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/Components/Dialog"
import useSubmitModal from "../Hooks/useSubmitModal"
import { AnalystModelProps, OrderModelProps } from "@/Types"
import Alert from "@/Components/Alert"
import SearchableSelect from "@/Components/SearchableSelect"

// Radix UI
import { CheckIcon } from "@radix-ui/react-icons"
import Input from "@/Components/Input"
import SecondaryButton from "@/Components/SecondaryButton"
import PrimaryButton from "@/Components/PrimaryButton"

const SubmitModal = ({ order }: {
    order: OrderModelProps
}) => {

    const { canSubmit, submitForm, form } = useSubmitModal({ order })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <PrimaryOutlineButton
                    className="px-3 py-2 flex items-center gap-2"
                    disabled={!canSubmit}
                >
                    Submit
                </PrimaryOutlineButton>
            </DialogTrigger>
            <DialogContent className="w-[400px] overflow-hidden select-none">
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
                        Submit Feedbacks
                        <div className="rounded bg-teal-800 text-teal-50 ">
                            <CheckIcon width={20} height={20} />
                        </div>
                    </DialogTitle>

                    <div className='px-7 pt-2 pb-7 flex flex-col gap-2 h-full'>

                        {form.errors.pin && <Alert formID={0} message={form.errors.pin} type='error' />}

                        <div className="text-teal-800">Please enter validation pin to proceed</div>

                        <Input
                            value={form.data.pin}
                            type="password"
                            className="w-full text-center"
                            placeholder="Insert pin..."
                            onChange={(e) => {
                                form.setData('pin', e.target.value)
                            }}
                        />

                        <div className="flex justify-end gap-3 mt-1.5">
                            <DialogClose asChild>
                                <SecondaryButton
                                    className="px-4 py-2"
                                >
                                    Cancel
                                </SecondaryButton>
                            </DialogClose>
                            <PrimaryButton
                                disabled={form.processing}
                                className="px-4 py-2"
                            >
                                Submit
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SubmitModal