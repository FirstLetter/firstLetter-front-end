import {useReducer} from 'react'
import createUseContext from 'constate'
const ACTIONS = {
    LOGIN: "login",
    LOGOUT: "logout"
}

const initialState = {
    user: {
        username: "",
        authtoken: "", 
    },
    loggedIn: false,
    error: null
}

const reducer = (state, action) => {

    switch(action.type) {
        case ACTIONS.LOGIN:
            return {
                user: {
                    username: action.user.username,
                    authtoken: action.user.authtoken
                },
                loggedIn: true
            }
        case ACTIONS.LOGOUT: 
            return {
                user: {
                    username: "",
                    authtoken: ""
                },
                loggedIn: false
            }
        default: 
            new Error("Action not Found!")
    }

}

const useLogin = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {user, loggedIn} = state

    const login = (user) => {
        if(loggedIn === false) {
            dispatch({
                type: ACTIONS.LOGIN,
                user: user
            })
        }
    } 

    const logout = () => {
        if(loggedIn === true) {
            dispatch({
                action: ACTIONS.LOGOUT
            })
        }
    }

    return {user, loggedIn, login, logout}
}

export const useLoginContext = createUseContext(useLogin)