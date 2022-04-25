import React from "react";
import UserItem from "./UserItem";
import DataItem from "./DataItem";

const CommetnItem = ({comment}) => {
    return (
        <div className="comment">
            <div className="comment_head">
                <UserItem user={comment.user}/>
                <div className="comment_content">
                    <h4>{comment.message}</h4>
                </div>
                <DataItem date={comment.date} time={comment.time}/>
            </div>
        </div>
    );
}

export default CommetnItem;