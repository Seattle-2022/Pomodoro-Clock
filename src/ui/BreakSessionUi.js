import React from "react";

export const BreakSessionContainer = ({children, ...props}) => {
    return (
        <div className="flex flex-col items-center" {...props}>
            {children}
        </div>
    )
}

export const BreakSessionLabel = ({children, ...props}) => {
    return (
        <p className = "text-lg text-green-700" {...props}>
            {children}
        </p>
    )
}


export const BreakSessionTime = ({children, ...props}) => {
    return (
        <p className ="text-4xl font-bold text-purple-600" {...props}>
            {children}
        </p>
    )
}


export const PlusMinusButton = ({children, ...props}) => {
    return (<button className="mt-2 text-lg text-gray-800 px-4 py-2 bg-green-200 rounded" {...props}>
        {children}
    </button>)
}

export const PlusMinusButtonContainer = ({children, ...props}) => {
    return <div className="grid grid-flow-col gap-2 rounded" {...props}>
        {children}
    </div>
}