import {
    useState,
    useRef,
    ReactNode,
    createContext,
    useEffect,
} from "react"

// Inertia JS
import { useForm } from "@inertiajs/react"

// Internal
import { AnalystModelProps, OrderModelProps } from "@/Types"
import {
    MainContextProps,
    FormDataProps
} from "@/Types/validate-result"

const MainContext = createContext<MainContextProps | null>(null)

const MainContextProvider = ({ children, analyst, order, analysts }: {
    children: ReactNode
    analyst: AnalystModelProps
    order: OrderModelProps
    analysts: AnalystModelProps[]
}) => {

    const form = useForm<FormDataProps>({
        pin: '',
        feedbacks: order.results.reduce((accumulator: Record<string, any>, result) => {
            accumulator[result._id] = { type: result.feedback_type, comment: result.feedback_comment }
            return accumulator
        }, {}),
    })

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

    const context = {
        form,
        analystOptions,
    }

    return (
        <MainContext.Provider value={context} >
            {children}
        </MainContext.Provider>
    )
}

export { MainContextProvider, MainContext }