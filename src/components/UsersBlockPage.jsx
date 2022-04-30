import React from "react";
import UserBlockList from "./userspage/UserBlockList";
import {inject, observer} from "mobx-react";
import userStore from "../store/UserStore";
import HeadItem from "./postcomp/HeadItem";
import PlayerItem from "./player/PlayerItem";


const UsersBlockPage = inject('postsStore', 'songsStore', 'userStore', 'user')(observer(({postsStore, songsStore, userStore, user}) => {
    return (
        <div>
            <HeadItem/>
            <div className="user_block_list">
                <h1>Пользователи</h1>
                <UserBlockList users={userStore.getUsers()}/>
            </div>
            <div className="empty"/>
            <PlayerItem/>
        </div>

    )
}))
export default UsersBlockPage