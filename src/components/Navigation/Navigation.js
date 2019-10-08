import React from 'react'
import {A, navigate, usePath} from 'hookrouter'
import { useLoginContext } from 'context'
import { MAKE_GIT_AUTH_URL } from 'cconfig'
import 'components/Navigation/navigation.css'
import 'assets/css/theme.css'
import HacktoberImage from 'assets/images/Hacktoberfest_19.png'
import 'assets/fontawesome-free-5.11.2-web/css/brands.min.css'

export const InLink = (props) => <span className={`px-1 px-md-2`}><A className={`link ${props.isActive === true ? "active-tab": ""}`}  {...props}>{props.children}</A></span>
export const OutLink = (props) => <span className="px-1 px-md-2"><a className="link" {...props}>{props.children}</a></span>

const _Navigation = () => {
    const path = usePath()
    console.log(path)
    const {loggedIn, logout} = useLoginContext()

    const handleLogout = () => {
        logout()
        navigate('/home', true)
    }

    return (
        <>
            <InLink href='/home' isActive={path == '/home'}>Home</InLink>
            <InLink href='/explore' isActive={path == '/explore'}>Exlpore</InLink>
            {loggedIn === false ? <OutLink href={MAKE_GIT_AUTH_URL()} >Github <i className="fab fa-github"></i> Log In</OutLink>: null}
            {/* {loggedIn === false ? <OutLink href={'/user/signin/vermakartik'} >Github <i className="fab fa-github"></i> Log In</OutLink>: null} */}
            {loggedIn === true ? <InLink isActive={path=="/content"} href='/content'>Content</InLink> : null}
            {loggedIn === true ? <InLink href="#" onClick={handleLogout}>Logout</InLink>: null}
        </>
    )
}

export const Navigation = () => {
    return (
        <div className="row py-2">
            <div className="col-12 col-md-6 pl-2 pt-4">
                {/* <div className="hacktober-image"></div> */}
                <img className="hacktober-image" src={HacktoberImage} alt="hacktober" />
            </div>
            <div className="col-12 col-md-6 pt-5 pr-md-5 pr-0 text-md-right">
                <_Navigation />
            </div>
        </div>
    )
}