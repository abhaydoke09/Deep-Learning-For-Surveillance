import React, { Component } from 'react';
import './App.css';
import MotionBar from './components/motionBar';
import ReactPlayer from 'react-player'
import VideoList from './components/videoList';
import NavBar from './components/navbar';
import { getJsonData } from './domainLayer';

class App extends Component {

  constructor(){
    super();
    this.state = {
      data: [],
      vidLen: 291,
      played: 0,
      url: null,
      selectedTitle: null
    };
    this.handleClickSecond = this.handleClickSecond.bind(this);
    this.handleSelectVideo = this.handleSelectVideo.bind(this);
    this.handleValueChanged = this.handleValueChanged.bind(this);
    this.handleUpdateTime = this.handleUpdateTime.bind(this);
  }

  handleClickSecond(sec) {
    this.refs.player.seekTo(sec);
  };

  handleValueChanged(e){
    this.setState({played: e.playedSeconds})
  }

  handleSelectVideo(video){
    const data = getJsonData(video.fileName);
    this.setState({ url: video.videoUrl, data, selectedVideo: video.fileName, selectedTitle: video.title });
  }

  handleUpdateTime(){

    if(this.refs.player.getDuration() && this.state.vidLen !== this.refs.player.getDuration()){
      this.setState({ vidLen: this.refs.player.getDuration()});
    }

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
                <h4 className="mainVideoTitle">{this.state.selectedTitle}</h4>
                <div className="row">

                  <ReactPlayer
                    playing
                    controls
                    url={this.state.url}
                    ref="player"
                    width="inherit"
                    onProgress={this.handleValueChanged}
                    className="responsive-video myVideo"
                    onReady={this.handleUpdateTime}
                  />

                  <MotionBar
                    data={this.state.data.map(item => item.peopleCount * 4)}
                    vidLen={this.state.vidLen}
                    onClickSecond={this.handleClickSecond}
                    title="PEOPLE COUNT"
                    altColor
                  />
                  <MotionBar
                    data={this.state.data.map(item => item.motion * 2)}
                    vidLen={this.state.vidLen}
                    onClickSecond={this.handleClickSecond}
                    title="MOTION GRAPH"
                  />
                  {
                    this.state.selectedVideo !== 'fileTwo' &&
                    <MotionBar
                      data={this.state.data.map(item => item.bagUnattended * 50)}
                      vidLen={this.state.vidLen}
                      onClickSecond={this.handleClickSecond}
                      title="UNATTENDED BAGS"
                    />
                  }

                  </div>
                </div>
                :
                <h4 className="noVideoSelectedHeading">Please select a video</h4>
            }
          </div>


          <div className="col xl3 l3 m3 s12 vidContent">

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
