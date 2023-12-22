import { ResultModelProps } from "@/Types"
import { useContext, useState } from "react"
import { MainContext } from "../Context/MainContext"

const useTestDetailsTab = () => {

    const mainContext = useContext(MainContext)

    const [accordionValue, setAccordionValue] = useState<string[]>([])
    const parameterValuesFilled = (result: ResultModelProps) => (
        result.parameterValues.find(parameterValue => parameterValue.value === 0) === undefined
    )
    
    return ({
        feedbacks: mainContext?.form.data.feedbacks!,
        accordionValue,
        setAccordionValue,
        parameterValuesFilled,
    })
}

export default useTestDetailsTab