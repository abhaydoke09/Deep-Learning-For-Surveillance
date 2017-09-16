import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TagsBar from './TagsBar';
import ReactPlayer from 'react-player'


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
      played: 0
    };
    this.handleClickSecond = this.handleClickSecond.bind(this);
  }

  handleClickSecond(sec) {
    this.refs.player.seekTo(sec);
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div
          style={{
            flexDirection: 'column',
            width: '80%',
            height: 'auto',
            alignSelf: 'center',
            display: 'flex',
            justifySelf: 'center'
          }}>
          <ReactPlayer
            url='https://www.youtube.com/watch?v=WxnN05vOuSM'
            controls
            playing
            ref="player"
          />
          <TagsBar data={this.state.data} vidLen={this.state.vidLen} onClickSecond={this.handleClickSecond}/>
        </div>
      </div>
    );
  }
}

export default App;
