import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TagsBar from './TagsBar';
import ReactPlayer from 'react-player'
import VideoList from './components/videoList';
import vid from './data/VIRAT_S_000002.mp4';


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

  componentDidUpdate(){
    console.log("updated");
    console.log(this.refs.player.getInternalPlayer());
    console.log(this.refs.player);
  }

  render() {
    console.log("url",vid);
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">

            <ReactPlayer
              url={this.state.url}
              controls
              ref="player"
              width="inherit"
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
