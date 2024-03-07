import { ResultModelProps } from "@/Types"
import { useContext, useEffect, useState } from "react"
import { InputResultDetailsContext } from "../Contexts/InputResultDetailsContext"

const useTestDetailsTab = () => {

    const { order, submitForm, parameters } = useContext(InputResultDetailsContext)!
    const [accordionValue, setAccordionValue] = useState<string[]>([])

    const getIsParameterValuesFilled = (result: ResultModelProps) => (
        result.parameterValues.find(parameterValue => parameterValue.value === 0) === undefined
    )

    useEffect(() => {
        setAccordionValue(order.results.map(result => result._id))
    }, [order.results])

    useEffect(() => {
        if (submitForm.hasErrors) {
            setAccordionValue(prev => {
                const current = new Set([...prev, ...Object.keys(submitForm.errors)])
                return Array.from(current)
            })
        }
    }, [submitForm.hasErrors])


    return ({
        accordionValue,
        errors: submitForm.errors,
        getIsParameterValuesFilled,
        parameters,
        setAccordionValue,
    })
}

export default useTestDetailsTab