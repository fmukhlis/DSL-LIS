export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-xs  text-red-600 dark:text-red-400 ' + className}>
            {message}
        </p>
    ) : null;
}
