import { ReactNode, createContext } from "react";

// Inertia JS
import { useForm } from "@inertiajs/react";

// Internal
import { AnalystModelProps, OrderModelProps } from "@/Types";
import { InputResultDetailContext, InputResultDetailPage } from "@/Types/input-result";

const InputResultDetailsContext = createContext<InputResultDetailContext | null>(null)

const InputResultDetailsContextProvider = ({
    analysts,
    children,
    order,
    parameters,
}: InputResultDetailPage & { children: ReactNode }) => {

    const submitForm = useForm()

    const context = {
        analysts,
        order,
        parameters,
        submitForm
    }

    return (
        <InputResultDetailsContext.Provider value={context}>
            {children}
        </InputResultDetailsContext.Provider>
    )
}

export { InputResultDetailsContext, InputResultDetailsContextProvider }