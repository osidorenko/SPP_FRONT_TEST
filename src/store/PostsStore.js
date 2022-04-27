import {action, makeAutoObservable, observable, runInAction} from "mobx";

class PostsStore {
    @observable posts = []
    @observable text = '';
    @observable text_form_editor
    pCurrent = 0
    @observable commentsPost = []

    constructor() {
        this.getNextPosts()
    }

    @action
    setText = (value) => {
        this.text = value
    }

    @action
    getNextPosts() {
        const request = new XMLHttpRequest();
        request.open("GET", "http://localhost:8100/posts/" + this.pCurrent, true);
        request.onload = () => {
            console.log(request.status + " " + this.pCurrent)
            if (request.status === 200) {
                let post = JSON.parse(request.responseText)
                /*const bufferComments = {id: post.id, comments: post.comments}
                runInAction(() => this.commentsPost.push(bufferComments));
                post.comments = []*/
                runInAction(() => {
                    post.comments.sort(function (a, b) {
                            if (a.date > b.date) {
                                return 1
                            }
                            if (a.date < b.date) {
                                return -1
                            }
                            if (a.time > b.time) {
                                return 1
                            }
                            if (a.time < b.time) {
                                return -1;
                            }
                            return 0
                        }
                    )
                    const bufferComments = {
                        id: post.id,
                        comments: post.comments,
                        comment_count_view: 0,
                        comment_count: post.comments.length
                    }
                    this.commentsPost.push(bufferComments)
                    post.comments = []
                    this.posts.push(post)
                    this.getNextComments(post.id, 2)
                })
                this.pCurrent = this.pCurrent + 1
            } else {
                if (request.status === 404) {
                    this.pCurrent = this.pCurrent + 1
                    if (this.pCurrent < 10) {
                        this.getNextPosts()
                    }
                }
            }
        }
        //request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.send(null)

    }

    @action haveNextComments(post_id) {
        let l = 0;
        let i = 0;
        for (i = 0; i < this.commentsPost.length; i++) {
            if (this.commentsPost[i].id === post_id) {
                l = i
            }
        }
        if (this.commentsPost[l].comment_count_view <= this.commentsPost[l].comment_count) {
            return true
        }
        return false
    }

    @action getNextComments(post_id, addMuch) {
        let l = 0;
        let i = 0;
        for (i = 0; i < this.commentsPost.length; i++) {
            if (this.commentsPost[i].id === post_id) {
                l = i
            }
        }

        let temppost = this.posts[l];
        let tempcomments = [];
        /*if (this.commentsPost[l].comment_count <= temppost.comments) {
            return
        }*/
        this.commentsPost[l].comment_count_view += addMuch
        for (i = 0; i < this.commentsPost[l].comment_count && i < this.commentsPost[l].comment_count_view; i++) {
            tempcomments.push(this.commentsPost[l].comments[i])
        }
        temppost.comments = tempcomments
        this.posts.splice(l, 1, temppost);
    }


    @action addNewComment(post_id, addedcomment) {

        let l = 0;
        let i = 0;
        for (i = 0; i < this.posts.length; i++) {
            if (this.posts[i].id === post_id) {
                l = i
            }
        }
        let temp = this.commentsPost[l]
        temp.comments.push(addedcomment)
        temp.comment_count=temp.comment_count+1
        this.commentsPost.slice(l, 1, temp)

        /*
        let temppost = this.posts[l];
        console.log("addedcomment")
        console.log(addedcomment)

        temppost.comments.push(addedcomment)
        this.posts.splice(l, 1, temppost);
        const bufferComments = {
            id: temppost.id,
            comments: temppost.comments,
            comment_count_view: 1000,
            comment_count: temppost.comments.length
        }
        this.commentsPost.slice(l, 1, bufferComments)*/
        //this.commentsPost[l].comments = this.posts[l].comments
        /*this.posts.map((post) => {
                if (post.id === post_id) {
                    post.comments.push(addedcomment)
                }
            }*/
        this.getNextComments(post_id, 1000)
        this.setText('');
    }


}

export default new PostsStore()
