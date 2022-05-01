import React, {useState} from "react";
import {observer, inject, Provider} from "mobx-react"
import {observable} from "mobx";


import './css/app.css'


import PlayerItem from "./components/player/PlayerItem";
import HeadItem from "./components/postcomp/HeadItem";
import PostsPage from "./components/PostsPage";
import UserInfoItem from "./components/usercomp/UserInfoItem";
import MusicUserItem from "./components/usercomp/MusicUserItem";
import MusicEditor from "./components/editorscomp/MusicEditor";
import UserPage from "./components/UserPage";
import userStore from "./store/UserStore";
import UserBlockItem from "./components/userspage/UserBlockItem";
import UsersBlockPage from "./components/UsersBlockPage";
import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import PostsStore from "./store/PostsStore";

let pCurrent = 0

var user = {
    id: 2,
    name: "Nirvana",
    picture: {
        id: 1,
        name: "defAvatar1.png"
    }
}

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/users">
                        <UsersBlockPage/>
                    </Route>
                    <Route path="/user">
                        <UserPage/>
                    </Route>
                    <Route path="/">
                        <UsersBlockPage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
