import { useState } from "react"

const usePatientInformation = () => {
    
    const [isShow, setIsShow] = useState(false)

    const toggleIsShow = () => {
        setIsShow(is => !is)
    }

    return ({
        isShow,
        toggleIsShow,
    })
}

export default usePatientInformation