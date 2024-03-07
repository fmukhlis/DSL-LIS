// Internal
import { OrderModelProps } from "@/Types"
import usePatientInformation from "../Pages/ValidateResult/Hooks/usePatientInformation"

// Radix UI
import { DoubleArrowDownIcon } from "@radix-ui/react-icons"

// React Spring
import { animated } from "@react-spring/web"

const PatientInformation = ({ order, ...props }: { order: OrderModelProps }) => {

    const { fade, expand, isShow, toggleIsShow } = usePatientInformation()

    return (
        <div {...props} className="py-3 max-w-6xl w-full mx-auto bg-teal-100 text-teal-800 rounded relative">
            <animated.div style={expand} className={`overflow-hidden`}>
                <div className="flex flex-col">
                    <h2 className="px-5 font-bold border-b-2 border-teal-600 pb-2.5 mb-2">Patient Details</h2>
                </div>
                <div className="flex text-sm px-5 gap-5">
                    <div className="flex flex-col gap-1.5 w-1/5">
                        <div className="flex flex-col">
                            <span className="font-bold">Name: </span>
                            <span className="text-teal-700">{order.patient?.name}</span>
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
                            {order.patient?.contacts.map(contact => (
                                <span
                                    key={contact._id}
                                    className="text-teal-700"
                                >
                                    {contact.contact} ({contact.type})
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </animated.div>

            {fade((style, item) => {
                return (
                    !item &&
                    <animated.div
                        style={style}
                        className="w-full h-1/3 absolute bottom-0 bg-gradient-to-b from-transparent to-teal-100"
                    ></animated.div>
                )
            })}
            <div className="w-full absolute top-3 overflow-visible flex justify-end px-2">
                <button
                    className="bg-teal-50 py-1 shadow-lg px-6 rounded-sm duration-75
                    focus:ring-teal-400 focus:ring-2 focus:outline-none hover:bg-teal-200"
                    onClick={toggleIsShow}
                >
                    <DoubleArrowDownIcon className={"duration-200 " + (isShow && "-scale-y-100")} />
                </button>
            </div>
        </div>
    )
}

export default PatientInformation