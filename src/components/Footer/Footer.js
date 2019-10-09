import React from 'react'
import 'components/Footer/footer.css'
import 'assets/fontawesome-free-5.11.2-web/css/all.min.css'
import {A} from 'hookrouter'

const socialLinks = ({link, linkicon}) => {
    return <a className="text-decoration-none font-size-18 mx-1"  href={link}><i className={linkicon}></i></a>
}

export const Footer = () => {
    return (
        <div className="footer py-4 app-bg-main app-text-accent">
            Copyright &copy; FirstLetter. 2019
            <div className="py-2">
                <a class="text-decoration-none app-text-bg-accent" href="https://vermakrtik.github.io">Know About Developer </a> | <A href='/howto' className="text-decoration-none app-text-bg-accent font-space-mono font-size-16">Read How to.</A>
            </div>
        </div>
    )
}