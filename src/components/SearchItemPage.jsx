import React from "react";
import {inject, observer} from "mobx-react";
import HeadItem from "./postcomp/HeadItem";
import PlayerItem from "./player/PlayerItem";
import MusicUserItem from "./usercomp/MusicUserItem";
import PostsPage from "./PostsPage";
import UserBlockList from "./userspage/UserBlockList";
import MusicListItem from "./usercomp/MusicListItem";
import searchStore from "../store/SearchStore"
import postsStore from "../store/PostsStore"
import songsStore from "../store/SongsStore"

const SearchItemPage = inject('searchStore', 'postsStore', 'songsStore', 'userStore', 'user')(observer(({user}) => {

    //todo test music store
    //todo users
    //todo posts
    //todo all controll
    return (
        <div>
            <HeadItem/>
            <div>
                <h1>Поиск</h1>
                <input type="text" size={120} value={searchStore.text}
                       onChange={event => searchStore.setText(event.target.value)}
                />
                <button onClick={() => searchStore.doSearch(user)}>Поиск</button>
            </div>


            {searchStore.isFind ? (
                <div>
                    <div>
                        {(searchStore.users.length === 0 && songsStore.getSongsSize() === 0 && postsStore.getPostsSize() === 0) ? (
                            <h2>По вашему запросу ничего не найдено</h2>
                        ) : (
                            <div/>
                        )}
                    </div>

                    <div>
                        {searchStore.users.length !== 0 ? (
                            <div>
                                <h2>Пользователи по запросу</h2>
                                <UserBlockList users={searchStore.users}/>
                            </div>
                        ) : (
                            <div/>
                        )}
                    </div>
                    <div>
                        {songsStore.getSongsSize() !== 0 ? (
                            <div>
                                <h2>Музыка по запросу</h2>
                                <MusicUserItem isLove={false}/>
                            </div>
                        ) : (
                            <div/>
                        )}
                    </div>
                    <div>
                        {postsStore.getPostsSize() !== 0 ? (
                            <div>
                                <h2>Посты по запросу</h2>
                                <PostsPage/>
                            </div>
                        ) : (
                            <div/>
                        )}
                    </div>
                </div>
            ) : (
                <div/>
            )}
            <div className="empty"/>
            <PlayerItem/>
        </div>
    );
}))
export default SearchItemPage;