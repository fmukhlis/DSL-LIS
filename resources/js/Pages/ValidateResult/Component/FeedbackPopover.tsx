import { ComponentPropsWithRef, ComponentPropsWithoutRef, forwardRef, useEffect, useImperativeHandle, useState } from "react"

// Internal
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover"
import PrimaryButton from "@/Components/PrimaryButton"
import { RadioGroup, RadioIndicator, RadioItem } from "@/Components/RadioGroup"
import SecondaryButton from "@/Components/SecondaryButton"
import Textarea from "@/Components/Textarea"
import { FeedbackProps } from "@/Types/validate-result"
import useFeedbackPopover from "../Hooks/useFeedbackPopover"

// Radix UI
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons"

const FeedbackPopover = ({ defaultState, ...props }: { defaultState: FeedbackProps } & ComponentPropsWithoutRef<'div'>) => {
    const {
        id,
        open,
        setOpen,
        setType,
        setComment,
        currentState,
        saveFeedback,
    } = useFeedbackPopover(defaultState)

    return (
        <div {...props}>
            <Popover
                open={open}
                onOpenChange={(open) => { setOpen(open) }}
            >
                <PopoverTrigger
                    className="flex items-center gap-1 rounded-sm pr-1.5 pl-0.5 py-0.5 text-xs font-bold duration-150
                        bg-teal-300 text-teal-600 outline-none ring-offset-2 ring-teal-600 focus:ring-2 hover:bg-teal-100
                        data-[state=open]:bg-teal-100"
                    aria-label="Coordinator response"
                >
                    {
                        defaultState[id].type
                            ? defaultState[id].type === 'approve'
                                ? (
                                    <>
                                        <CheckIcon /> Approved
                                    </>
                                ) : (
                                    <>
                                        <Cross2Icon /> Not Approved
                                    </>
                                )
                            : (
                                <span className="ml-1">
                                    No feedback
                                </span>
                            )
                    }
                </PopoverTrigger>
                <PopoverContent
                    className="z-10 text-sm rounded py-4 w-[450px] bg-teal-100 shadow-md text-teal-700"
                >
                    <div className="flex flex-col gap-2.5">
                        <div className="font-bold pb-4 uppercase border-b border-teal-300 px-4">Feedback</div>
                        <Textarea
                            rows={3}
                            value={currentState[id].comment}
                            placeholder="Write a comment..."
                            className="text-[0.8rem] resize-none mx-4"
                            onChange={(e) => {
                                setComment(e.target.value)
                            }}
                        />
                        <RadioGroup
                            value={currentState[id].type}
                            className="gap-2 flex-col px-4"
                            onValueChange={(value: 'approve' | 'disapprove') => {
                                setType(value)
                            }}
                        >
                            <div className="flex gap-2">
                                <RadioItem
                                    id="approve"
                                    value="approve"
                                    className="w-4 h-4 mt-[0.18rem]"
                                >
                                    <RadioIndicator className="after:w-2 after:h-2" />
                                </RadioItem>
                                <label htmlFor="approve" className="flex flex-col">
                                    <div className="font-bold">Approve</div>
                                    <div>Submit feedback and approve test results.</div>
                                </label>
                            </div>
                            <div className="flex gap-2">
                                <RadioItem
                                    id="disapprove"
                                    value="disapprove"
                                    className="w-4 h-4 mt-[0.18rem]"
                                >
                                    <RadioIndicator className="after:w-2 after:h-2" />
                                </RadioItem>

                                <label htmlFor="disapprove" className="flex flex-col">
                                    <div className="font-bold">Request Changes</div>
                                    <div>Submit feedback that must be addressed.</div>
                                </label>
                            </div>
                        </RadioGroup>
                        <div className="flex justify-end gap-2 border-t border-teal-300 pt-3.5 px-4">
                            <SecondaryButton
                                className="px-2 py-1"
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton
                                className="px-2 py-1"
                                onClick={saveFeedback}
                                disabled={!currentState[id].type}
                            >
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default FeedbackPopover