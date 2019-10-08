import React from 'react'
import { useLoginContext } from 'context'
import { Dummy } from './Dummy'

export const withAuthLoad = (AuthComponent) => {

    return (props) => {
        const {loggedIn} = useLoginContext()

        if(loggedIn === true){
            return <AuthComponent {...props} />
        } else {
            return <Dummy />
        }
    }
}