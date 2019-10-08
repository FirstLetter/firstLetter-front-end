import React from 'react'
import {A} from 'hookrouter'
import 'components/NotFound/notfound.css'
import 'assets/css/theme.css'

export const NotFoundPage = () => {
    
    return (
        <div className="container-fluid">
            <div className="row">
                <h1 className="col-12 text-center app-text-accent font-space-mono py-md-5 py-3">
                    404 <br />
                    Not Found
                </h1>
                <div className="col-12 text-center">
                    <A className='notfound-goHome' href="/home">Go Home -</A>
                </div>
            </div>
        </div>
    ) 

}