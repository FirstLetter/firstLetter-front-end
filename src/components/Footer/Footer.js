import React from 'react'
import 'assets/css/theme.css'
import 'components/Footer/footer.css'
import 'assets/fontawesome-free-5.11.2-web/css/all.min.css'
import {A} from 'hookrouter'

const socialLinks = ({link, linkicon}) => {
    return <a className="text-decoration-none font-size-18 mx-1"  href={link}><i className={linkicon}></i></a>
}

export const Footer = () => {
    return (
        <div className="text-center py-4 font-ibm-plex-mono font-weight-500 app-bg-main app-text-indigo-light">
            <div className="app-text-white py-2 font-weight-400">
                By using this website you agree to <A class="text-decoration-none app-text-bg-accent app-text-blue-light-hover" href="/terms-of-use">Our terms of use</A>
            </div>

            Copyright &copy; FirstLetter. 2019
            <div className="py-2">
                <a class="text-decoration-none app-text-bg-accent app-text-blue-light-hover" href="https://vermakartik.github.io">Know About Developer </a> | <A href='/howto' className="text-decoration-none app-text-bg-accent app-text-blue-light-hover font-ibm-plex-mono">Read How to.</A>
            </div>
        </div>
    )
}