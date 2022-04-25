import React from "react";
import PlayerItemPost from "../player/PlayerItemPost";
import def from "../png/content.png"
import play from "../png/play.png"
import pause from "../png/pause1.png"


class ClassMusicItem extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            isPhoto: true,
            isPlay: false
        }
        this.changePlay = this.changePlay.bind(this)
    }

    componentDidMount() {
        this.state.isPhoto = false;

    }

    changePlay() {
        //this.setState()
        this.setState({isPlay: !this.state.isPlay})
    }


    render() {
        return (
            <div className="music_item">
                <section>

                </section>
                <div className="music_item__play">
                    {this.state.isPlay ? (
                        <img onClick={event => {
                            this.changePlay()
                        }} src={play} height={20} width={20}/>
                    ) : (
                        <img onClick={event => {
                            this.changePlay()
                        }} src={pause} height={20} width={20}/>
                    )}
                </div>
                <div>
                    {this.state.isPhoto ? (
                        <img className="music_item_img"
                             src={"http://localhost:8100//files/photo/" + this.props.song_data.picture.name} height={40}
                             width={40}/>
                    ) : (
                        <img className="music_item_img" src={def} height={40} width={40}/>
                    )}
                </div>

                <div><h3 className="music_item_name">
                    {this.props.song_data.song.author} - {this.props.song_data.song.name}
                </h3>
                    <h4 className="music_item_lasting">{this.props.song_data.song.lasting}</h4>
                </div>

            </div>
        )
    }


}

export default ClassMusicItem