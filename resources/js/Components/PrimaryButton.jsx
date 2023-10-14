export default function PrimaryButton({ className = '', isDisabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center px-4 py-3 bg-teal-700 border border-transparent rounded-sm font-semibold text-xs text-white uppercase tracking-widest hover:bg-teal-600 focus:bg-teal-600 active:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    isDisabled && 'opacity-25'
                } ` + className
            }
            disabled={isDisabled}
        >
            {children}
        </button>
    );
}
