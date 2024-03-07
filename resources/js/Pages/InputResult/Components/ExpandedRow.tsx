// React Spring
import { animated } from "@react-spring/web"

// Tanstack Table
import { Row } from "@tanstack/react-table"

// Internal
import { OrderModelProps } from "@/Types"
import PrimaryAnchor from "@/Components/PrimaryAnchor"
import SecondaryButton from "@/Components/SecondaryButton"
import useExpandedRow from "../Hooks/useExpandedRow"

const ExpandedRow = ({ row }: { row: Row<OrderModelProps> }) => {

    const { transition } = useExpandedRow({ row })

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
                            <PrimaryAnchor
                                className="px-2 py-0.5 rounded-sm ml-auto"
                                href={route('input.detail', { order: row.original.registration_id })}
                            >
                                See Detail
                            </PrimaryAnchor>
                        </animated.div >
                    </td>
                </tr >
            )
        })
    )
}

export default ExpandedRow