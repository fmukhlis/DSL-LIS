import { Fragment, useState } from "react"

// Internal
import PrimaryOutlineButton from "@/Components/PrimaryOutlineButton"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import PrimaryAnchor from "@/Components/PrimaryAnchor"

// Inertia JS
import { Head } from "@inertiajs/react"
import { ArrowLeftIcon, DotFilledIcon, DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons"
import ConfirmOrderModal from "./ConfirmOrderModal"
import PrimaryOutlineAnchor from "@/Components/PrimaryOutlineAnchor"

const ConfirmOrder = ({ order, analysts }: {
    order: {
        registration_id: string
        patient: {
            name: string
            contacts: {
                _id: string
                contact: string
                type: string
            }[]
        }
        doctor: {
            name: string,
            specializations: {
                _id: string
                title: string
            }[],
            department: {
                name: string
            }
        }
        created_at: string
        is_cito: boolean
        payment_method: string
        note: string
        total_price: number
        tests: {
            _id: string
            name: string
            price: number
        }[]
    }
    analysts: {
        _id: string
        name: string
    }[]
}) => {

    const dateConfig: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }

    const [isShow, setIsShow] = useState(false)

    return (
        <AuthenticatedLayout>
            <Head title="Order Details" />
            <div className="flex flex-col py-3 gap-3">
                <div className="max-w-6xl w-full mx-auto flex justify-between">
                    <PrimaryOutlineAnchor
                        className="px-3 py-1.5 flex items-center gap-2"
                        href={route('order.test')}
                    >
                        <ArrowLeftIcon /> Back
                    </PrimaryOutlineAnchor>

                    <ConfirmOrderModal
                        order_id={order.registration_id}
                        analysts={analysts}
                    />
                </div>

                <div className="py-3 max-w-6xl w-full mx-auto bg-teal-200 text-teal-800 rounded relative">
                    <div className={`${!isShow && "max-h-[5.3rem]"} overflow-hidden`}>
                        <div className="flex flex-col">
                            <h2 className="px-5 font-bold border-b-2 border-teal-600 pb-2 mb-2">Patient Details</h2>
                        </div>
                        <div className="flex text-sm px-5 gap-5">
                            <div className="flex flex-col gap-1.5 w-1/5">
                                <div className="flex flex-col">
                                    <span className="font-bold">Name: </span>
                                    <span className="text-teal-700">{order.patient.name}</span>
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
                                        order.patient.contacts.map(contact => (
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

                <div className="py-3 max-w-6xl w-full mx-auto bg-teal-200 text-teal-800 rounded flex flex-col gap-1">
                    <div className="flex flex-col">
                        <h2 className="px-5 font-bold border-b-2 border-teal-600 pb-2 mb-2">Order Details</h2>
                    </div>
                    <div className="flex flex-col justify-between text-sm px-5 gap-1.5">
                        <div className="flex">
                            <span className="mr-3 w-36">Referring Physician: </span>
                            <span className="font-bold">
                                Dr. {order.doctor.name}
                                {order.doctor.specializations.map(specialization => (
                                    <Fragment key={specialization._id}>, {specialization.title}</Fragment>
                                ))}
                            </span>
                            <div className="flex gap-1 items-center ml-auto font-bold text-teal-600">
                                {new Date(order.created_at).toLocaleDateString('en-GB', dateConfig)}
                            </div>
                        </div>
                        <div className="flex">
                            <span className="mr-3 w-36">Clinical Department: </span>
                            <span className="font-bold">{order.doctor.department.name}</span>
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
                            {order.tests.map(test => (
                                <div
                                    key={test._id}
                                    className="flex items-end gap-3"
                                >
                                    <span className="min-w-fit">{test.name}</span>
                                    <span className="w-full border border-teal-500 h-0 border-dashed mb-1"></span>
                                    <span className="min-w-fit text-end">{test.price.toLocaleString('id-ID', {
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
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default ConfirmOrder