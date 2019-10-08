import React, {lazy, Suspense} from 'react'
import { Navigation } from 'components/Navigation/Navigation'
import {navigate} from 'hookrouter'
import { LoadingComponent } from 'components/utils/Loader'
import 'components/Home/home.css'
import 'assets/css/theme.css'
import { useLoginContext } from 'context'
import { Howto } from 'components/HowTo'
const MyFiles = lazy(() => import('components/MyPulls/MyPulls'))

export const Home = () => {

    const {user, loggedIn} = useLoginContext()

    return(        
        <div className="container-fluid app-bg-main">
            <Navigation />
            {
                loggedIn === false ?
                <Howto /> :
                <> 
                    <Suspense fallback={<div className="font-space-mono">Loading your pulls <LoadingComponent /> </div>}>
                        <MyFiles onClick={(data) => {
                            navigate(`/letter/${data.path}`)
                        }}/>
                    </Suspense>
                    <Suspense fallback={<div className="font-space-mono">Loading your pulls <LoadingComponent /> </div>}>
                        <MyFiles fromFork={true} onClick={(data) => {
                            navigate(`/letter/${data.path}`)
                        }}/>
                    </Suspense>
                </>
            }
        </div>
    )
}