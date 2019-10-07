import React, {useState, useEffect} from 'react'
import { useLoginContext } from 'context'
import {BACKEND_URL, END_POINT, CONST_QUERY} from 'cconfig'
import { fetchAsync } from 'apiroutes'
import { RequestMethods } from 'utils'
import { navigate } from 'hookrouter'
import {LoadingComponent} from 'components/utils/Loader'

export const SigninAttempt = () => {

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
                login(user)
                navigate('/home')
            }
        }
    }, [loading])

    const handleLogin = async () => {
        const url = [BACKEND_URL, END_POINT].join('/')
        const info = await fetchAsync(url, RequestMethods.POST, {query: CONST_QUERY})
        setData(info.data)           
        setLoading(false)
    }

    return <>
        {
            loading ? 
            <LoadingComponent /> :
            (
                !found ? 
                <div><button onClick={() => setLoading(true)}>Retry</button></div> :
                <div>Already Logged In</div>
                
            )
             
        }
    </>
}