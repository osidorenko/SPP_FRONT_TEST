import React from "react";
import PostList from "./postcomp/PostList";
import postsStore from "../store/PostsStore";
import {observer} from "mobx-react";


const PostsPage = observer(() => {
        return (
            <div>
                <PostList posts={postsStore.posts}/>
                <button onClick={() => postsStore.getTwoPosts()}>Следующий пост</button>
            </div>
        )
    }
)
export default PostsPage
