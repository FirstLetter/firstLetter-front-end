import React, {useState, useEffect} from 'react'
import { useLoginContext } from 'context'
import { useGitFetchAsync } from 'components/useFetchAsync'
import { GitConst, PRIME_USER, PRIME_REPO } from 'apiroutes'
import { A } from 'hookrouter'
import { withAuthLoad } from 'components/withAuthLoad'
import { LoadingComponent } from 'components/utils/Loader'

const DataTile = ({text, author, onClick}) => {
    return (
        <div onClick={onClick} className="shadow-lg col-12 col-md-3 col-lg-2 border-sm d-inline-block data-tile app-bg-t-dark text-white p-2 m-2">
            <div className="data-tile-title font-size-24 font-roboto-mono">{text}</div>
            <div className="font-size-16 font-roboto-mono app-text-bg-accent">{author}</div>
        </div>
    )
}

const CreateFork = () => {

    const {user} = useLoginContext()
    const [show, setShow] = useState(true) 
    const {loading, data, error, setLoading} = useGitFetchAsync(
        GitConst.CreateFork,
        {
            username: PRIME_USER,
            repo: PRIME_REPO
        },
        null,
        {
            headers: {
                Authorization: `bearer ${user.authtoken}`
            }
        },
        false
    )

    useEffect(() => {
        if(loading === false){
            if(data === null && error !== null) {
                setShow(true)
            }
        } 
    }, [loading])

    const handleClickFork = () => {
        setLoading(true)
        setShow(false)
    }

    let ToRender
    if(loading === true){
        ToRender = <div className="font-space-mono font-size-20 app-text-bg-accent">Creating your fork <LoadingComponent /></div>
    } 
    else if(error !== null){
        ToRender = <div className="font-space-mono font-size-20 app-text-main">Error Creating your Fork</div>
    } else if(data !== null) {
        ToRender = <div className="font-space-mono font-size-20 app-text-main">
            Successfully Created Your Fork <A className="text-decoration-none font-space-mono font-size-20 app-text-accent" href="/home">Start Making pull requests!</A>
        </div>
    }

    console.log(ToRender)

    return (
        <>
            {ToRender}
            {
                show === true ?
                <div>
                    <div className="font-space-mono font-size-18 app-text-accent">
                    Create Your Fork
                    </div>
                    <button 
                        className="m-2 border-0 px-3 py-2 font-space-mono app-bg-t-main font-size-18 text-white" 
                        onClick={() => handleClickFork()}>
                            Create
                    </button>
                </div>:
                null
            }
        </>
    )

}

const MyFiles = withAuthLoad(({onClick, fromFork = false}) => {
    
    const {user} = useLoginContext()
    const {loading, error, data} = useGitFetchAsync(
        GitConst.GetAllFiles, 
        { username: (fromFork=== true ? user.username : PRIME_USER), repo: PRIME_REPO, filename: user.username },
        null,
        null
    )

    const handleClick = (index) => {
        onClick(data[index])
    }

    let component
    if(loading === true) {
        component = <LoadingComponent  />
    } else if(error !== null) {
        component = (fromFork === true ? <CreateFork /> : <DataTile text="No Local repo found" author="fork here" />)
    } else if(data !== null) {
        component = data.map((item, index) => <DataTile key={index} text={item.name.split(".")[0]} author={user.username} onClick={() => handleClick(index)}/>)
    }

    return <div className="row">
        <div className="col-12 font-size-18 app-text-bg-accent font-space-mono">{fromFork === true ? "My Fork" : "My Pulls"}</div>
        <div className="col-12">
            {component}
        </div>
    </div>
})

export default MyFiles