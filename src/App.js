import React, {useState} from "react";
import './css/app.css'
import UserPage from "./components/UserPage";
import UsersBlockPage from "./components/UsersBlockPage";
import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import PostsPage from "./components/PostsPage";
import NewsPage from "./components/NewsPage";
import SongChoose from "./components/editorscomp/SongChoose";
import NowPlayItem from "./components/player/NowPlayItem";

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
                    <Route path="/posts">
                        <NewsPage/>
                    </Route>
                    <Route path="/choose">
                        <SongChoose/>
                    </Route>
                    <Route path="/nowplay">
                        <NowPlayItem/>
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
