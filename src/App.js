import React, {useState} from "react";
import {observer, inject, Provider} from "mobx-react"
import {observable} from "mobx";


import Counter from "./components/postcomp/Counter";


import './css/app.css'

import ClassPostsPage from "./components/ClassPostsPage";
import PlayerItem from "./components/player/PlayerItem";
import PlayerItemPost from "./components/player/PlayerItemPost";
import HeadItem from "./components/postcomp/HeadItem";
import ClassAuthorizationItem from "./components/ClassAuthorizationItem";
import UserInfoItem from "./components/usercomp/UserInfoItem";
import ClassMusicItem from "./components/usercomp/ClassMusicItem";
import MusicListItem from "./components/usercomp/MusicListItem";
import postsStore from "./store/PostsStore"
import PostsPage from "./components/PostsPage";
import PlayerItemCOPY from "./components/player/PlayerItemCOPY";
import PostsEditor from "./components/PostsEditor";

let pCurrent = 0

function App() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            user: {
                id: 2,
                name: "Nirvana",
                picture: {
                    id: 1,
                    name: "Screenshot 2021-05-25 at 15.37.46.png"
                }
            },
            message: "Nirvana new song listen every one " +
                "Something in the way ",
            picture: {
                id: 1,
                name: "Screenshot 2021-05-25 at 15.37.46.png"
            },

            songName: "Something in the way",
            comments: [
                {
                    id: 1,
                    post: 1,
                    user: {
                        id: 4,
                        name: "olegsidor538",
                        picture: {
                            id: 2,
                            name: "picture2.png"
                        }
                    },
                    date: "2022-03-24",
                    time: "12:48:50",
                    message: "good song i love it",
                    author: "olegsidorenko538"
                }, {
                    id: 1,
                    post: 1,
                    user: {
                        id: 4,
                        name: "olegsidor538",
                        picture: {
                            id: 2,
                            name: "picture2.png"
                        }
                    },
                    date: "2022-03-24",
                    time: "12:48:50",
                    message: "good song i love it",
                    author: "olegsidorenko538"
                }, {
                    id: 1,
                    post: 1,
                    user: {
                        id: 4,
                        name: "olegsidor538",
                        picture: {
                            id: 2,
                            name: "picture2.png"
                        }
                    },
                    date: "2022-03-24",
                    time: "12:48:50",
                    message: "good song i love it",
                    author: "olegsidorenko538"
                }
            ],
            date: "2022-03-31",
            time: "22:41:39"
        }
    ])

    const songs = [{
        id: 14,
        user: {
            id: 2,
            name: "ATL",
            picture: {
                id: 1,
                name: "defAvatar1.png"
            }
        },
        songName: "ATL.mp3",
        picture: {
            id: 1,
            name: "defAvatar1.png"
        },
        song: {
            id: 1,
            name: "Гори ясно",
            author: "ATL",
            lasting: 2.5,
            raiting: 3.5,
            gengre: "Rock"
        }
    }, {
        id: 14,
        user: {
            id: 2,
            name: "Nirvana",
            picture: {
                id: 1,
                name: "content.png"
            }
        },
        songName: "NirvanaSINW.mp3",
        picture: {
            id: 1,
            name: "content.png"
        },
        song: {
            id: 2,
            name: "Something in the way...",
            author: "Nirvana",
            lasting: 2.5,
            raiting: 3.5,
            gengre: "Rock"
        }
    }, {
        id: 14,
        user: {
            id: 2,
            name: "Nirvana",
            picture: {
                id: 1,
                name: "defAvatar1.png"
            }
        },
        songName: "NirvanaSINW.mp3",
        picture: {
            id: 1,
            name: "defAvatar1.png"
        },
        song: {
            id: 3,
            name: "Something in the way...",
            author: "Nirvana",
            lasting: 2.5,
            raiting: 3.5,
            gengre: "Rock"
        }
    }]

    const [songs_data, setSongs_data] = useState([
        /*{
            id: 14,
            user: {
                id: 2,
                name: "Nirvana",
                picture: {
                    id: 1,
                    name: "content.png"
                }
            },
            songName: "NirvanaSINW.mp3",
            picture: {
                id: 1,
                name: "content.png"
            },
            song: {
                id: 1,
                name: "Something in the way...",
                author: "Nirvana",
                lasting: 2.5,
                raiting: 3.5,
                gengre: "Rock"
            }
        }*/
    ])

    const user = {
        id: 2,
        name: "Nirvana",
        picture: {
            id: 1,
            name: "Screenshot 2021-05-25 at 15.37.46.png"
        }
    }

    const createMusic = (newMusic) => {
        setSongs_data([])
        let songs = []
        newMusic.map((song) =>
            songs.push(song)
        )
        setSongs_data(songs)
    }

    return (
        <div className="App">
            <HeadItem/>

            <PostsEditor/>
            {/*<PostsPage/>*/}

            {/*
            <div className="post">
                <MusicListItem create={createMusic} songs_data={songs}/>
            </div>
            <PlayerItem songs_data={songs_data}/>*/}
            <div className="empty"/>

            {/*<ClassPostsPage/>*/}
            {/*<UserInfoItem user={user}/>
            <div><PlayerItem songs_data={songs_data} /></div>
            <ClassPostsPage/>
            <div className="empty"/>*/}
        </div>
    )

}

export default App;
