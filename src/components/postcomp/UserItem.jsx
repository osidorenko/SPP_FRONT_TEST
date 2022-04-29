import React from "react";

const UserItem = ({user}) => {


    const nameStyle = {
        top: '50%',
        left: '50%',
        marginTop: '-5px',
        marginLeft: '-5px'
    }

    return (
        <div className="user_comment">
            <ul className="hr">
                <li>
                    {user.picture !== undefined ?
                        <a href="https://vk.com/feed">
                            <img src={"http://localhost:8100/files/photo/" + user.picture.name}
                                 alt={""} width={50} height={50}/></a> : 'No?'}</li>
            </ul>
            <h3 style={nameStyle}> {user.name}</h3>
        </div>
    );
}
export default UserItem;
