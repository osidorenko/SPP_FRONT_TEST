import React from "react";
import PostList from "./postcomp/PostList";
import postsStore from "../store/PostsStore";
import {observer} from "mobx-react";


const PostsPage = observer(() => {
        return (
            <div>
                <PostList posts={postsStore.posts} title={"1.SHIT POSTS LIST"}/>
                <button onClick={()=>postsStore.getNextPosts()}>doRequest</button>
            </div>
        )
    }
)
export default PostsPage