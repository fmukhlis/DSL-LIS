import { FormEvent, Fragment, useEffect, useState } from "react"

// Inertia JS
import { Head, useForm } from "@inertiajs/react"

// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import PrimaryOutlineAnchor from "@/Components/PrimaryOutlineAnchor"
import ChangeAnalystModal from "./ChangeAnalystModal"
import Checkbox from "@/Components/Checkbox"
import PrimaryButton from "@/Components/PrimaryButton"
import PrimaryOutlineButton from "@/Components/PrimaryOutlineButton"
import InputResultModal from "./InputResultDetailModal"
import { AnalystModelProps, OrderModelProps, ResultModelProps, SingleOrderProps } from "@/Types"
import {
    AccordionItem,
    AccordionRoot,
    AccordionContent,
    AccordionTrigger,
} from "@/Components/Accordion"

// Radix UI
import * as PrimitivesTabs from '@radix-ui/react-tabs'
import { ArrowLeftIcon, DoubleArrowDownIcon, DoubleArrowUpIcon, Pencil2Icon, ReloadIcon, UpdateIcon } from "@radix-ui/react-icons"

const InputResultDetail = ({ order, analysts }: {
    order: OrderModelProps,
    analysts: AnalystModelProps[]
}) => {

    const [accordionValue, setAccordionValue] = useState<string[]>([])

    const dateConfig: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }

    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        if (order.results.length > 1) {
            setAccordionValue(
                order.results.filter(result => (
                    result.parameterValues.find(parameterValue => parameterValue.value === 0) === undefined)
                ).map(result => result._id)
            )
        }
    }, [order.results])

    const { post, processing } = useForm()

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        post(route('input.result.proceed', { order: order.registration_id }))
    }

    const resultAccordionContent = (result: ResultModelProps) => {
        if (result.parameterValues.find(parameterValue => parameterValue.value === 0) !== undefined) {
            return (
                <div className="pt-2 pb-2.5 px-4 rounded text-sm flex flex-wrap gap-y-1 justify-between outline-none">
                    No saved data.
                </div>
            )
        }

        return (
            <div className="pt-2 pb-2.5 px-4 rounded text-sm flex flex-wrap gap-y-1 justify-between outline-none">
                {
                    result.parameterValues.map(({ parameter_id, ...parameterValue }) => {
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
                                    className="bg-transparent border-0 rounded-[50px] p-0.5 text-teal-700"
                                >
                                    <UpdateIcon width={13} height={13} />
                                </PrimaryOutlineButton>
                            </div>
                        )
                    })
                }
                {result.parameterValues.length % 3 === 2 && <div className="w-[33%]"></div>}
            </div>
        )
    }

    return (
        <AuthenticatedLayout>
            <Head title="Input Result Detail" />
            <div className="flex flex-col py-3 gap-3">
                <div className="max-w-6xl w-full mx-auto flex justify-between">
                    <PrimaryOutlineAnchor
                        className="px-3 py-2 flex items-center gap-2"
                        href={route('input.result')}
                    >
                        <ArrowLeftIcon /> Back
                    </PrimaryOutlineAnchor>
                    <form onSubmit={submitForm}>
                        <PrimaryOutlineButton
                            className="px-3 py-2 flex items-center gap-2"
                            disabled={order.results.find(result => (
                                result.parameterValues.find(parameterValue => parameterValue.value === 0) !== undefined
                            )) !== undefined}
                        >
                            Proceed
                        </PrimaryOutlineButton>
                    </form>
                </div>

                <div className="py-3 max-w-6xl w-full mx-auto bg-teal-200 text-teal-800 rounded relative">
                    <div className={`${!isShow && "max-h-[5.3rem]"} overflow-hidden`}>
                        <div className="flex flex-col">
                            <h2 className="px-5 font-bold border-b-2 border-teal-600 pb-2.5 mb-2">Patient Details</h2>
                        </div>
                        <div className="flex text-sm px-5 gap-5">
                            <div className="flex flex-col gap-1.5 w-1/5">
                                <div className="flex flex-col">
                                    <span className="font-bold">Name: </span>
                                    <span className="text-teal-700">{order.patient!.name}</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-bold">Place of Birth: </span>
                                    <span className="text-teal-700">Pekalongan</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-bold">Date of Birth: </span>
                                    <span className="text-teal-700">05 Feb 2001</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 w-1/5">
                                <div className="flex flex-col">
                                    <span className="font-bold">Identity Number: </span>
                                    <span className="text-teal-700">1234567890</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-bold">Gender: </span>
                                    <span className="text-teal-700">Male</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-bold">Job: </span>
                                    <span className="text-teal-700">Student</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 w-1/5">
                                <div className="flex flex-col">
                                    <span className="font-bold">Mother's Name: </span>
                                    <span className="text-teal-700">Fulanah binti Fulan</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-bold">Religion: </span>
                                    <span className="text-teal-700">Islam</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-bold">Marriage Status: </span>
                                    <span className="text-teal-700">Single</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 justify-between ml-auto w-fit max-w-[40%]">
                                <div className="flex flex-col">
                                    <span className="font-bold">Address: </span>
                                    <span className="text-teal-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, vitae!</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-bold">Contact: </span>
                                    {
                                        order.patient!.contacts.map(contact => (
                                            <span
                                                key={contact._id}
                                                className="text-teal-700"
                                            >
                                                {contact.contact} ({contact.type})
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {!isShow &&
                        <div className="w-full h-1/3 absolute bottom-0 bg-gradient-to-b from-transparent to-teal-200"></div>
                    }
                    <button
                        className="left-1/2 -translate-x-1/2 bg-teal-100 shadow px-5 py-1 rounded-sm absolute -bottom-3 animate-bounce"
                        onClick={() => { setIsShow(is => !is) }}
                    >
                        {
                            !isShow
                                ? <DoubleArrowDownIcon />
                                : <DoubleArrowUpIcon />
                        }
                    </button>
                </div>

                <div className="flex max-w-6xl w-full mx-auto text-sm px-2.5 items-center justify-between text-gray-500">
                    <div className="flex gap-3 items-center">
                        <span>Confirming Analyst :</span>
                        <span className="font-bold">{order.analyst!.name}, {order.analyst!.title}</span>
                        <ChangeAnalystModal order_id={order.registration_id} analysts={analysts} />
                    </div>
                    <div className="flex gap-3">
                        <span>Confirmed at :</span>
                        <span className="font-bold">{new Date(order.confirmed_at!).toLocaleDateString('en-GB', dateConfig)}</span>

                    </div>
                </div>

                <div className="pt-0 max-w-6xl w-full mx-auto bg-teal-200 text-teal-800 rounded relative">
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
                            <div className="flex flex-col text-sm px-5 pt-4 pb-5 gap-1.5 outline-none">
                                <AccordionRoot
                                    type="multiple"
                                    value={accordionValue}
                                    className="flex flex-col gap-2"
                                    onValueChange={newValue => {
                                        setAccordionValue(newValue)
                                    }}
                                >
                                    {order.results.map(result => (
                                        <AccordionItem
                                            key={result._id}
                                            value={result._id}
                                            className="rounded relative"
                                        >
                                            <AccordionTrigger className="px-4 py-2.5">
                                                <span>{result.test!.name}</span>
                                            </AccordionTrigger>
                                            <InputResultModal result={result} order_id={order.registration_id} />
                                            <AccordionContent className="border-t-2 border-teal-600">
                                                {resultAccordionContent(result)}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </AccordionRoot>
                            </div>
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
    )
}

export default InputResultDetail