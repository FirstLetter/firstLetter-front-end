// export const BACKEND_URL = process.env.BACKEND_URL
// export const END_POINT = process.env.END_POINT
export const CONST_QUERY = (username) => `
query {
    githubUser(github_username: "${username}") {
        github_username
        user_auth_token
    }
}`.trim()

export const CONST_SCOPES = ['repo', 'user'].join(",")
export const BACKEND_URL=process.env.REACT_APP_BACKEND_URL //'https://gitobackend.herokuapp.com'
export const END_POINT=process.env.REACT_APP_ROOT_END_POINT //'graphql'
const CLIENT_ID=process.env.REACT_APP_CLIENT_ID //'1d4d5827024e4edfbe69'
export const BASE_URL_AUTH=process.env.REACT_APP_BASE_URL_AUTH // 'https://github.com/login/oauth/authorize'

export const MAKE_GIT_AUTH_URL = () => {
    const str= `${BASE_URL_AUTH}?client_id=${CLIENT_ID}&scope=${CONST_SCOPES}`.trim()
    return str
} 