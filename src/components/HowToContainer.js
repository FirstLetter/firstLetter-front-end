import React from 'react'
import { Navigation } from './Navigation/Navigation'
import { Howto } from './HowTo'


export const HowToContainer = () => {
    return  (
        <div className="container-fluid app-bg-main">
            <Navigation />
            <Howto />
        </div>
    )
}