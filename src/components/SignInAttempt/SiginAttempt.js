import React, {useState, useEffect} from 'react'
import { useLoginContext } from 'context'
import {BACKEND_URL, END_POINT, CONST_QUERY} from 'cconfig'
import { fetchAsync } from 'apiroutes'
import { RequestMethods } from 'utils'
import { navigate } from 'hookrouter'
import { LoadingComponent } from 'components/utils/Loader'
import 'assets/css/theme.css'

export const SigninAttempt = ({username}) => {

    const {loggedIn, login, user} = useLoginContext()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [found, setFound] = useState(false)

    useEffect(() => {
        if(loading === true){
            if(loggedIn === true) {
                navigate('/home')
            } else {
                handleLogin()
            }
        } else if(loading === false) {
            if(data != null) {
                setFound(true)
                login(data)
                navigate('/home')
            }
        }
    }, [loading])

    const handleLogin = async () => {
        const url = [BACKEND_URL, END_POINT].join('/')
        // console.log(url)
        const info = await fetchAsync(url, RequestMethods.POST, {query: CONST_QUERY(username)})
        setData(info.data.data.githubUser)
        // console.log("from handle login...")
        // console.log(info.data)       
        setLoading(false)
    }

    return <div className="container-fluid">
        <div className="row">
            <div className="col-12 text-center py-5">
            {
                loading ? 
                <div className="app-text-blue-light font-ibm-plex-mono font-size-20">
                    <LoadingComponent />
                    <div>
                        Signing you in 
                    </div>
                    <div>
                        Stay With Us
                    </div>
                </div> :
                (
                    !found ? 
                    <div className="app-bg-main"><button className="app-text-background app-bg-blue-light-hover app-bg-indigo border-0 px-3 py-2 rounded-sm font-ibm-plex-mono font-weight-500" onClick={() => setLoading(true)}>Retry</button></div> :
                    <div className="app-bg-main">Already Logged In</div>
                    
                )
            }
        </div>
        </div>
    </div>
}