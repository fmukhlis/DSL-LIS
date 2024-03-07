// Internal
import useTestDetailsTab from "../Hooks/useTestDetailsTab"
import PrimaryOutlineButton from "@/Components/PrimaryOutlineButton"
import {
    AccordionContent,
    AccordionItem,
    AccordionRoot,
    AccordionTrigger
} from "@/Components/Accordion"

// Radix UI
import { Pencil2Icon, UpdateIcon } from "@radix-ui/react-icons"
import InputResultDetailModal from "./InputResultDetailModal"
import { TestDetailsTabProps } from "@/Types/input-result"
import Alert from "@/Components/Alert"

const TestDetailsTab = ({ order, ...props }: TestDetailsTabProps) => {

    const {
        accordionValue,
        errors,
        setAccordionValue,
        getIsParameterValuesFilled,
        parameters
    } = useTestDetailsTab()

    return (
        <div {...props} className="flex flex-col text-sm px-5 pt-4 pb-5 gap-1.5 outline-none">
            <AccordionRoot
                type="multiple"
                value={accordionValue}
                className="flex flex-col gap-2"
                onValueChange={setAccordionValue}
            >
                {order.results.map((result) => {
                    return (
                        <AccordionItem
                            key={result._id}
                            value={result._id}
                            className="rounded relative bg-teal-200"
                        >
                            <AccordionTrigger className="px-4 py-2.5">
                                <span>{result.test?.name}</span>
                            </AccordionTrigger>
                            <InputResultDetailModal result={result}>
                                <button
                                    className="top-3 right-12 absolute border-0 bg-transparent text-teal-700 pb-0.5 pr-0.5 hover:text-teal-500 outline-none ring-offset-2 ring-teal-600 focus:ring-2 rounded"
                                >
                                    <Pencil2Icon />
                                </button>
                            </InputResultDetailModal>
                            <AccordionContent className="mx-2 mb-2 bg-teal-100 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                {Object.keys(errors).includes(result._id) &&
                                    <Alert className="mt-2 mx-2 !w-auto" formID={0} type="error" message="Please ensure you have provided valid values for all the required fields." />
                                }
                                {
                                    getIsParameterValuesFilled(result)
                                        ? (
                                            <div className="pt-2 pb-2.5 px-4 rounded text-sm flex flex-wrap gap-y-1 justify-between outline-none">
                                                {
                                                    result.parameterValues.map(
                                                        ({ parameter_id, ...parameterValue }) => {
                                                            console.log(parameterValue)
                                                            console.log(parameter_id)
                                                            const relatedParam = parameters.find(parameter => parameter._id === parameter_id)
                                                            return (
                                                                <div
                                                                    key={parameterValue._id.$oid}
                                                                    className="flex gap-3 items-center w-[33%]"
                                                                >
                                                                    <span className="w-28">{relatedParam?.name}</span>:
                                                                    <span className="font-bold">{parameterValue.value} {relatedParam?.units![0].name}</span>
                                                                    <PrimaryOutlineButton
                                                                        disabled={!(relatedParam?.units?.length ?? 1 > 1)}
                                                                        className="bg-transparent border-transparent rounded-full p-0.5 text-teal-700"
                                                                    >
                                                                        <UpdateIcon width={13} height={13} />
                                                                    </PrimaryOutlineButton>
                                                                </div>
                                                            )
                                                        }
                                                    )
                                                }
                                                {result.parameterValues.length % 3 === 2 && <div className="w-[33%]"></div>}
                                            </div>
                                        ) : (
                                            <div className="pt-2 pb-2.5 px-4 rounded text-sm flex flex-wrap gap-y-1 justify-between outline-none">
                                                No saved data.
                                            </div>
                                        )
                                }
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </AccordionRoot>
        </div >
    )
}

export default TestDetailsTab