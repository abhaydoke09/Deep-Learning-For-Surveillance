import React, { Component } from 'react';
import './App.css';
import TagsBar from './components/tagsBar';
import ReactPlayer from 'react-player'
import VideoList from './components/videoList';
import NavBar from './components/navbar';
import VidLegend from './components/vidLegend';

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
      url: null
    };
    this.handleClickSecond = this.handleClickSecond.bind(this);
    this.handleSelectVideo = this.handleSelectVideo.bind(this);
  }

  handleClickSecond(sec) {
    this.refs.player.seekTo(sec);
  };

  handleSelectVideo(video){
    this.setState({ url: video.videoUrl });


  }

  render() {
    return (
      <div>
      <NavBar />
      <div className="myContainer">
      <div className="section">

        <div className="row">
          <div className="col xl9 l9 m9 s12">


            {
              this.state.url ?

                <div>
                <h4>Name</h4>
                <div className="row">

                  <ReactPlayer
                    playing
                    url={this.state.url}
                    controls
                    ref="player"
                    width="inherit"
                    className="responsive-video myVideo"
                  />

                  <TagsBar data={this.state.data} vidLen={this.state.vidLen} onClickSecond={this.handleClickSecond}/>

                  </div>
                </div>
                :
                <h4>Please select a video</h4>
            }
            <VidLegend />
          </div>


          <div className="col xl2 l2 m2 s12 vidContent">

          <h4 className="vidHeading">Videos</h4>
          <div className="vidList">
          <VideoList selectVid={this.handleSelectVideo} onClick={this.handleSelectVideo} selectedVideoUrl={this.state.url}/>
          </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
