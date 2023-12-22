// Internal
import FeedbackPopover from "./FeedbackPopover"
import useTestDetailsTab from "../Hooks/useTestDetailsTab"
import { TestDetailsTabProps } from "@/Types/validate-result"
import PrimaryOutlineButton from "@/Components/PrimaryOutlineButton"
import {
    AccordionContent,
    AccordionItem,
    AccordionRoot,
    AccordionTrigger
} from "@/Components/Accordion"

// Radix UI
import { UpdateIcon } from "@radix-ui/react-icons"

const TestDetailsTab = ({ results, ...props }: TestDetailsTabProps) => {

    const { accordionValue, setAccordionValue, parameterValuesFilled, feedbacks } = useTestDetailsTab()

    return (
        <div {...props} className="flex flex-col text-sm px-5 pt-4 pb-5 gap-1.5 outline-none">
            <AccordionRoot
                type="multiple"
                value={accordionValue}
                className="flex flex-col gap-2"
                onValueChange={setAccordionValue}
            >
                {results.map((result, index) => {
                    return (
                        <AccordionItem
                            key={result._id}
                            value={result._id}
                            className="rounded relative bg-teal-200"
                        >
                            <AccordionTrigger className="px-4 py-2.5">
                                <span>{result.test!.name}</span>
                            </AccordionTrigger>
                            <FeedbackPopover
                                defaultState={{ [result._id]: feedbacks[result._id] }}
                                className="top-2.5 right-11 absolute"
                            />
                            {/* <InputResultModal result={result} order_id={order.registration_id} /> */}
                            <AccordionContent className="mx-2 mb-2 bg-teal-100">
                                {
                                    parameterValuesFilled(result)
                                        ? (
                                            <div className="pt-2 pb-2.5 px-4 rounded text-sm flex flex-wrap gap-y-1 justify-between outline-none">
                                                {
                                                    result.parameterValues.map(
                                                        ({ parameter_id, ...parameterValue }) => {
                                                            const relatedParam = result.test!.parameters!.find(parameter => parameter._id === parameter_id)
                                                            return (
                                                                <div
                                                                    key={parameterValue._id.$oid}
                                                                    className="flex gap-3 items-center w-[33%]"
                                                                >
                                                                    <span className="w-28">{relatedParam!.name}</span>:
                                                                    <span className="font-bold">{parameterValue.value} {relatedParam!.units![0].name}</span>
                                                                    <PrimaryOutlineButton
                                                                        disabled={!(relatedParam!.units!.length > 1)}
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