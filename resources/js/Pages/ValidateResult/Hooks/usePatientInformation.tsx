import { useEffect, useState } from "react"

// React Spring
import { useSpring, useTransition } from "@react-spring/web"

const usePatientInformation = () => {

    const [isShow, setIsShow] = useState(false)
    const [expand, springAPI] = useSpring(() => ({
        from: {
            maxHeight: '5.3rem',
        },
        config: {
            friction: 23,
        }
    }))
    const [fade, fadeAPI] = useTransition([isShow], () => ({
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        }
    }))

    const toggleIsShow = () => {
        setIsShow(is => !is)
    }

    useEffect(() => {
        springAPI.start({
            maxHeight: isShow ? '11rem' : '5.3rem',
        })
        fadeAPI.start()
    }, [isShow])

    return ({
        fade,
        expand,
        isShow,
        toggleIsShow,
    })
}

export default usePatientInformation