import React from "react";
import UserItem from "./UserItem";
import content from "../png/content.png";
import DataItem from "./DataItem";
import CommentList from "./CommentList";
import CommentEditor from "../CommentEditor";
import HeadItem from "./HeadItem";
import PlayerItemPost from "../player/PlayerItemPost";
import ClassMusicItem from "../usercomp/ClassMusicItem";

const song_data = {
    id: 14,
    user: {
        id: 2,
        name: "Nirvana",
        picture: {
            id: 1,
            name: "defAvatar1.png"
        }
    },
    songName: "ATL.mp3",
    picture: {
        id: 1,
        name: "defAvatar1.png"
    },
    song: {
        id: 1,
        name: "Гори ясно",
        author: "ATL",
        lasting: 2.5,
        raiting: 3.5,
        gengre: "Rock"
    }
}

class ClassPostItem extends React.Component {

    constructor(props) {
        super(props);
        this.props = props
        this.state = {
            counter: 0,
            comment_count: 2,
            comments: [],
            isHaveNextComments: true,
            isPicturePost: true,
            isMusicPost: true
        }
        this.getNext = this.getNext.bind(this);
        this.init = this.init.bind(this)
    }

    getNext() {
        this.state.comment_count += 10
        //this.setState({comment_count: this.state.comment_count + 10})
        this.init()
    }

    init() {
        let i = this.state.counter
        let comments1 = this.state.comments
        let doW = this.state.comment_count
        while (i < doW) {
            if (i >= this.props.post.comments.length) {
                this.state.isHaveNextComments = false;
                break

            }
            let comment = this.props.post.comments[i]
            comments1.push(comment)
            i++
        }
        this.setState({counter: i})
        this.setState({comments: comments1})
    }

    componentDidMount() {
        this.init()
        let post = this.props.post
        if (post.picture.name === '') {
            this.state.isPicturePost = false;
        }
        if (post.songName === "") {
            this.state.isMusicPost = false;
        }
    }

    render() {
        return (
            <div className="post">
                <div>
                    <div className="post__content">
                        <UserItem user={this.props.post.user}/>

                        <h3>
                            {this.props.post.message}
                        </h3>
                        {this.state.isPicturePost ? (
                            <img src={"http://localhost:8100//files/photo/" + this.props.post.picture.name}
                                 width={500}
                                 height={500} alt={content}/>

                        ) : (
                            <div/>
                        )}

                        {
                            this.state.isMusicPost ? (
                                <ClassMusicItem song_data={song_data}/>
                                /*<PlayerItemPost song={song_data.song} song_data={song_data}/>*/
                            ) : (
                                <div/>
                            )

                        }
                        <DataItem date={this.props.post.date} time={this.props.post.time}/>

                    </div>
                    <CommentList comments={this.state.comments}/>
                    {
                        this.state.isHaveNextComments ? (
                            <button
                                onClick={this.getNext}>NEXT {(this.props.post.comments.length - this.state.comment_count) > 10 ? 10 : this.props.post.comments.length - this.state.comment_count}</button>
                        ) : (
                            <div/>
                        )
                    }
                    {/*<button onClick={this.getNext}>NEXT 10</button>*/}
                    <CommentEditor user={this.props.post.user} props={this.props}/>
                </div>
            </div>
        )
    }
}

export default ClassPostItem