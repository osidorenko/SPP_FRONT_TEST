import React from "react";
import CommetnItem from "./CommentItem";


const CommentList = ({comments}) => {
    return (
        <div>
            {
                comments.map((comment) =>
                    <CommetnItem comment={comment} key={comment.id}/>
                )
            }
        </div>
    );
}
export default CommentList;