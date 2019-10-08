import React from 'react'
import { useLoginContext } from 'context'
import { useGitFetchAsync } from 'components/useFetchAsync'
import { GitConst, PRIME_USER, PRIME_REPO } from 'apiroutes'
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
        component = <DataTile text="No Pulls" author="create New pull"/>
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