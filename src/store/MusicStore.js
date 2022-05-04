import {action, observable} from "mobx";
import userStore from "../store/UserStore";

class MusicStore {
    @observable songs = []
    @observable whoPlayed = 0
    @observable isPlaying = false
    tracks = []
    trackIndex = 0
    @observable trackProgress = 0
    @observable audioRef = new Audio()
    @observable intervalRef
    @observable title
    @observable artist
    @observable image
    @observable audioSrc
    @observable isHavePlaying = true


    /*
    "likes": [
            {
                "user": 2,
                "songData": 5
            }
        ]
    * */

    constructor() {
        this.isHavePlaying = false
    }

    isPlaySong(song_id) {
        if (this.whoPlayed === song_id && this.isPlaying) {
            return true
        }
        return false
    }


    @action
    addMusicToList(song_data) {
        this.isHavePlaying = true
        if (this.whoPlayed === song_data.song.id) {
            if (this.isPlaying) {
                this.pauseMethod()
            } else {
                this.playMethod()
            }

        } else {
            this.songs = []

            if (this.audioRef !== undefined) {
                this.audioRef.pause();
            }
            this.whoPlayed = song_data.song.id
            //this.user = userStore.getMainUser()

            //song_data.likes
            //todo delete???
            /*this.hashmap = new Map()
            song_data.likes.map(like => {
                if (like.user === this.user.id) {
                    this.hashmap.set(song_data.id, 1)
                } else {
                    this.hashmap.set(song_data.id, 0)
                }
            })*/
            this.songs.push(song_data)
            this.isPlaying = true
            this.trackIndex = 0
            this.iniMethod()
        }
    }


    @action
    addNewPlayList(songs, song_id) {
        this.isHavePlaying = true
        if (this.whoPlayed === song_id) {
            if (this.isPlaying) {

                this.pauseMethod()
            } else {
                this.playMethod()
            }
        } else {
            this.songs = []

            if (this.audioRef !== undefined) {
                this.audioRef.pause();
            }
            this.whoPlayed = song_id
            //this.user = userStore.getMainUser()
            songs.map(song => {
                this.songs.push(song)

            })
            this.isPlaying = true
            var l = 0
            var i = 0
            for (i = 0; i < this.songs.length; i++) {
                if (this.songs[i].song.id === song_id) {
                    l = i
                }
            }
            this.trackIndex = l
            this.iniMethod()
        }

    }


    //MUSIC LIST AAAAAA


    iniMethod(id) {

        this.isHavePlaying = true
        console.log("song init start")
        //this.audioRef.current.pause();
        if (this.songs.length === 0) {
            this.isHavePlaying = false;
        } else {
            let tracks1 = []
            this.isHavePlaying = true
            this.songs.map((song_data) =>
                tracks1.push({
                    id: song_data.song.id,
                    title: song_data.song.name,
                    artist: song_data.song.author,
                    audioSrc: song_data.songName,
                    image: song_data.picture.name,
                    color: "string",
                })
            )
            this.tracks = tracks1
            console.log("song init")
            console.log(this.tracks.length)
            this.audioRef = new Audio("http://localhost:8100/app/files/music/" + tracks1[this.trackIndex].audioSrc);
            this.trackProgress = (this.audioRef.currentTime);
            this.audioRef.play();
            this.isPlaying = (true)
            this.startTimer()
            this.changeParams()
        }
    }

    playFromStore() {
        if (this.audioRef !== undefined) {
            this.audioRef.pause()
            this.audioRef.currentTime = 0

            //this.audioRef = undefined
        }
        this.audioRef.src = "http://localhost:8100/app/files/music/" + this.tracks[this.trackIndex].audioSrc
        //this.audioRef = new Audio("http://localhost:8100/app/files/music/" + this.tracks[this.trackIndex].audioSrc);
        this.trackProgress = (this.audioRef.currentTime);
        this.audioRef.play();
        this.isPlaying = true
        this.changeParams()
    }

    @action
    pauseMethod() {
        console.log("doPause")
        this.audioRef.pause()
        this.isPlaying = false
    }

    @action
    closeMethod() {
        this.isHavePlaying = false
        this.pauseMethod()
    }

    @action
    playMethod() {
        console.log("doPlay")
        this.isPlaying = true
        this.audioRef.play()
    }

    changeParams() {
        this.artist = this.getArtist()
        this.title = this.getTitle()
        this.audioSrc = this.getAudioSrc()
        this.image = this.getImage()
    }

    @action
    toPrevTrack() {
        if (this.trackIndex - 1 < 0) {
            this.trackIndex = this.tracks.length - 1;
        } else {
            this.trackIndex = this.trackIndex - 1;
        }
        this.whoPlayed = this.songs[this.trackIndex].song.id

        this.playFromStore()


    }

    @action
    toNextTrack() {
        if (this.trackIndex < this.tracks.length - 1) {
            this.trackIndex = this.trackIndex + 1;
        } else {
            this.trackIndex = 0;
        }
        this.whoPlayed = this.songs[this.trackIndex].song.id
        this.playFromStore()
    }

    startTimer() {
        // Clear any timers already running
        clearInterval(this.intervalRef);
        this.intervalRef = setInterval(() => {
            if (this.audioRef.ended) {
                this.toNextTrack();
            } else {
                /*console.log("process")
                console.log(this.trackProgress)
                console.log(this.audioRef.duration)*/
                this.trackProgress = this.audioRef.currentTime
                if (this.trackProgress > this.audioRef.duration - 1) {
                    this.toNextTrack()
                }
            }
        }, [1000]);
    }

    getTitle() {
        return this.tracks[this.trackIndex].title
    }

    getArtist() {
        return this.tracks[this.trackIndex].artist
    }

    getImage() {
        return this.tracks[this.trackIndex].image
    }

    getAudioSrc() {
        return this.tracks[this.trackIndex].audioSrc
    }
}

export default new MusicStore()