import React, {useState, useEffect} from 'react'
import { fetchAsync, UriBuilder, SCHEME, BASE_URL, GithubApiRoutes, GithubApiInfo } from 'apiroutes'

export const useGitFetchAsync = (apiConst, d, body = null, config, defLoad=true) => {
    const [loading, setLoading] = useState(defLoad)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [statusCode, setStatusCode] = useState(-1)

    const handleRun = async () => {
        const uri = UriBuilder({
            scheme: SCHEME,
            domain: BASE_URL,
            appendables: GithubApiRoutes[apiConst](d)
        })

        console.log(uri)
    
        const {method} = GithubApiInfo[apiConst]
        try {
            const result = await fetchAsync(uri, method, body, config)
            if(result.data === null) {
                setError("error")
            } else {
                setData(result.data)
            }
            setLoading(false)
        } catch (error) {
            console.log("..Error <-> Error..")
            setError(error)
            setData(null)
            setLoading(false)
        }
    }

    useEffect(() => {
        if(loading === true) {
            handleRun()
        }
    }, [loading])

    
    return {
        loading,
        error,
        data,
        setLoading
    }
}