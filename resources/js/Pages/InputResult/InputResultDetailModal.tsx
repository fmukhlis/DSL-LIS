import {
    useState,
    FormEvent,
    useEffect
} from "react"

// Inertia JS
import { useForm } from "@inertiajs/react"

// Radix UI
import { FileTextIcon, LightningBoltIcon, Pencil2Icon, UpdateIcon } from "@radix-ui/react-icons"

// Internal
import Alert from "@/Components/Alert"
import Input from "@/Components/Input"
import PrimaryButton from "@/Components/PrimaryButton"
import SecondaryButton from "@/Components/SecondaryButton"
import PrimaryOutlineButton from "@/Components/PrimaryOutlineButton"
import {
    Dialog,
    DialogClose,
    DialogTitle,
    DialogContent,
    DialogTrigger,
} from "@/Components/Dialog"
import { ResultModelProps, TestModelProps } from "@/Types"

const InputResultDetailModal = ({ order_id, result }: {
    result: ResultModelProps
    order_id: string
}) => {
    const { data, setData, errors, post, clearErrors, processing, transform, reset } = useForm<{
        readonly test_id: string
        result: {
            value: number,
            parameter_id: string
        }[]
    }>({
        test_id: result.test_id,
        result: result.parameterValues.map(({ _id, ...parameterValue }) => ({ ...parameterValue }))
    })

    // transform((data) => ({
    //     ...data,
    //     analyst: data.analyst ? (data.analyst as Record<string, unknown>).value as string : null
    // }))

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        clearErrors()
        post(route('input.result.detail', { order: order_id }), {
            onSuccess: () => {
                setIsOpen(false)
            }
        })
    }

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            clearErrors()
        }
    }, [isOpen])

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger
                className="top-3 right-12 absolute border-0 bg-transparent text-teal-700 pb-0.5 pr-0.5
                hover:text-teal-500 outline-none ring-offset-2 ring-teal-600 focus:ring-2 rounded"
            >
                <Pencil2Icon />
            </DialogTrigger>
            <DialogContent className='w-full overflow-hidden select-none'>
                <form
                    onSubmit={submitForm}
                    className='flex flex-col'
                >
                    <DialogTitle
                        className="
                            pt-6 pl-7 pr-6 pb-2 z-10
                            flex items-center justify-between 
                            font-bold uppercase text-teal-800 text-lg
                            shadow-[0px_0px_13px_7px_rgba(240,_253,_250,_1)]
                        "
                    >
                        Test Result
                        <div className="text-teal-800">
                            <FileTextIcon width={20} height={20} />
                        </div>
                    </DialogTitle>

                    <div className='px-7 py-2 flex flex-col gap-3 max-h-96 overflow-y-auto'>

                        <div className="text-teal-800 flex items-center justify-between">
                            {result.test!.name}
                            {!result.test!.is_manual && <PrimaryButton type="button" className="p-0.5"><LightningBoltIcon /></PrimaryButton>}
                        </div>

                        <div className="flex flex-wrap text-sm gap-y-1 bg-white rounded px-3.5 pt-2 pb-2.5 justify-between">
                            {data.result.map((res, index) => {
                                const relatedParam = result.test!.parameters!.find(parameter => parameter._id === res.parameter_id)
                                return (
                                    <div
                                        key={res.parameter_id}
                                        className={`flex items-center w-[33%]`}
                                    >
                                        <label
                                            className="w-28"
                                            htmlFor={res.parameter_id}
                                        >
                                            {relatedParam!.name}
                                        </label>
                                        :
                                        <Input
                                            id={res.parameter_id}
                                            type="number"
                                            step={0.1}
                                            className="w-24 py-1 px-2 mx-2"
                                            value={res.value}
                                            onChange={(e) => {
                                                setData('result', data.result.map(r => (
                                                    r.parameter_id === res.parameter_id
                                                        ? { ...r, value: Math.max(parseFloat(e.target.value) || 0, 0) }
                                                        : r
                                                )))
                                            }}
                                        />
                                        <span>{relatedParam!.units![0].name}</span>
                                        <PrimaryOutlineButton
                                            type="button"
                                            className="ml-2 bg-transparent border-0 rounded-[50px] p-0.5 text-teal-700"
                                        >
                                            <UpdateIcon width={13} height={13} />
                                        </PrimaryOutlineButton>
                                    </div>
                                )
                            })}
                            {data.result.length % 3 === 2 && <div className="w-[33%]"></div>}
                        </div>
                    </div>
                    <div className='flex items-center px-6 pt-2 pb-7 gap-3 shadow-[0px_0px_13px_7px_rgba(240,_253,_250,_1)]'>
                        {result.test!.is_manual &&
                            <div className="text-xs text-gray-500">
                                * Oops! This type of test cannot be filled in automatically.
                            </div>
                        }
                        <DialogClose asChild>
                            <SecondaryButton
                                className="px-4 py-2 ml-auto"
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
                </form>
            </DialogContent >
        </Dialog >
    )
}

export default InputResultDetailModal