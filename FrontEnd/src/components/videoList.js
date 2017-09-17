import React, { Component } from 'react';
import './videoList.css';
import videos from '../staticData/videos'


export default class VideoList extends Component {
  render(){
    return (
      <div>
        {
          videos.map((videoItem, index) => (
            <div className="row">
              <div className="col-lg-12" style={{border: this.props.selectedVideoUrl === videoItem.videoUrl ? '2px solid red' : 'none'}}>
                <img
                  alt={`vid${index}`}
                  className="img-thumbnail middle"
                  src={videoItem.thumbnailUrl}
                  onClick={() => this.props.onClick(videoItem)}
                />
                <hr />
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}
