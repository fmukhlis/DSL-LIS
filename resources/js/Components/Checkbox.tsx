export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-sm border-gray-300 text-teal-600 shadow-sm focus:ring-teal-500 ' +
                className
            }
        />
    );
}
