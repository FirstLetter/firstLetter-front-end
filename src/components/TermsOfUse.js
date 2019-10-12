import React from 'react'
import 'assets/css/theme.css'
import { Navigation } from './Navigation/Navigation'

export const TermsOfUse = () => {
    return  (
        <div className="container-fluid app-bg-main">
            <Navigation />
            <_TermsOfUse />
        </div>
    )
}

export const _TermsOfUse = () => {
    return <div className="container">
            <div className="row">
            <div className="col-12 rounded py-2 font-ibm-plex-mono font-size-18 text-light app-text-main w-100" style={{wordWrap: "break-word"}}>
                <h1 className="app-text-white">Terms Of Use</h1>
                <p className="app-text-gray">
                    This app is just a means provided to users to make pull requests. 
                </p>
                <p className="app-text-gray">
                    Please Note that this website does not ensures that you will get a free limited edition hacktober t-shirt. The maintainers of the hacktoberfest is the sole authority which will decide based on your pull requests, wether if you have completed your hacktoberfest successfully. 
                </p>
                <p className="app-text-gray">
                    Also, this project is open source, completely owned by firstLetter Organisation. And has no tie up with hacktoberfest. 
                </p>
                <p className="app-text-gray">
                    So, If your pull requests are invalidated by hacktoberfest 2019 authorities, or you don't get a free limited edition t-shirt  then firstLetter is not responsible for this in any means.    
                </p>
            </div>
        </div>
    </div>
}
