import { FormEvent, useContext, useEffect, useState } from "react"

// Inertia JS
import { useForm } from "@inertiajs/react"

// Internal
import { InputResultDetailsContext } from "../Contexts/InputResultDetailsContext"
import { dialogTransition } from "@/Components/Dialog"

const useChangeAnalystModal = () => {

    const { analysts, order } = useContext(InputResultDetailsContext)!

    const [analystOptions, setAnalystOption] = useState(() => analysts.map(analyst => ({
        value: analyst._id,
        label: analyst.name + ', ' + analyst.title,
    })))

    const { data, setData, errors, patch, clearErrors, processing, reset } = useForm<{
        analyst: {
            label: string
            value: string
        } | null
        pin: string
    }>({
        analyst: null,
        pin: '',
    })

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        clearErrors()
        patch(route('change.analyst', { order: order.registration_id }), {
            onSuccess: () => {
                setIsOpen(false)
            }
        })
    }

    const [isOpen, setIsOpen] = useState(false)
    const [fade, fadeAPI] = dialogTransition(isOpen)

    useEffect(() => {
        if (!isOpen) {
            reset()
            clearErrors()
        }
        fadeAPI.start()
    }, [isOpen])

    return ({
        analystOptions,
        data,
        errors,
        fade,
        isOpen,
        processing,
        setData,
        setIsOpen,
        submitForm,
    })
}

export default useChangeAnalystModal