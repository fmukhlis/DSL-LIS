import { InputResultPage } from "@/Types/input-result";
import { ReactNode, createContext } from "react";

const InputResultContext = createContext<InputResultPage | null>(null)

const InputResultContextProvider = ({
    can,
    confirmedOrders,
    children
}: InputResultPage & { children: ReactNode }) => {

    const context = {
        can,
        confirmedOrders,
    }

    return (
        <InputResultContext.Provider value={context}>
            {children}
        </InputResultContext.Provider>
    )
}

export { InputResultContext, InputResultContextProvider }