import Axios, {axios} from 'axios'
import { RequestMethods, CONST_ERROR_NOT_FOUND } from './utils'

const UriBuilder = ({scheme, domain, appendables}) => {
    return [[scheme, domain].join("://"), appendables.join("/")].join('/')
}

const SCHEME = 'https' 
const BASE_URL = 'api.github.com'
const PRIME_USER = "firstLetter"
const PRIME_REPO = "firstLetterPosts"
const REPOS = 'repos'
const FORKS = 'forks'
const PULLS = 'pulls'
const README = 'readme'
const CONTENTS = 'contents'

export const GitConst = {
    CreateFork: 'createFork',
    GetUserFork: 'getUserFork',
    CreateNeFile: 'createNewFile',
    GetPullForRepo: 'getPullForRepo',
    CreatePullRequest: 'createPullRequest',
    GetReadme: 'getReadme',
    GetAllFiles: 'getAllFiles',
    GetFile: 'getFile'
}

export const GithubApiInfo = {
    [GitConst.CreateFork]: {method: RequestMethods.POST},
    [GitConst.GetUserFork]: {method: RequestMethods.GET},
    [GitConst.CreateNewFile]: {method: RequestMethods.PUT},
    [GitConst.GetPullForRepo]: {method: RequestMethods.GET},
    [GitConst.CreatePullRequest]: {method: RequestMethods.POST},
    [GitConst.GetReadme]: {method: RequestMethods.GET},
    [GitConst.GetAllFiles]: {method: RequestMethods.GET},
    [GitConst.GetFile]: {method: RequestMethods.GET},
}

export const GithubApiRoutes = {
    [GitConst.CreateFork]: (username, repo) => [REPOS, username, repo, FORKS],
    [GitConst.GetUserFork]: (username, repo) => [REPOS, username, repo],
    [GitConst.CreateNewFile]: (username, repo, filename) => [REPOS, username, repo, username, filename],
    [GitConst.GetPullForRepo]: (username, repo) => [REPOS, username, repo, PULLS],
    [GitConst.CreatePullRequest]: (username, repo) => [REPOS, username, repo, PULLS],
    [GitConst.GetReadme]: (username, repo) => [REPOS, username, repo, CONTENTS, username, README],
    [GitConst.GetAllFiles]: (username, repo) => [REPOS, username, repo, CONTENTS, username],
    [GitConst.GetFile]: (username, repo, filename) => [REPOS, username, repo, CONTENTS , username, filename],
}

export const fetchAsync = async (url, method, data, config) => {
    const result = null
    switch(method){
        case RequestMethods.GET:
            result = await Axios.get(url, config) 
            break
        case RequestMethods.POST:
            result = await Axios.post(url, data, config)
            break
        case RequestMethods.PUT:
            result = await Axios.put(url, data, config)
            break
        default:
            throw Error(CONST_ERROR_NOT_FOUND)
    }
    return result
}
