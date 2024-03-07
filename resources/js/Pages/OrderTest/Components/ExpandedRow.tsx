// React Spring
import { animated } from "@react-spring/web"

// Tanstack Table
import { Row } from "@tanstack/react-table"

// Internal
import { OrderModelProps } from "@/Types"
import EditOrderModal from "./EditOrderModal"
import PrimaryAnchor from "@/Components/PrimaryAnchor"
import SecondaryButton from "@/Components/SecondaryButton"
import useExpandedRow from "../Hooks/useExpandedRow"

const ExpandedRow = ({ row }: { row: Row<OrderModelProps> }) => {

    const { transition, orderTestContext } = useExpandedRow({ row })

    return (
        transition((style, item) => {
            return (
                item &&
                <tr>
                    <td colSpan={row.getVisibleCells().length} className="p-0">
                        <animated.div style={style} className="flex items-center overflow-hidden px-3.5 h-12 bg-gradient-to-b from-teal-100 to-teal-50">
                            <div className="mr-2">
                                Test ordered :
                            </div>
                            {row.original.results.map((result) => (
                                <div
                                    key={result._id}
                                    className={`px-2 py-0.5 bg-teal-600 rounded-md text-white mr-1 flex items-center`}
                                >
                                    {result.test?.name}
                                </div>
                            ))}
                            <EditOrderModal
                                defaultData={
                                    row.original.doctor?.department ? {
                                        doctor: {
                                            name: row.original.doctor!.name,
                                            department: row.original.doctor!.department
                                        },
                                        is_cito: row.original.is_cito,
                                        patient: {
                                            name: row.original.patient!.name,
                                            patient_id: row.original.patient!.patient_id,
                                            registration_id: row.original.registration_id,
                                            contacts: row.original.patient!.contacts.reduce((accumulator, currentObj) => ({
                                                [currentObj.type]: currentObj.contact, ...accumulator
                                            }), {})
                                        },
                                        payment_method: row.original.payment_method,
                                        tests: row.original.results.map(result => result.test!),
                                        note: row.original.note,
                                    } : {
                                        doctor: {
                                            name: 'External doctor...',
                                            department: 'External doctor...',
                                        },
                                        externalDoctor: row.original.doctor,
                                        is_cito: row.original.is_cito,
                                        patient: {
                                            name: row.original.patient!.name,
                                            patient_id: row.original.patient!.patient_id,
                                            registration_id: row.original.registration_id,
                                            contacts: row.original.patient!.contacts.reduce((accumulator, currentObj) => ({
                                                [currentObj.type]: currentObj.contact, ...accumulator
                                            }), {})
                                        },
                                        payment_method: row.original.payment_method,
                                        tests: row.original.results.map(result => result.test!),
                                        note: row.original.note,
                                    }}
                            >
                                <SecondaryButton className="ml-auto px-2 py-0.5 rounded-sm">Edit</SecondaryButton>
                            </EditOrderModal>
                            {orderTestContext?.can.viewDetail &&
                                <PrimaryAnchor
                                    className="px-2 py-0.5 ml-1.5 rounded-sm"
                                    href={route('order.detail', { order: row.original.registration_id })}
                                >
                                    See Detail
                                </PrimaryAnchor>
                            }
                        </animated.div >
                    </td>
                </tr >
            )
        })
    )
}

export default ExpandedRow