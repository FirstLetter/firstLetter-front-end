import React from 'react'
import { SigninAttempt } from "components/SignInAttempt/SiginAttempt";
import { Home } from "components/Home/Home";
import { Content } from "components/Content/Content";
import { Explore } from 'components/Explore/Explore';
import { Letter } from 'components/Letter/Letter';

export const routes = {
    "/user/signin/:username": ({username}) => <SigninAttempt username={username} />,
    "/home": () => <Home />,
    "/content": () => <Content />,
    "/explore": () => <Explore />,
    "/letter/:username/:lettername": ({username, lettername}) => <Letter username={username} lettername={lettername} />
}

