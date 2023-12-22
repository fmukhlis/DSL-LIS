import { ComponentPropsWithRef, ComponentPropsWithoutRef, Dispatch, MutableRefObject, SetStateAction } from "react"

// Inertia JS
import { useForm } from "@inertiajs/react"

// Internal
import { AnalystModelProps, ResultModelProps } from "."

export interface FormDataProps {
    pin: string
    feedbacks: FeedbackProps
}

export interface MainContextProps {
    form: ReturnType<typeof useForm<FormDataProps>>
    analystOptions: {
        value: string
        label: string
    }[]
}

export interface TestDetailsTabProps extends Omit<ComponentPropsWithoutRef<'div'>, 'results'> {
    results: ResultModelProps[]
}

export interface FeedbackProps {
    [key: string]: {
        type?: 'approve' | 'disapprove'
        comment?: string
    }
}

export interface ValidateResultDetailContextProps {
    canSubmit: boolean
    setCanSubmit: Dispatch<SetStateAction<boolean>>
}
// isShow: boolean
// setIsShow: Dispatch<SetStateAction<boolean>>
// accordionValue: string[]
// setAccordionValue: Dispatch<SetStateAction<string[]>>