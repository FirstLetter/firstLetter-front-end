import React from 'react'
import { useGitFetchAsync } from 'components/useFetchAsync'
import { Navigation } from 'components/Navigation/Navigation'

export const Explore = () => {
    return (
        <div className="container-fluid">
            <Navigation />
            <div className="py-3 app-text-gray-light font-ibm-plex-mono font-size-18">
                Coming Soon... Currenlty in development phase :-)
            </div>
        </div>
    )
}