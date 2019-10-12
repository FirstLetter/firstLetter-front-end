import React from 'react'
import { useGitFetchAsync } from 'components/useFetchAsync'
import {navigate} from 'hookrouter'
import { GitConst, PRIME_REPO, PRIME_USER } from 'apiroutes'
import { Navigation } from 'components/Navigation/Navigation'
import 'assets/css/theme.css'
import { LoadingComponent } from 'components/utils/Loader'
import ReactMarkdown from 'react-markdown'
import { useLoginContext } from 'context'

export const Letter = ({lettername, username}) => {

    const {loggedIn, user} = useLoginContext()
    
    const {loading, data, error} = useGitFetchAsync(
        GitConst.GetFile, 
        {
            username: PRIME_USER,
            repo: PRIME_REPO,
            filename: `${username}/${lettername}`
        },
        null,
        null
    )

    console.log(username)
    console.log(lettername)
    console.log(data)

    let toRender
    if(loading === true) {
        toRender = <div className="px-2 font-ibm-plex-mono font-size-18 app-text-blue-light">Fetching Letter <LoadingComponent /></div>
    } else if(data !== null) {
        toRender = (
            <>
            <h1 style={{backgroundColor: "#bdbdbd0f"}} className="font-ibm-plex-mono px-2 app-text-blue-light-light pb-3 pt-1 font-size-28"><span className="font-italic app-text-accent"></span>{data.name.split('.')[0]}</h1>
            <div className="px-2 output-article-content-editor">
                <ReactMarkdown source={atob(data.content)} />
            </div>
            </>
        )
    } else  if(error != null) {

        toRender = (
            <div className="font-ibm-plex-mono font-weight-500 px-2 py-2 app-text-gray-light">
                Failed to fetch article. Some Reasons can be:
                <ul style={{listStylePosition: "inside"}}>
                    <li>You have not sent pull request for this article.</li>
                    <li>Your pull request is not yet merged.</li>
                    <li>Article does not exists.</li>
                    <li>Internet Problem. Check your internet connection.</li>
                </ul> 
            </div>
        )

    }

    return (
        <div className="container-fluid app-bg-main">    
            <Navigation />
            <div className="container">
                <div className="row">
                    <div style={{backgroundColor: "#bdbdbd1f"}} className="col-12 px-0 py-0 shadow-lg rounded-sm font-roboto-mono app-text-gray-light">
                        <div style={{backgroundColor: "#bdbdbd0f"}} className="app-text-main font-ibm-plex-mono font-weight-500 px-2 pb-1 pt-3"><span className="font-italic app-text-indigo-light">Written By- </span>{username}</div>
                        {toRender}
                    </div>
                </div>
            </div>
        </div>
    )
    
}