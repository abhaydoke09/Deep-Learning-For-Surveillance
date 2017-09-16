import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TagsBar from './TagsBar';
import ReactPlayer from 'react-player'
import VideoList from './components/videoList';
import NavBar from './components/navbar';
import vid from './data/1.mp4';
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
    this.setState({ url });
  }

  render() {
    const fileName = this.state.url.split("/");
    return (
      <div>
      <NavBar />
      <div className=" content">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <h2>{fileName[fileName.length-1]}</h2>
            <ReactPlayer

              url={[{src: this.state.url, type: 'video/mp4'}]}
              controls
              ref="player"
              width="inherit"
              height="auto"
              fileConfig={{ attributes: {preload : 'none'}}}
            />
            <TagsBar data={this.state.data} vidLen={this.state.vidLen} onClickSecond={this.handleClickSecond}/>
            <hr />

          </div>

          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 video-thumbs">

          <h3>Videos</h3>
          <VideoList selectVid={this.selectVideo} selected={fileName[fileName.length-1]}/>

          </div>



        </div>

      </div>
      </div>
    );
  }
}

export default App;
