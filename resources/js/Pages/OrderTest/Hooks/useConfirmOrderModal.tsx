import { FormEvent, useContext, useEffect, useState } from "react"

// Inertia JS
import { useForm } from "@inertiajs/react"

// Internal
import { OrderTestDetailContext } from "../Context/OrderTestDetailContext"
import { dialogTransition } from "@/Components/Dialog"

const useConfirmOrderModal = () => {

    const orderTestDetailContext = useContext(OrderTestDetailContext)!

    const [analystOptions, setAnalystOption] = useState(() => orderTestDetailContext.analysts.map(analyst => ({
        value: analyst._id,
        label: analyst.name + ', ' + analyst.title,
    })))

    const { data, setData, errors, patch, clearErrors, processing, reset } = useForm<{
        analyst: {
            value: string
            label: string
        } | null
        pin: string
    }>({
        analyst: null,
        pin: '',
    })

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        clearErrors()
        patch(route('confirm.order', { order: orderTestDetailContext.order.registration_id }), {
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

export default useConfirmOrderModal