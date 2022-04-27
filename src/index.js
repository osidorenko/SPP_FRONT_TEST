import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";
import postsStore from "./store/PostsStore";
import {observer, inject, Provider} from "mobx-react"
import musicStore from "./store/MusicStore";

export const User = {
    id: 2,
    name: "Nirvana",
    picture: {
        id: 1,
        name: "defAvatar1.png"
    }
}
const stores = {
    postsStore,
    musicStore,
    user: User
}
ReactDOM.render(
    <Provider {...stores}><App/></Provider>,
    document.getElementById('root')
)