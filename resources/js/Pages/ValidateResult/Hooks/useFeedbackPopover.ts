import { useContext, useEffect, useState } from "react"

// Internal
import { MainContext } from "../Context/MainContext"
import { FeedbackProps } from "@/Types/validate-result"

const useFeedbackPopover = (defaultState: FeedbackProps) => {
    
    const mainContext = useContext(MainContext)

    const [currentState, setCurrentState] = useState(defaultState)
    const id = useState(Object.keys(defaultState)[0])[0]

    const setType = (type : FeedbackProps[string]['type']) => {
        setCurrentState(cs => ({
            [id]: {
                ...cs[id],
                type: type,
            },
        }))
    } 
    
    const setComment = (comment : FeedbackProps[string]['comment']) => {
        setCurrentState(cs => ({
            [id]: {
                ...cs[id],
                comment: comment,
            },
        }))
    }

    const [open, setOpen] = useState(false)

    const saveFeedback = () => {
        if (currentState[id].type) {
            mainContext?.form.setData(data => ({
                ...data,
                feedbacks: {
                    ...data.feedbacks,
                    [id]: {
                        type: currentState[id].type,
                        comment: currentState[id].comment,
                    }
                },
            }))
        }
        setOpen(false)
    }

    useEffect(() => {
        if (!open) {
            setCurrentState({
                [id]: {
                    type: defaultState[id].type,
                    comment: defaultState[id].comment,
                },
            })
        }
    }, [open])
    
    return ({
        id,
        open, 
        setOpen,
        setType,
        setComment,
        currentState,
        saveFeedback,
    })
}

export default useFeedbackPopover