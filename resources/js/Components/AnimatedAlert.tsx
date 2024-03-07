import {
    useState,
    useEffect,
    ReactNode,
    ComponentPropsWithoutRef,
} from 'react'

// React Spring
import {
    animated,
    useTransition,
    UseTransitionProps,
} from '@react-spring/web';
import { CheckCircledIcon, Cross2Icon, CrossCircledIcon, ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons';

const Alert = ({
    type,
    message,
    className = ''
}: ComponentPropsWithoutRef<'div'> & {
    message?: ReactNode,
    type: 'success' | 'error' | 'warning' | 'info'
}) => {
    const [isShow, setIsShow] = useState<boolean>(false)

    const alertTransition = useTransition<ReactNode, UseTransitionProps>(isShow, {
        from: { y: -20, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        leave: { y: -10, opacity: 0 },
        config: { duration: isShow ? undefined : 250 },
    })

    const errorClass = ['bg-red-100 border-red-200', 'text-red-400']
    const successClass = ['bg-green-100 border-green-200', 'text-green-400']
    const warningClass = ['bg-amber-100 border-amber-200', 'text-amber-400']
    const infoClass = ['bg-blue-100 border-blue-200', 'text-blue-400']

    return (
        <>
            {alertTransition((style, item) => (
                item ? (
                    <animated.div style={style}>
                        <div
                            className={`
                                flex items-center w-full p-2 text-gray-500 rounded border-2 
                                ${type === 'error' && errorClass[0]} 
                                ${type === 'success' && successClass[0]} 
                                ${type === 'warning' && warningClass[0]} 
                                ${type === 'info' && infoClass[0]} 
                                ${className}`
                            }
                            role="alert">
                            <div className={`
                                inline-flex items-center justify-center flex-shrink-0 w-7 h-7 rounded-md
                                ${type === 'error' && errorClass[1]} 
                                ${type === 'success' && successClass[1]} 
                                ${type === 'warning' && warningClass[1]} 
                                ${type === 'info' && infoClass[1]} 
                            `}>
                                {type === 'error' && <CrossCircledIcon width={20} height={20} />}
                                {type === 'success' && <CheckCircledIcon width={20} height={20} />}
                                {type === 'warning' && <ExclamationTriangleIcon width={20} height={20} />}
                                {type === 'info' && <InfoCircledIcon width={20} height={20} />}
                            </div>
                            <div className='mx-2 text-sm'>
                                {message}
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsShow(false)}
                                className="ml-auto text-gray-400 hover:text-gray-900 rounded focus:ring-2 focus:ring-gray-300 inline-flex items-center justify-center h-5 w-5"
                                aria-label="Close">
                                <Cross2Icon />
                            </button>
                        </div>
                    </animated.div>
                ) : null
            ))}
        </>
    )
}

export default Alert