
// Internal
import { OrderModelProps } from "@/Types"
import usePatientInformation from "../Hooks/usePatientInformation"

// Radix UI
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons"

const PatientInformation = ({ order }: { order: OrderModelProps }) => {

    const { isShow, toggleIsShow } = usePatientInformation()

    return (
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
                onClick={toggleIsShow}
            >
                {
                    !isShow
                        ? <DoubleArrowDownIcon />
                        : <DoubleArrowUpIcon />
                }
            </button>
        </div>
    )
}

export default PatientInformation