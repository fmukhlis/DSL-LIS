// Internal
import PrimaryOutlineAnchor from "@/Components/PrimaryOutlineAnchor"
import SubmitResultButton from "./SubmitResultButton"
import PatientInformation from "@/Components/PatientInformation"
import ChangeAnalystModal from "./ChangeAnalystModal"
import TestDetailsTab from "./TestDetailsTab"
import OrderDetailsTab from "./OrderDetailsTab"
import useInputResultDetailContent from "../Hooks/useInputResultDetailContent"

// Radix UI
import * as PrimitivesTabs from '@radix-ui/react-tabs'
import { ArrowLeftIcon, CheckCircledIcon, UpdateIcon } from "@radix-ui/react-icons"
import SecondaryButton from "@/Components/SecondaryButton"
import { Toast } from "@/Components/Toast"
import { useEffect, useState } from "react"
import { animated, useTransition } from "@react-spring/web"

const dateConfig: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
}

const InputResultDetailContent = () => {

    const {
        AnimatedTabContent,
        flash,
        open,
        order,
        setOpen,
        setTabValue,
        slide,
        tabValue
    } = useInputResultDetailContent()

    return (
        <div className="flex flex-col py-3 gap-3">
            <div className="max-w-6xl w-full mx-auto flex justify-between">
                <PrimaryOutlineAnchor
                    className="px-3 py-2 flex items-center gap-2"
                    href={route('input.result')}
                >
                    <ArrowLeftIcon /> Back
                </PrimaryOutlineAnchor>
                <SubmitResultButton />
            </div>

            <PatientInformation order={order} />

            <div className="flex max-w-6xl w-full mx-auto text-sm px-2.5 items-center justify-between text-gray-500">
                <div className="flex gap-3 items-center">
                    <span>Analyst in Charge :</span>
                    <span className="font-bold">{order.analyst?.name}, {order.analyst?.title}</span>
                    <ChangeAnalystModal>
                        <SecondaryButton className="bg-transparent border-transparent p-0.5 rounded-[100px]">
                            <UpdateIcon />
                        </SecondaryButton>
                    </ChangeAnalystModal>
                </div>
                <div className="flex gap-3">
                    <span>Confirmed at :</span>
                    <span className="font-bold">{new Date(order.confirmed_at!).toLocaleDateString('en-GB', dateConfig)}</span>
                </div>
            </div>

            <div className="pt-0 max-w-6xl w-full mx-auto h-[550px] text-teal-800 relative">
                <PrimitivesTabs.Root
                    className="overflow-hidden bg-teal-100 rounded"
                    value={tabValue}
                    onValueChange={setTabValue}
                >
                    <PrimitivesTabs.List
                        className="flex border-b-2 border-teal-600 overflow-hidden items-center"
                        aria-label="View details"
                    >
                        <PrimitivesTabs.Trigger
                            className="
                                    px-5 pt-3 pb-2.5 duration-150 border-0 border-teal-600 
                                    rounded-ss rounded-se transition-colors 
                                    data-[state=active]:border-b-2 data-[state=active]:font-bold hover:bg-teal-100 
                                "
                            value="test-details"
                        >
                            Test Details
                        </PrimitivesTabs.Trigger>
                        <PrimitivesTabs.Trigger
                            className="
                                    px-5 pt-3 pb-2.5 duration-150 border-0 border-teal-600 
                                    rounded-ss rounded-se transition-colors 
                                    data-[state=active]:border-b-2 data-[state=active]:font-bold hover:bg-teal-100 
                                "
                            value="order-details"
                        >
                            Order Details
                        </PrimitivesTabs.Trigger>
                    </PrimitivesTabs.List>
                    {slide((style, item) => {
                        return (
                            item === 'test-details'
                                ?
                                <AnimatedTabContent forceMount style={style} className="outline-none overflow-hidden" value="test-details">
                                    <TestDetailsTab order={order} />
                                </AnimatedTabContent>
                                :
                                <AnimatedTabContent forceMount style={style} className="outline-none overflow-hidden" value="order-details">
                                    <OrderDetailsTab order={order} />
                                </AnimatedTabContent>
                        )
                    })}
                </PrimitivesTabs.Root>
            </div>
            <Toast
                open={open}
                onOpenChange={setOpen}
                duration={3000}
                title='Success!'
                icon={<CheckCircledIcon width={20} height={20} />}
            >
                <div className="text-sm">
                    {flash.toastMsg}
                </div>
            </Toast>
        </div>
    )
}

export default InputResultDetailContent