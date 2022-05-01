import React from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

const UserItem = inject('userStore', 'user')(observer(({userStore, user, puser}) => {


    const nameStyle = {
        top: '50%',
        left: '50%',
        marginTop: '-5px',
        marginLeft: '-5px'
    }

    return (
        <Link to="/user">
            <div className="user_comment" onClick={() => {
                userStore.reBuild(puser.id, user)
            }}>
                <ul className="hr">
                    <li>
                        {puser.picture !== undefined ?
                            <a>
                                <img style={{borderRadius: "120px"}}
                                     src={"http://localhost:8100/files/photo/" + puser.picture.name}
                                     alt={""} width={50} height={50}/></a> : 'No?'}</li>
                </ul>
                <h3 style={nameStyle}> {puser.name}</h3>
            </div>
        </Link>
    );
}))
export default UserItem;
