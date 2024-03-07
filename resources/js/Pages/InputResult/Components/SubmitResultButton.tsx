import { FormEvent, useContext, useEffect, useState } from "react"

// Internal
import PrimaryOutlineButton from "@/Components/PrimaryOutlineButton"
import { InputResultDetailsContext } from "../Contexts/InputResultDetailsContext"

// Radix UI
import { UpdateIcon } from "@radix-ui/react-icons"

const SubmitResultButton = () => {

    const { order, submitForm } = useContext(InputResultDetailsContext)!

    const isInputIncomplete = order.results.find(result => (
        result.parameterValues.find(parameterValue => parameterValue.value === 0) !== undefined
    )) !== undefined

    const submit = (e: FormEvent) => {
        e.preventDefault()
        submitForm.clearErrors()
        submitForm.patch(route('submit.result', { order: order.registration_id }))
    }

    return (
        <form onSubmit={submit}>
            <PrimaryOutlineButton
                className="px-3 py-2 flex items-center gap-2"
                disabled={isInputIncomplete || submitForm.processing}
            >
                {submitForm.processing
                    ? <>Submitting... <UpdateIcon className='animate-spin ml-2' /></>
                    : 'Submit'}
            </PrimaryOutlineButton>
        </form>
    )
}

export default SubmitResultButton