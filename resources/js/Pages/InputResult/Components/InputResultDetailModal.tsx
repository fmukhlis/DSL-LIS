import { ReactNode } from "react"

// Inertia JS
import { useForm } from "@inertiajs/react"

// Radix UI
import { FileTextIcon, LightningBoltIcon, Pencil2Icon, UpdateIcon } from "@radix-ui/react-icons"

// Internal
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
import { ResultModelProps } from "@/Types"
import useInputResultDetailModal from "../Hooks/useInputResultDetailModal"
import Alert from "@/Components/Alert"
import { InputResultDetailsContext } from "../Contexts/InputResultDetailsContext"

const InputResultDetailModal = ({ children, result }: {
    children: ReactNode
    result: ResultModelProps
}) => {

    const {
        data,
        fade,
        handleDialogChange,
        handleInput,
        hasErrors,
        isOpen,
        processing,
        submit
    } = useInputResultDetailModal({ result })

    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleDialogChange}
        >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            {fade((style, item) => {
                return (
                    item &&
                    <DialogContent style={style} className='w-full overflow-hidden select-none'>
                        <form onSubmit={submit} className='flex flex-col'>
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
                                    {result.test?.name}
                                    {!result.test?.is_manual && <PrimaryButton type="button" className="p-0.5"><LightningBoltIcon /></PrimaryButton>}
                                </div>

                                {hasErrors && <Alert message="An error occurred due to an invalid result value." formID={1} type="error" />}

                                <div className="flex flex-wrap text-sm gap-y-1 bg-white rounded px-3.5 pt-2 pb-2.5 justify-between">
                                    {data.parameterValues.map((parameterValue) => {
                                        const relatedParam = result.test?.parameters?.find(
                                            parameter => parameter._id === parameterValue.parameter_id
                                        )
                                        return (
                                            <div
                                                key={parameterValue.parameter_id}
                                                className={`flex items-center w-[33%]`}
                                            >
                                                <label
                                                    className="w-28"
                                                    htmlFor={parameterValue.parameter_id}
                                                >
                                                    {relatedParam!.name}
                                                </label>
                                                :
                                                <Input
                                                    id={parameterValue.parameter_id}
                                                    type="number"
                                                    step={0.1}
                                                    className={`w-24 py-1 px-2 mx-2 
                                                    ${hasErrors && parameterValue.value === 0 && "text-red-600 border-red-600"}`
                                                    }
                                                    value={parameterValue.value}
                                                    onChange={e => {
                                                        handleInput(parameterValue.parameter_id, e.target.value)
                                                    }}
                                                />
                                                <span>{relatedParam!.units![0].name}</span>
                                                <PrimaryOutlineButton
                                                    type="button"
                                                    className="ml-2 bg-transparent border-transparent rounded-[50px] p-0.5 text-teal-700"
                                                >
                                                    <UpdateIcon width={13} height={13} />
                                                </PrimaryOutlineButton>
                                            </div>
                                        )
                                    })}
                                    {data.parameterValues.length % 3 === 2 && <div className="w-[33%]"></div>}
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
                                    {processing ? <>Processing...<UpdateIcon className='animate-spin ml-2' /></> : 'Confirm'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </DialogContent >
                )
            })}
        </Dialog >
    )
}

export default InputResultDetailModal