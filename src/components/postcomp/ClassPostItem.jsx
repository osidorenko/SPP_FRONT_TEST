import React from "react";
import UserItem from "./UserItem";
import content from "../png/content.png";
import DataItem from "./DataItem";
import CommentList from "./CommentList";
import CommentEditor from "../editorscomp/CommentEditor";
import {inject, observer} from "mobx-react";
import postsStore from "../../store/PostsStore"
import MusicListItem from "../usercomp/MusicListItem";

const ClassPostItem2 = inject('postsStore')(observer(({post}) => {

        return (
            <div className="post">
                <div>
                    <div className="post__content">
                        <UserItem user={post.user}/>
                        <p className="text_post">
                            {post.message}
                        </p>
                        {post !== undefined && post.picture !== undefined && post.picture != null ? (
                            <img src={"http://localhost:8100/files/photo/" + post.picture.name}
                                 width={500}
                                 height={500} alt={content}/>

                        ) : (
                            <div>
                                <img src={content} width={500}
                                     height={500}/>
                            </div>
                        )}

                        {
                            post.songs.length !== 0 ? (
                                <MusicListItem songs_data={post.songName}/>
                            ) : (
                                <div/>
                            )
                        }
                        <DataItem date={post.date} time={post.time}/>
                    </div>
                    <CommentList comments={post.comments}/>
                    {
                        postsStore.haveNextComments(post.id) ? (
                            <button onClick={() => postsStore.getNextComments(post.id, 5)}>NEXT 5</button>
                        ) : (<div/>)
                    }
                    <CommentEditor id={post.id}/>
                </div>
            </div>
        )
    }
    )
)

export default ClassPostItem2
