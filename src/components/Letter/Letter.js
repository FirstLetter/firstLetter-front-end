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
    
    if(username !== PRIME_USER) {
        if(loggedIn === false){
            if(user.username !== username){
                navigate('/home')
            }
        }
    }
    
    const {loading, data, error} = useGitFetchAsync(
        GitConst.GetFile, 
        {
            username: username,
            repo: PRIME_REPO,
            filename: `${username}/${lettername}.txt`
        },
        null,
        null
    )

    console.log(username)
    console.log(lettername)
    console.log(data)

    let toRender
    if(loading === true) {
        toRender = <LoadingComponent />
    } else if(data !== null) {
        toRender = (
            <>
            <h1 className="app-text-main pb-3 pt-1 font-size-28"><span className="font-italic app-text-accent"></span>{data.name.split('.')[0]}</h1>
            <ReactMarkdown source={atob(data.content)} />
            </>
        )
    }

    return (
        <div className="container-fluid">    
            <Navigation />
            <div className="container">
                <div className="row">
                    <div className="col-12 py-2 shadow-lg rounded-sm app-bg-light font-roboto-mono app-text-bg-accent">
                        <div className="app-text-main pb-1 pt-3"><span className="font-italic app-text-accent">Written By- </span>{username}</div>
                        {toRender}
                    </div>
                </div>
            </div>
        </div>
    )
    
}