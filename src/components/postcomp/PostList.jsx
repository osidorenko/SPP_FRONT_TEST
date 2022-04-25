import React from 'react';
import PostItem from "./PostItem";
import ClassPostItem from "./ClassPostItem";

const PostList = ({posts, title}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            {
                posts.map((post) =>
                    <ClassPostItem post={post} key={post.id}/>
                )}
        </div>
    );
};

export default PostList;