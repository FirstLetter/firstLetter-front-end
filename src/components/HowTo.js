import React from 'react'

export const Howto = () => {
    return <div className="container">
            <div className="row">
            <div className="col-12 rounded py-2 font-ibm-plex-mono font-size-18 text-light app-text-main w-100" style={{wordWrap: "break-word"}}>
                <h1 className="app-text-white">Introduction</h1>
                <p className="app-text-gray">Hi, I am <a className="text-decoration-none app-text-bg-accent app-text-blue-light-hover" href="https://vermakartik.github.io">Kartik Verma</a>. I am a web developer and an android developer. </p>
                <p className="app-text-gray">
                    This is my contribution towards the Hacktober fest. I am providing an easy way for techies as well as non-techies to contribute to open source. Open source is not just about writing code. When you share your knowledge <strong>openly</strong> then I consider it open source development. 
                </p>
                <br />
                <h1 className="app-text-white">How to?</h1>
                <p className="app-text-gray">
                    A simple three Step Process to win a free <b>Hacktober T-shirt</b> this October:
                    <ul style={{listStylePosition: "inside"}}>
                        <li>Create your <a className="text-decoration-none app-text-bg-accent app-text-blue-light-hover" href="https://github.com/">Github</a> account. </li>
                        <li>Register on <a className="text-decoration-none app-text-bg-accent app-text-blue-light-hover" href="https://https://hacktoberfest.digitalocean.com/">hacktoberfest website</a> to track your pull requests.</li>
                        <li>Sign In to First Letter with your github account. And Share your knowledge about programming or any personal experiences that you would like to share using <a  className="text-decoration-none app-text-bg-accent app-text-blue-light-hover" href="https://guides.github.com/features/mastering-markdown/">markdown</a></li>
                    </ul>
                </p>
                <p className="app-text-gray">
                    You have to make at least <strong>4 pull requests</strong>. To keep things simple please keep it <strong>One at a time. </strong> 
                    i.e. create a file then send the pull request, and wait for your merge. To see details about your pull requests visit the link https://github.com/&lt;your-github-username&gt;. 
                </p>
                <br />
                <h1 className="app-text-white">Why this project</h1>
                <p className="app-text-gray">
                    As the world is moving fast paced towards the era of Artificial Intelligence, Virtual Reality/ Augumented Reality where the programming becomes too much complex to write, I believe that the traditional ways of doing development will not be able to cope up with it. 
                </p>
                <p className="app-text-gray">
                    Here I am trying to support GUI based programming, where as a developer, I will be able to focus on solving the main problem and not just write tons of code again and again.
                </p>
                <p className="app-text-gray">
                    Here, by making this project, I am trying to make a small contribution towards the GUI based development by allowing people to make commits, and pull requests easily, without going to command line.
                </p>
            </div>
        </div>
    </div>
}
