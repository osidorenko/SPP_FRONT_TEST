import React from "react";
import {inject, observer} from "mobx-react";
import userStore from "../../store/UserStore";
import {Link} from "react-router-dom";

const UserBlockItem = inject('postsStore', 'songsStore', 'userStore', 'user')(observer(({postsStore, songsStore, userStore, user, puser}) => {
    return (
        <Link to="/user">
            <div className="user_block_item" onClick={() => {
                userStore.reBuild(puser.id, user)
            }}>
                <img src={"http://localhost:8100/files/photo/" + puser.picture.name} className="user_avatar"/>
                <div style={{height: "30px"}}></div>
                <h3 style={{textAlign: "center"}}>{puser.name}</h3>
            </div>
        </Link>
    )
}))
export default UserBlockItem;