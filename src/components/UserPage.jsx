import React, {useState} from "react";
import HeadItem from "./postcomp/HeadItem";
import UserInfoItem from "./usercomp/UserInfoItem";
import MusicEditor from "./editorscomp/MusicEditor";
import MusicUserItem from "./usercomp/MusicUserItem";
import PostsPage from "./PostsPage";
import PostsEditor from "./editorscomp/PostsEditor";
import PlayerItem from "./player/PlayerItem";
import postsStore from "../store/PostsStore";
import songsStore from "../store/SongsStore";
import userStore from "../store/UserStore";
import {inject, observer} from "mobx-react";


const UserPage = inject('postsStore', 'songsStore', 'userStore', 'user')(observer(({postsStore, songsStore, userStore, user}) => {
        return (

            <div>
                <HeadItem/>
                {user.name === '' ? (
                    <div>
                        <h1>Вы не вошли в профиль</h1>
                    </div>
                ) : (
                    <div>

                        <UserInfoItem user={userStore.user}/>
                        <button onClick={() => {
                            userStore.setIsPosts(true)
                            userStore.setIsAddMusic(false, user)
                        }}>Посты
                        </button>
                        <button onClick={() => {
                            userStore.setIsPosts(false)
                            userStore.setIsAddPost(false, user)
                        }}>Музыка
                        </button>
                        {userStore.isPosts ? (
                            <div>
                                {userStore.isAddPost ? (
                                    <div>
                                        <button onClick={() => {
                                            userStore.setIsAddPost(false, user)
                                        }}>Отмена
                                        </button>
                                        <PostsEditor/>
                                    </div>

                                ) : (
                                    <div>
                                        {userStore.isHaveRules ? (
                                            <button onClick={() => {
                                                userStore.setIsAddPost(true, user)
                                            }}>Добавить пост
                                            </button>
                                        ) : (
                                            <div/>
                                        )}
                                        <PostsPage/>
                                    </div>
                                )
                                }
                            </div>
                        ) : (
                            <div>
                                {userStore.isAddMusic ? (
                                    <div>
                                        <button onClick={() => {
                                            userStore.setIsAddMusic(false, user)
                                        }}>Отмена
                                        </button>
                                        <MusicEditor/>
                                    </div>
                                ) : (
                                    <div>
                                        {userStore.isHaveRules ? (
                                            <button onClick={() => {
                                                userStore.setIsAddMusic(true, user)
                                            }}>Добавить трек
                                            </button>
                                        ) : (
                                            <div/>
                                        )}

                                        <MusicUserItem isLove={false} title="Популярные треки"/>
                                        {userStore.isHaveRules ? (
                                            <MusicUserItem isLove={true} title="Любимые треки"/>
                                        ) : (
                                            <div/>
                                        )
                                        }
                                    </div>
                                )
                                }
                            </div>
                        )
                        }
                        <div className="empty"/>
                        <PlayerItem/>
                    </div>
                )}
            </div>
        )
    }
    )
)
export default UserPage