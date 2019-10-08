import React from 'react'
import { useGitFetchAsync } from 'components/useFetchAsync'
import { Navigation } from 'components/Navigation/Navigation'

export const Explore = () => {
    return (
        <div className="container-fluid">
            <Navigation />
            <div className="app-text-main font-space-mono font-weight-bold font-size-20">
                Coming Soon... Currenlty in development phase :-)
            </div>
        </div>
    )
}