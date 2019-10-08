import React, {useState, useEffect} from 'react'
import 'assets/css/global.css'

const MAX_TIME = 2000

export const useToastMessage = (defShow = false) => {
    const [showing, setShowing] = useState(defShow)

    useEffect(() => {
        if(showing === true){
            const timer = setTimeout(() => {
                setShowing(false);
            }, MAX_TIME)
            return () => clearTimeout(timer)
        }
    },[showing])

    return {
        showing,
        setShowing
    }
}