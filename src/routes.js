import React from 'react'
import { SigninAttempt } from "components/SignInAttempt/SiginAttempt";
import { Home } from "components/Home/Home";
import { Content } from "components/Content/Content";
import { Explore } from 'components/Explore/Explore';

export const routes = {
    "/user/signin/:username": ({username}) => <SigninAttempt username={username} />,
    "/home": () => <Home />,
    "/content": () => <Content />,
    "/explore": () => <Explore />
}

