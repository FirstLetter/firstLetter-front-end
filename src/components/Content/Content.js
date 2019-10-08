import React, {useState, useEffect, lazy, Suspense} from 'react'
import { withAuth } from 'components/withAuth'
import { Navigation } from 'components/Navigation/Navigation'
import 'components/Content/content.css'
import 'assets/css/theme.css'
import ReactMarkdown from "react-markdown"
import { useGitFetchAsync } from 'components/useFetchAsync'
import { GitConst, PRIME_REPO, PRIME_USER } from 'apiroutes'
import { useLoginContext } from 'context'
import { LoadingComponent } from 'components/utils/Loader'
import { useToastMessage } from 'components/useToastMessage'
import {Toast} from 'components/utils/Toast' 
import { withAuthLoad } from 'components/withAuthLoad'
const MyFiles = lazy(() => import('components/MyPulls/MyPulls'))


const EditorContent = ({deftitle = "", deftext = "", onSelectNew = null, istitleDisabled = false, sha=null}) => {

    const {user} = useLoginContext()
    const [title, setTitle] = useState(deftitle)
    const [text, setText] = useState(deftext)
    const {showing, setShowing} = useToastMessage()

    useEffect(() => {
        setText(deftext)
        setTitle(deftitle)
    }, [deftext, deftitle])

    const {loading, data, error, setLoading} = useGitFetchAsync(
        GitConst.CreateNewFile,
        {
            username: user.username,
            repo: PRIME_REPO,
            filename: `${user.username}/${title}.txt`
        },
        {
            message: "fileupdated",
            commiter: {
                name: user.username,
                email: user.useremail === "" || user.useremail ? `${user.username}@github.com` : user.useremail 
            },
            content: btoa(text),
            sha: (sha === null ? "" : sha) 
        },
        {
            headers: {
                Authorization: `bearer ${user.authtoken}`
            }
        },
        false
    )

    const handleClickSave = () => {
      if(title === "" || text === "") {
          setShowing(true)
          return
      }  else {
          setLoading(true)
      }
    } 

    return (
        <div className="pt-2 container-fluid w-100 shadow-lg">
            {showing ? <Toast text="Make sure Title and content are not empty"/> : null}
            <div className="row px-0 py-2">
                <div className="col-12 px-0">
                    <button className="border-0 px-3 py-2 text-light app-bg-t-main font-space-mono" onClick={handleClickSave}>
                        Save {loading === true ? <LoadingComponent /> : "" } 
                    </button>
                    {onSelectNew ? <button className="ml-1 py-2 px-3 border-0 text-light app-bg-t-dark font-space-mono" onClick={() => onSelectNew()}>Add New +</button>: ""}
                </div>
                <div className="col-12 px-0 app-text-bg-accent font-size-12 font-space-mono">
                    Please don't forget to save your content by clicking on the save button.
                </div>
            </div>
            <div className="px-0 row app-bg-light rounded-sm overflow-hidden">
                <div className="col-12 px-0 border-title">
                    <input className="outline-none border-0 w-100 font-italic py-2 app-bg-light font-space-mono app-text-bg-accent px-2 border-bottom" type={text} placeholder="Enter title..." value={title} onChange={e => setTitle(e.target.value)} required disabled={istitleDisabled}/>
                </div>
                <div className="col-md-6 col-12 border-content px-0">
                    <div className="font-size-18 font-space-mono py-2 px-2 app-text-main">Enter Content Here...</div>
                    <div className="px-2">
                        <textarea required className="edit-text-content w-100 border-0 app-bg-light app-text-bg-accent font-roboto-mono" value={text} onChange={(e) => setText(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md-6 col-12 px-0">
                    <div className="font-size-18 font-space-mono py-2 px-2 app-text-main">Output</div>
                    <div className="px-2">
                        <ReactMarkdown source={text} className="font-roboto-mono app-text-bg-accent" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const TabsList = {
    MyPulls: "My Pulls",
    Editor: "Editor",
    MyForks: "My Forks"
}

const Pulls = () => {
    const {user} = useLoginContext()
    const {loading, data, error} = useGitFetchAsync(
        GitConst.GetPullForRepo,
        {
            username: user.username,
            repo: PRIME_REPO
        },
        null,
        {
            headers: {
                Authorization: `bearer ${user.authtoken}`
            }
        }
    )

    let toRender
    if(loading === true){
        toRender = <LoadingComponent />
    } else if(error) {
        toRender = <div className="app-text-bg-accent font-space-mono font-size-18">Error Loading your Pulls</div>
    } else if(data !== null) {
        toRender = <div className="app-text-bg-accent font-space-mono font-size-18">Loaded your Pulls</div>
    }

    return (
        <div className="row">
            <div className="col-12">
                {toRender}
            </div>
        </div>
    )
}

const MyPullRequests = () => {

    const {user} = useLoginContext()
    const  {showing, setShowing} = useToastMessage()
    const [shouldShow, setShouldShow] = useState(false)

    const {data, loading, error, setLoading} = useGitFetchAsync(
        GitConst.CreatePullRequest,
        {
            username: PRIME_USER,
            repo: PRIME_REPO
        },
        {
            title: `Added New from ${user.username}`,
            body: `Added New articles from ${user.username}`,
            head: `${user.username}:master`,
            base: `master`
        },
        {
            headers: {
                Authorization: `bearer ${user.authtoken}`
            }
        },
        false
    )

    useEffect(() => {
        if(shouldShow === true){
            setShouldShow(false)
            setShowing(true)
        }
    }, [loading])

    const handleClick = () => {
        setLoading(true)
        setShouldShow(true)
    }
    

    return (
        <div className="container-fluid">
            {
                showing === true && loading === false ? (
                    error ? <Toast text="Error Processing request"/> : <Toast text="Pull Request Sent!"/>
                ) : ""
            }
            <div className="row">
                <div className="col-12">
                    <button className="app-bg-t-main text-white px-3 py-2 border-0 font-space-mono font-weight-bold font-size-18" onClick={handleClick}>
                        + Create a New Pull {loading ? <LoadingComponent /> : ""}
                    </button>
                </div>
            </div>
        </div>
    )
}

const MyFork = ({onSelect}) => {
    
    return (
        <Suspense fallback={
            <div className="font-size-20 text-center font-space-mono app-text-bg-accent">
            <span>Loading Files From Your Repo</span> <LoadingComponent />
            </div>
        }>
            <MyFiles fromFork={true} onClick={(data) => onSelect(data)} /> 
        </Suspense>
    )
}

const MyEditor = ({currentSelected, onSelectNew}) => {

    // console.log(currentSelected)
    
    const {user} = useLoginContext()
    const {loading, data, error} = useGitFetchAsync(
        GitConst.GetFile,
        {
            username: user.username,
            repo: PRIME_REPO,
            filename: [user.username, (currentSelected ? currentSelected.name : "readme.md")].join('/')   
        },
        null,
        null,
        (currentSelected ? true : false)
    )
     
    let EditorToRender

    if(currentSelected === null || currentSelected === undefined){
        EditorToRender = <EditorContent />
    } else {
        if(loading === true) {
            EditorToRender = <LoadingComponent />
        } else if(loading === false && error !== null) {
            EditorToRender = <div className="app-text-accent font-face-space-mono font-size-20">Error Loading Data...</div>
        } else if(loading === false && data !== null) {
            EditorToRender = <EditorContent onSelectNew={() => onSelectNew()} deftitle={data.name.split(".")[0]} deftext={atob(data.content)} istitleDisabled={true} sha={data.sha} />
        }
    }

    console.log(EditorToRender)

    return (
        <>
            {EditorToRender}
        </>
    ) 
}

const TabOutlook = ({text, isActive, onClick}) => {
    return (
        <div onClick={onClick} className={`py-2 d-inline-block col-md-1 text-center col-12 tab-outlook px-2 py-1 ${isActive === true ? "tab-outlook-is-active font-weight-bold" : ""}`}>
            {text}
        </div>
    )
}

const TabsManager = ({tabsList, currentTab, onClick}) => {
    
    return (
        <div className="tabmanager app-bg-light">
            {tabsList.map((item, index) => {
                return <TabOutlook key={index} text={item} isActive={currentTab === item} onClick={() => onClick(item)}/>
            })}
        </div>
    )
}

export const Content = withAuth(() => {

    const [currentTab, setCurrentTab] = useState(TabsList.MyForks)
    const [currentSelected, setCurrentSelected] = useState(null)

    console.log(currentSelected)
    
    let ToRender
    if(currentTab === TabsList.MyForks) {
        ToRender = <MyFork onSelect={(data) => {
            setCurrentSelected(data)
            setCurrentTab(TabsList.Editor)
        }}/>
    } else if (currentTab === TabsList.Editor){
        ToRender = <MyEditor currentSelected={currentSelected} onSelectNew={() => setCurrentSelected(null)} />
    } else if(currentTab === TabsList.MyPulls) {
        ToRender = <MyPullRequests />
    }

    return (
        <div className="container-fluid">
            <Navigation />    
            <TabsManager 
                tabsList={
                    [TabsList.MyForks, TabsList.Editor, TabsList.MyPulls, TabsList.AddNew]} 
                    currentTab={currentTab} 
                    onClick={(item) => setCurrentTab(item)}/>
            <br />
            {ToRender}
        </div>
    )

})