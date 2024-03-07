import { FormEvent, useContext, useEffect, useState } from "react"

// Inertia JS
import { useForm } from "@inertiajs/react"

// Internal
import { ResultModelProps } from "@/Types"
import { InputResultDetailsContext } from "../Contexts/InputResultDetailsContext"
import { dialogTransition } from "@/Components/Dialog"

const useInputResultDetailModal = ({ result }: { result: ResultModelProps }) => {

    const { order, submitForm } = useContext(InputResultDetailsContext)!

    const [isOpen, setIsOpen] = useState(false)
    const [fade, fadeAPI] = dialogTransition(isOpen)

    const { data, setData, patch, clearErrors, processing, reset, hasErrors, setDefaults } = useForm<{
        readonly resultID: string
        parameterValues: {
            value: number,
            parameter_id: string
        }[]
    }>({
        resultID: result._id,
        parameterValues: result.parameterValues.map(({ _id, ...parameterValue }) => ({ ...parameterValue }))
    })

    const submit = (e: FormEvent) => {
        e.preventDefault()
        clearErrors()
        patch(route('input.detail', { order: order.registration_id }), {
            onSuccess: () => {
                setDefaults()
                setIsOpen(false)
            }
        })
    }

    const handleInput = (parameterID: string, value: string) => {
        setData('parameterValues', data.parameterValues.map(parameterValue => (
            parameterValue.parameter_id === parameterID
                ? { ...parameterValue, value: Math.max(parseFloat(value) || 0, 0) }
                : parameterValue
        )))
    }

    const handleDialogChange = (state: boolean) => {
        //@ts-ignore
        submitForm.clearErrors(result._id)
        setIsOpen(state)
    }

    useEffect(() => {
        if (!isOpen) {
            reset()
            clearErrors()
        }
        fadeAPI.start()
    }, [isOpen])

    return {
        data,
        fade,
        handleInput,
        hasErrors,
        isOpen,
        processing,
        submit,
        handleDialogChange,
    }
}

export default useInputResultDetailModal