// export const BACKEND_URL = process.env.BACKEND_URL
// export const END_POINT = process.env.END_POINT
export const CONST_QUERY = (username) => `query {
    githubUser(github_username: "${username}") {
        github_username
        user_auth_token
    }
}`
export const CONST_SCOPES = ['repo', 'user'].join(",")
export const BACKEND_URL='http://localhost:3000'
export const END_POINT='graphql'
const CLIENT_ID='4d2d5827e24e42dfbe79'
export const BASE_URL_AUTH='https://github.com/login/oauth/authorize'

export const MAKE_GIT_AUTH_URL = () => {
    return `${BASE_URL_AUTH}?client_id=${CLIENT_ID}&scope=${CONST_SCOPES}`.trim()
} 