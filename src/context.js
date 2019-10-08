import {useReducer} from 'react'
import createUseContext from 'constate'
const ACTIONS = {
    LOGIN: "login",
    LOGOUT: "logout",
    SET_USER_DETAILS: "user_details"
}

const initialState = {
    user: {
        username: "",
        authtoken: "", 
        useremail: ""
    },
    loggedIn: false,
    error: null
}

const reducer = (state, action) => {

    console.log(state)

    switch(action.type) {
        case ACTIONS.LOGIN:
            return {
                user: {
                    ...state.user,
                    username: action.user.github_username,
                    authtoken: action.user.user_auth_token
                },
                loggedIn: true
            }
        case ACTIONS.LOGOUT: 
            return {
                user: {
                    ...state.user,
                    username: "",
                    authtoken: ""
                },
                loggedIn: false
            }
        case ACTIONS.SET_USER_DETAILS:
            return {
                user: {
                    ...state.user,
                    useremail: action.user.useremail
                }
            }
        default: 
            return state
    }

}

const useLogin = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {user, loggedIn} = state

    const login = (user) => {
        if(loggedIn === false) {
            console.log("logging out..")
            dispatch({
                type: ACTIONS.LOGIN,
                user: user
            })
        }
    } 

    const logout = () => {
        if(loggedIn === true) {
            console.log("logging out..")
            dispatch({
                type: ACTIONS.LOGOUT
            })
        }
    }

    const setUserDetails = (user_details) => {
        if(loggedIn == true) {
            dispatch({
                type: ACTIONS.SET_USER_DETAILS,
                user: user_details
            })
        }
    }

    return {user, loggedIn, login, logout, setUserDetails}
}

export const useLoginContext = createUseContext(useLogin)