import { FormEvent, useContext, useEffect, useState } from "react"

// Internal
import { MainContext } from "../Context/MainContext"
import { AnalystModelProps, OrderModelProps } from "@/Types"

const useSubmitModal = ({order} : {
    order: OrderModelProps,
}) => {
    const mainContext = useContext(MainContext)

    const [canSubmit, setCanSubmit] = useState(false)
    
    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        mainContext?.form.clearErrors()
        mainContext?.form.post(route('validate.result.detail', { order: order.registration_id }))
    }
    
    const resultsContainFeedback = () => {
        if (mainContext?.form.data.feedbacks){
            return Object.values(mainContext?.form.data.feedbacks).find(feedback => feedback.type === undefined) === undefined
        }
        
        return false
    }
    
    useEffect(() => {
        setCanSubmit(resultsContainFeedback())
    }, [mainContext?.form.data.feedbacks])

    return ({
        form: mainContext?.form!,
        canSubmit,
        submitForm,
    })
}

export default useSubmitModal