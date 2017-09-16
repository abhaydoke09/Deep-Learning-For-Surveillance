import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TagsBar from './TagsBar';
import ReactPlayer from 'react-player'
import VideoList from './components/videoList';
import vid from './data/2.mkv';
import vid2 from './data/2.mp4';
import mime from 'mime-types';


const mock_data = [
  {
    tStart: 35,
    tEnd: 40,
    tag: 'person'
  },
  {
    tStart: 21,
    tEnd: 31,
    tag: 'dog'
  },
  {
    tStart: 3,
    tEnd: 10,
    tag: 'iAmSleepy'
  }
];


class App extends Component {

  constructor(){
    super();
    this.state = {
      data: mock_data,
      vidLen: 291,
      played: 0,
      url: vid
    };
    this.handleClickSecond = this.handleClickSecond.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
  }

  handleClickSecond(sec) {
    this.refs.player.seekTo(sec);
  };

  selectVideo(url){
    console.log(url);
    this.setState({ url });


  }

  componentDidUpdate(){
    console.log('src',this.refs.player.getInternalPlayer().src);
    this.refs.player.getInternalPlayer().load();
  }

  componentDidMount(){
    console.log('src',this.refs.player.getInternalPlayer().src);
    this.refs.player.getInternalPlayer().load();
  }



  render() {
    console.log("url",this.state.url);
    console.log(mime.lookup(vid2));

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">

            <ReactPlayer

              url={[{src: this.state.url, type: 'video/mkv'}]}
              controls
              ref="player"
              width="inherit"
              fileConfig={{ attributes: {preload : 'none'}}}
            />
            <TagsBar data={this.state.data} vidLen={this.state.vidLen} onClickSecond={this.handleClickSecond}/>

          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <VideoList selectVid={this.selectVideo} />

          </div>



        </div>

      </div>
    );
  }
}

export default App;
