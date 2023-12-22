import { FormEvent, useContext, useEffect, useState } from "react"

// Internal
import { AnalystModelProps } from "@/Types"
import { MainContext } from "../Context/MainContext"

// Inertia JS
import { useForm } from "@inertiajs/react"

const useChangeAnalystModal = (analysts :AnalystModelProps[], order_id: string) => {
    
    const mainContext = useContext(MainContext)

    const [analystOptions, setAnalystOption] = useState(
        () => (
            analysts.map(
                analyst => ({
                    value: analyst._id,
                    label: `${analyst.name}${analyst.title ? `, ${analyst.title}` : ''}`,
                })
            )
        )
    )
    
    const { data, setData, errors, post, clearErrors, processing, transform, reset } = useForm<{
        pin: string
        analyst: {
            value: string
            label: string
        } | string | null
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
        post(route('order.detail', { order: order_id }), {
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
        data,
        errors,
        isOpen, 
        setData, 
        setIsOpen,
        processing,
        submitForm,
        analystOptions,
    })
}

export default useChangeAnalystModal