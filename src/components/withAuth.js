import React from 'react'
import { useLoginContext } from 'context'
import { Home } from './Home/Home'
import {navigate} from 'hookrouter'
 
export const withAuth = (AuthComponent) => {

    return (props) => {
        const {loggedIn} = useLoginContext()

        if(loggedIn === true){
            return <AuthComponent {...props} />
        } else {
            navigate('/home', true)
            return <Home />
        }
    }
}