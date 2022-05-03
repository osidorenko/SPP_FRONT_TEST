import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";
import postsStore from "./store/PostsStore";
import {observer, inject, Provider} from "mobx-react"
import musicStore from "./store/MusicStore";
import postEditorStore from "./store/PostEditorStore"
import musicEditorStore from "./store/MusicEditorStore"
import userStore from "./store/UserStore"
import songsStore from "./store/SongsStore"
import userRegistrationStore from "./store/UserRegistrationStore"
import userLoginStore from "./store/UserLoginStore"


/*export const User = {
    id: 2,
    name: "Nirvana",
    picture: {
        id: 1,
        name: "defAvatar1.png"
    }
}*/
/*
export const User = {
    id: 3,
    name: "alexs",
    picture: {
        id: 12,
        name: "alexava.png"
    }
}
*/

export const User = {
    id: 6,
    name: "KALEO",
    picture: {
        id: 999,
        name: "kaleoava.png"
    }
}
/*export const User = {
    id: 4,
    name: "olegsidor538",
    picture: {
        id: 13,
        name: "radio.png"
    }
}*/

const stores = {
    userStore,
    postsStore,
    musicStore,
    postEditorStore,
    musicEditorStore,
    songsStore,
    userRegistrationStore,
    userLoginStore,
    user: User
}
ReactDOM.render(
    <Provider {...stores}><App/></Provider>,
    document.getElementById('root')
)