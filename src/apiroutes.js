import Axios, {axios} from 'axios'
import { RequestMethods, CONST_ERROR_NOT_FOUND } from './utils'

export const UriBuilder = ({scheme, domain, appendables}) => {
    return [[scheme, domain].join("://"), appendables.join("/")].join('/')
}

export const SCHEME = 'https' 
export const BASE_URL = 'api.github.com'
export const PRIME_USER = "firstLetter"
export const PRIME_REPO = "firstLetterPosts"
export const REPOS = 'repos'
export const FORKS = 'forks'
export const PULLS = 'pulls'
export const README = 'readme'
export const CONTENTS = 'contents'

export const GitConst = {
    CreateFork: 'createFork',
    GetUserFork: 'getUserFork',
    CreateNewFile: 'createNewFile',
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
    [GitConst.CreateFork]: ({username, repo}) => [REPOS, username, repo, FORKS],
    [GitConst.GetUserFork]: ({username, repo}) => [REPOS, username, repo],
    [GitConst.CreateNewFile]: ({username, repo, filename}) => [REPOS, username, repo, CONTENTS, filename],
    [GitConst.GetPullForRepo]: ({username, repo}) => [REPOS, username, repo, PULLS],
    [GitConst.CreatePullRequest]: ({username, repo}) => [REPOS, username, repo, PULLS],
    [GitConst.GetReadme]: ({username, repo}) => [REPOS, username, repo, CONTENTS, username, README],
    [GitConst.GetAllFiles]: ({username, repo, filename}) => [REPOS, username, repo, CONTENTS, filename],
    [GitConst.GetFile]: ({username, repo, filename}) => [REPOS, username, repo, CONTENTS , filename],
}

export const fetchAsync = async (url, method, data, config) => {
    let result = null
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
