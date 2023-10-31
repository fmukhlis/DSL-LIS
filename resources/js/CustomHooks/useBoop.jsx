import { 
    useState, 
    useEffect, 
    useCallback,
} from "react"

// React Spring
import { useSpring } from "@react-spring/web"

export default function useBoop(
    isActive = true,
    scaleRatio = 1.1,
    animTime = 150,
    springConfig = {
        tension: 300,
        friction: 15,
    },
) {
    const [ isBoop, setIsBoop ] = useState(false)
    
    useEffect(() => {

        if (!isBoop) {
            return
        }

        const timeOutID = setTimeout(() => {
            setIsBoop(false)
        }, animTime)

        return () => {
            clearTimeout(timeOutID)
        }

    }, [isBoop])

    const startAnimation = useCallback(() => {
        setIsBoop(true)
    }, [])

    const springVal = useSpring({
        display: 'inline-block',
        backfaceVisibility: 'hidden',
        transform: isBoop 
            ? `scale(${scaleRatio})`
            : `scale(1.0)`,
        config: springConfig
    })

    return [isActive ? springVal : {}, startAnimation]
}