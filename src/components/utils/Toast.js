import React from 'react'
import 'assets/css/global.css'
import 'assets/css/theme.css'

export const Toast = ({text}) => (
    <div className="d-inline-block toast-message app-bg-accent app-text-accent font-size-14 px-2 py-1 font-roboto-mono">
        {text}
    </div>
)
