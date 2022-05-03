import {action, observable, runInAction} from "mobx";
import userStore from "../store/UserStore";
import {observer} from "mobx-react";

class PostsStore {
    @observable posts = []
    @observable text = '';
    @observable text_form_editor
    @observable commentsPost = []
    @observable socialPost = []
    user /*= {
        id: 2,
        name: "Nirvana",
        picture: {
            id: 1,
            name: "defAvatar1.png"
        }
    }*/
    hashmap = new Map()
    pCurrent = 0
    postsToRequestCounter = []
    mainuser

    setUser(user, mainuser) {
        this.mainuser = mainuser
        this.user = user
        this.posts = []
        this.text = '';
        this.commentsPost = []
        this.pCurrent = 0
        this.postsToRequestCounter = []
        this.hashmap = new Map()
        this.socialPost = []
        var first = this.getListToUser()
    }

    setPosts(mainuser) {
        this.mainuser = mainuser
        this.posts = []
        this.text = '';
        this.commentsPost = []
        this.pCurrent = 0
        this.postsToRequestCounter = []
        this.hashmap = new Map()
        this.socialPost = []
        this.getAllList()
    }


    constructor() {
        //var first = this.getListToUser()
        //this.user = userStore.user

    }

    @action
    getTwoPosts() {
        //this.getNextPosts()
        this.getNextPosts()
    }

    @action
    setText = (value) => {
        this.text = value
    }


    getAllList() {
        var postsIds = []
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("http://localhost:8100/app/posts/all", requestOptions)
            .then(response => response.text())
            .then(result => {
                    var list = JSON.parse(result)
                    var i = 0
                    for (i = list.length - 1; i >= 0; i--) {
                        postsIds.push(list[i][0])
                    }
                    this.setPostsIDs(postsIds)
                    this.getNextPosts(postsIds[0])
                }
            )
            .catch(error => console.log('error', error));
    }

    getListToUser() {
        var myHeaders = new Headers();
        var postsIds = []

        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("http://localhost:8100/app/posts/to/author/" + this.user.id, requestOptions)
            .then(response => response.text())
            .then(result => {
                var list = JSON.parse(result)
                var i = 0
                for (i = list.length - 1; i >= 0; i--) {
                    postsIds.push(list[i][0])
                }
                this.setPostsIDs(postsIds)
                this.getNextPosts(postsIds[0])
            })
            .catch(error => console.log('error', error));
    }

    setPostsIDs(postsIds) {
        this.postsToRequestCounter = postsIds
    }

    @action
    getNextPosts(firstpostID) {
        const request = new XMLHttpRequest();
        var req = this.postsToRequestCounter[this.pCurrent]

        if (req === undefined) {
            req = firstpostID;
            this.pCurrent = this.pCurrent + 1
        }
        if (req === undefined) {
            return
        }
        request.open("GET", "http://localhost:8100/app/posts/" + req, true);
        request.onload = () => {
            console.log(request.status + " " + this.postsToRequestCounter[this.pCurrent])
            if (request.status === 200) {
                let post = JSON.parse(request.responseText)
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
                    var social = {
                        l: 0,
                        dl: 0,
                        isL: false,
                        isDL: false
                    }
                    var lks = post.likes
                    var i = 0
                    for (i = 0; i < lks.length; i++) {
                        if (lks[i].like === 0) {
                            social.l = social.l + 1
                        } else {
                            social.dl = social.dl + 1
                        }
                        if (lks[i].user === this.mainuser.id) {
                            if (lks[i].like === 0) {
                                social.isL = true
                            } else {
                                social.isDL = true
                            }
                        }
                    }
                    this.hashmap.set(post.id, this.pCurrent)
                    this.socialPost.push(social)
                    const bufferComments = {
                        id: post.id,
                        comments: post.comments,
                        comment_count_view: 0,
                        comment_count: post.comments.length
                    }
                    this.commentsPost.push(bufferComments)
                    post.comments = []
                    var songs = []
                    post.songs.map((songm2m) =>
                        songs.push(songm2m.songData)
                    )
                    post.songName = songs
                    this.posts.push(post)
                    this.getNextComments(post.id, 2)
                })
                this.pCurrent = this.pCurrent + 1
            } else {

            }
        }
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
        temp.comment_count = temp.comment_count + 1
        this.commentsPost.slice(l, 1, temp)
        this.getNextComments(post_id, 1000)
        this.setText('');
    }

    @action
    clickLike(post_id, user_id) {
        var i = this.hashmap.get(post_id)
        var soc = this.socialPost[i]
        this.deleteLike(user_id, post_id)
        if (soc.isL) {
            soc.isL = false
            soc.l = soc.l - 1
        } else {
            soc.isL = true
            if (soc.isDL) {
                soc.dl = soc.dl - 1
                soc.isDL = false
            }
            soc.l = soc.l + 1
            this.addLike(user_id, post_id)
        }
        this.socialPost[i] = soc

    }

    @action
    clickDisLike(post_id, user_id) {
        var i = this.hashmap.get(post_id)
        var soc = this.socialPost[i]
        this.deleteLike(user_id, post_id)
        if (soc.isDL) {
            soc.isDL = false
            soc.dl = soc.dl - 1
        } else {
            soc.isDL = true
            if (soc.isL) {
                soc.l = soc.l - 1
                soc.isL = false
            }
            soc.dl = soc.dl + 1
            this.addDislike(user_id, post_id)
        }
        this.socialPost[i] = soc

    }

    isLike(post_id) {
        var i = this.hashmap.get(post_id)
        var soc = this.socialPost[i]
        if (soc === undefined) {
            return false
        }
        return soc.isL
    }

    isDisLike(post_id) {
        var i = this.hashmap.get(post_id)
        var soc = this.socialPost[i]
        if (soc === undefined) {
            return false
        }
        return soc.isDL
    }

    getLikes(post_id) {
        var i = this.hashmap.get(post_id)
        var soc = this.socialPost[i]
        if (soc === undefined) {
            return 0
        }
        return soc.l
    }

    getDisLikes(post_id) {
        var i = this.hashmap.get(post_id)
        var soc = this.socialPost[i]
        if (soc === undefined) {
            return 0
        }
        return soc.dl
    }

    addLike(user_id, post_id) {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        fetch("http://localhost:8100/app/likes/" + post_id + "/" + user_id + "/0", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    addDislike(user_id, post_id) {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        fetch("http://localhost:8100/app/likes/" + post_id + "/" + user_id + "/1", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    deleteLike(user_id, post_id) {
        console.log(post_id + " " + user_id)
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        fetch("http://localhost:8100/app/likes/" + post_id + "/" + user_id + "", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

}

export default new PostsStore()
