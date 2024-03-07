import { OrderDetailsTabProps } from "@/Types/input-result"

const dateConfig: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
}

const OrderDetailsTab = ({ order, ...props }: OrderDetailsTabProps) => {
    return (
        <div {...props} className="flex flex-col text-sm px-5 pt-4 pb-5 gap-1.5 outline-none">
            <div className="flex">
                <span className="mr-3 w-36">Registration ID: </span>
                <span className="font-bold">
                    {order.registration_id}
                </span>
                <div className="flex gap-1 items-center ml-auto font-bold text-teal-600">
                    {new Date(order.created_at).toLocaleDateString('en-GB', dateConfig)}
                </div>
            </div>
            <div className="flex">
                <span className="mr-3 w-36">Referring Physician: </span>
                <span className="font-bold">
                    {order.doctor?.name}
                </span>
            </div>
            <div className="flex">
                <span className="mr-3 w-36">Clinical Department: </span>
                <span className="font-bold">{order.doctor?.department}</span>
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
                <div className="bg-teal-200 px-2.5 py-1">
                    {order.note ? `"${order.note}"` : '-'}
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsTab