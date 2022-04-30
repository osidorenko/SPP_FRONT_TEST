import React from "react";
import UserBlockItem from "./UserBlockItem";

const UserBlockList = ({users}) => {
    var i = 0
    return (
        <div className="u3ser_block_list_">
            {users !== undefined && users.length !== 0 ? (
                users.map((user) =>
                    <UserBlockItem puser={user} key={user.id}/>
                )
            ) : (
                <div>
                    <h1>Нет пользователей</h1>
                </div>
            )}

        </div>
    )
}
export default UserBlockList