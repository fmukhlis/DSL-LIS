import { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";

const TopAlert = ({className, type, children, closeHandler, ...props}) => {
    return (
        <>
            <div 
                className={"flex items-center w-full p-2 mb-4 text-gray-500 rounded bg-red-100 border-red-200 border-2 " + className} 
                role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-7 h-7 text-red-500 rounded-md">
                    <svg 
                        className="w-5 h-5" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="currentColor" 
                        viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                    </svg>
                </div>
                <div className='mx-2 text-sm'>
                    {children}
                </div>
                <button 
                    type="button"
                    onClick={closeHandler} 
                    className="ml-auto -my-1.5 text-gray-400 hover:text-gray-900 rounded focus:ring-2 focus:ring-gray-300 inline-flex items-center justify-center h-5 w-5"  
                    aria-label="Close">
                    <svg 
                        className="w-3 h-3" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 14 14">
                        <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
        </>
    )
}

export default TopAlert