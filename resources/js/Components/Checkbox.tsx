import { ComponentPropsWithoutRef } from "react";

export default function Checkbox({ className = '', ...props }: ComponentPropsWithoutRef<'input'>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-sm form-checkbox border-gray-300 text-teal-600 shadow-sm focus:ring-teal-500 ' +
                className
            }
        />
    );
}
