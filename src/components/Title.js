import React from 'react'
//fucnctional component
export default function Title({name , title}) {
    return (
        <div>
            <div className = "row">
                <div className = "col-1- mx-auto my-2 text-center text-title">
                    <h1 className = "text-capitalize font-weight-bold">
                        {name} <strong className = "text-blue">{title}</strong>
                    </h1>
                </div>
            </div>
        </div>
    )
}
