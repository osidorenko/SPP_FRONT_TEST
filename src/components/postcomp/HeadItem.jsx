import React from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

const HeadItem = inject('postsStore', 'songsStore', 'userStore', 'user')(observer(({postsStore, songsStore, userStore, user}) => {

    return (
        <ul className="header_main">
            <div className="logo_main">
                <h1>SocialMusic</h1>
                <Link to="users">
                    <div>
                        <button>Пользователи</button>
                    </div>
                </Link>
                <Link to="user">
                    <div onClick={() => {
                        userStore.reBuild(user.id, user)
                    }}>
                        <button>домой</button>
                    </div>
                </Link>
            </div>

        </ul>
    );
}))
export default HeadItem;