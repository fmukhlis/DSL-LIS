import {
    useState,
    FormEvent,
    useEffect
} from "react"

// Inertia JS
import { useForm } from "@inertiajs/react"

// Radix UI
import { CheckIcon } from "@radix-ui/react-icons"

// Internal
import PrimaryOutlineButton from "@/Components/PrimaryOutlineButton"
import Alert from "@/Components/Alert"
import Input from "@/Components/Input"
import PrimaryButton from "@/Components/PrimaryButton"
import SecondaryButton from "@/Components/SecondaryButton"
import SearchableSelect from "@/Components/SearchableSelect"
import {
    Dialog,
    DialogClose,
    DialogTitle,
    DialogContent,
    DialogTrigger,
} from "@/Components/Dialog"

const ConfirmOrderModal = ({ analysts, order_id }: {
    analysts: {
        _id: string
        name: string
    }[]
    order_id: string
}) => {

    const [analystOptions, setAnalystOption] = useState(analysts.map(analyst => ({
        value: analyst._id,
        label: analyst.name,
    })))

    const { data, setData, errors, post, clearErrors, processing, transform, reset } = useForm<{
        pin: string
        analyst: Record<string, unknown> | string | null
    }>({
        analyst: null,
        pin: '',
    })

    transform((data) => ({
        ...data,
        analyst: data.analyst ? (data.analyst as Record<string, unknown>).value as string : null
    }))

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        clearErrors()
        post(route('order.detail', { order: order_id }))
    }

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            reset()
            clearErrors()
        }
    }, [isOpen])

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <PrimaryOutlineButton className="px-3 py-2">
                    Proceed
                </PrimaryOutlineButton>
            </DialogTrigger>
            <DialogContent className='min-h-[40%] overflow-hidden select-none'>
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
                        Confirm Order
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
                                maxMenuHeight={100}
                                menuPosition="fixed"
                                options={analystOptions}
                                className="w-full text-sm"
                                placeholder="Select analyst..."
                                noOptionsMessage={() => "Analyst not found"}
                                onChange={(newValue) => {
                                    setData('analyst', newValue as Record<string, unknown>)
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

export default ConfirmOrderModal