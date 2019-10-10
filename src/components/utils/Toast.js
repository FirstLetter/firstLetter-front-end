import React from 'react'
import 'assets/css/global.css'
import 'assets/css/theme.css'

export const Toast = ({text}) => (
    <div style={{zIndex: 100}} className="d-inline-block toast-message app-bg-color-gray app-text-background font-size-14 px-2 py-1 font-roboto-mono">
        {text}
    </div>
)
