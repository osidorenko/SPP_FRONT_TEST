import React from "react";
import avatar from "../png/defAvatar.png";

const UserInfoItem = ({user}) => {


    return (
        <div className="user__info">
            <div>
                <img src={avatar} width={200} height={200}/>
            </div>

            <div className="user__info__content">
                <h1>{user.name}</h1>
            </div>

        </div>
    )
}
export default UserInfoItem;