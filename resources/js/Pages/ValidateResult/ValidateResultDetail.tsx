import { Fragment } from "react"

// Inertia JS
import { Head } from "@inertiajs/react"

// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import PrimaryOutlineAnchor from "@/Components/PrimaryOutlineAnchor"
import ChangeAnalystModal from "./Component/ChangeAnalystModal"
import { AnalystModelProps, OrderModelProps } from "@/Types"
import PatientInformation from "./Component/PatientInformation"
import { MainContextProvider } from "./Context/MainContext"
import TestDetailsTab from "./Component/TestDetailsTab"
import SubmitModal from "./Component/SubmitModal"

// Radix UI
import * as PrimitivesTabs from '@radix-ui/react-tabs'
import { ArrowLeftIcon } from "@radix-ui/react-icons"


const dateConfig: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
}

const ValidateResultDetail = ({ order, analysts }: {
    order: OrderModelProps,
    analysts: AnalystModelProps[]
}) => {
    return (
        <MainContextProvider order={order} analyst={order.analyst!} analysts={analysts} >
            <AuthenticatedLayout>
                <Head title="Validate Result Detail" />
                <div className="flex flex-col py-3 gap-3">
                    <div className="max-w-6xl w-full mx-auto flex justify-between">
                        <PrimaryOutlineAnchor
                            className="px-3 py-2 flex items-center gap-2"
                            href={route('validate.result')}
                        >
                            <ArrowLeftIcon /> Back
                        </PrimaryOutlineAnchor>
                        <SubmitModal order={order} />
                    </div>

                    <PatientInformation order={order} />

                    <div className="flex max-w-6xl w-full mx-auto text-sm px-2.5 items-center justify-between text-gray-500">
                        <div className="flex gap-2 items-center">
                            <span>Analyst in Charge :</span>
                            <span className="font-bold">{order.analyst!.name}, {order.analyst!.title}</span>
                            <ChangeAnalystModal order_id={order.registration_id} analysts={analysts} />
                        </div>
                        <div className="flex gap-3">
                            <span>Inputted at :</span>
                            <span className="font-bold">{new Date(order.inputted_at!).toLocaleDateString('en-GB', dateConfig)}</span>

                        </div>
                    </div>

                    <div className="pt-0 max-w-6xl w-full mx-auto bg-teal-100 text-teal-800 rounded relative">
                        <PrimitivesTabs.Root
                            defaultValue="test-details"
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
                            <PrimitivesTabs.Content className="outline-none" value="test-details">
                                <TestDetailsTab results={order.results} />
                            </PrimitivesTabs.Content>
                            <PrimitivesTabs.Content className="outline-none" value="order-details">
                                <div className="flex flex-col text-sm px-5 pt-4 pb-5 gap-1.5 outline-none">
                                    <div className="flex">
                                        <span className="mr-3 w-36">Referring Physician: </span>
                                        <span className="font-bold">
                                            Dr. {order.doctor!.name}
                                            {order.doctor!.specializations!.map(specialization => (
                                                <Fragment key={specialization._id}>, {specialization.title}</Fragment>
                                            ))}
                                        </span>
                                        <div className="flex gap-1 items-center ml-auto font-bold text-teal-600">
                                            {new Date(order.created_at).toLocaleDateString('en-GB', dateConfig)}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <span className="mr-3 w-36">Clinical Department: </span>
                                        <span className="font-bold">{order.doctor!.department!.name}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold items-center flex justify-between mt-2 mb-1">
                                            <span>Test Detail</span>
                                            {
                                                order.is_cito && (
                                                    <span
                                                        className="text-xs tracking-widest text-teal-50 bg-teal-600 px-2 py-0.5 rounded"
                                                    >
                                                        CITO
                                                    </span>
                                                )
                                            }
                                        </h3>
                                        {order.results.map(result => (
                                            <div
                                                key={result._id}
                                                className="flex items-end gap-3"
                                            >
                                                <span className="min-w-fit">{result.test!.name}</span>
                                                <span className="w-full border border-teal-500 h-0 border-dashed mb-1"></span>
                                                <span className="min-w-fit text-end">{result.test!.price.toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                    maximumFractionDigits: 0,
                                                })}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex">
                                            <span className="mr-3 w-36">Payment Method: </span>
                                            <span className="font-bold">{order.payment_method}</span>
                                        </div>
                                        <div className="flex items-end justify-between">
                                            <div className="font-bold text-lg">
                                                Total <span>{order.total_price.toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                    maximumFractionDigits: 0,
                                                })}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-bold items-center flex justify-between">
                                            <span># Note</span>
                                        </h3>
                                        <div className="bg-teal-300 px-2.5 py-1">
                                            {order.note ? `"${order.note}"` : '-'}
                                        </div>
                                    </div>
                                </div>
                            </PrimitivesTabs.Content>
                        </PrimitivesTabs.Root>
                    </div>
                </div>
            </AuthenticatedLayout>
        </MainContextProvider>
    )
}

export default ValidateResultDetail