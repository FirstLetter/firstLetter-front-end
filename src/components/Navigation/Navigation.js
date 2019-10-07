import React from 'react'
import {A, navigate} from 'hookrouter'
import { useLoginContext } from 'context'
import { MAKE_GIT_AUTH_URL } from 'cconfig'

export const Navigation = () => {

    const {loggedIn, logout} = useLoginContext()

    const handleLogout = () => {
        logout()
        navigate('/home', true)
    }

    return (
        <>
            <A href='/home'>Home</A>
            <A href='/explore'>Explore</A>
            {loggedIn === false ? <a href={MAKE_GIT_AUTH_URL()}>Sign In</a>: null}
            {loggedIn === true ? <A href='/content'>Content</A> : null}
            {loggedIn === true ? <A href="#" onClick={handleLogout}>Logout</A>: null}
        </>
    )
}