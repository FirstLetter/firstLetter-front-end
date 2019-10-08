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
        console.log(url)
        const info = await fetchAsync(url, RequestMethods.POST, {query: CONST_QUERY(username)})
        setData(info.data.data.githubUser)
        console.log("from handle login...")
        console.log(info.data)       
        setLoading(false)
    }

    return <div className="container-fluid">
        <div className="row">
            <div className="col-12 text-center py-5">
            {
                loading ? 
                <div className="app-text-bg-accent font-space-mono font-size-20">
                    Signin you in...Stay With Us <LoadingComponent />
                </div> :
                (
                    !found ? 
                    <div className="app-bg-main"><button onClick={() => setLoading(true)}>Retry</button></div> :
                    <div className="app-bg-main">Already Logged In</div>
                    
                )
            }
        </div>
        </div>
    </div>
}