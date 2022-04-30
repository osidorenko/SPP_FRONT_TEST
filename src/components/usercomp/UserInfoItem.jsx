import React from "react";
import avatar from "../png/defAvatar.png";

const UserInfoItem = ({user}) => {


    return (
        <div className="user__info">
            <div>
                {user.picture === undefined ? (
                    <img src={avatar} width={200} height={200}/>
                ) : (
                    <img src={"http://localhost:8100/files/photo/" + user.picture.name} width={200} height={200}/>
                )}

            </div>
            <div className="user__info__content">
                {user.name === undefined ? (
                    <h1>NO username</h1>
                ) : (
                    <h1>{user.name}</h1>
                )}
            </div>

        </div>
    )
}
export default UserInfoItem;