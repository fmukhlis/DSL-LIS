import { FormEvent, useEffect, useState } from "react"

// Internal
import { AnalystModelProps } from "@/Types"

// Inertia JS
import { useForm } from "@inertiajs/react"

const useConfirmOrderModal = ({ analysts, order_id }: {
    analysts: AnalystModelProps[]
    order_id: string
}) => {

    const [analystOptions, setAnalystOption] = useState(() => analysts.map(analyst => ({
        value: analyst._id,
        label: analyst.name + ', ' + analyst.title,
    })))

    const { data, setData, errors, patch, clearErrors, processing, transform, reset } = useForm<{
        pin: string
        analyst: {
            value: string
            label: string
        } | null
    }>({
        analyst: null,
        pin: '',
    })

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        clearErrors()
        patch(route('confirm.order', { order: order_id }), {
            onSuccess: () => {
                setIsOpen(false)
            }
        })
    }

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            reset()
            clearErrors()
        }
    }, [isOpen])

    return ({
        isOpen,
        setIsOpen,
        submitForm,
        errors,
        data,
        analystOptions,
        setData,
        processing,
    })
}

export default useConfirmOrderModal