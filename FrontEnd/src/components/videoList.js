import React, { Component } from 'react';
import './videoList.css';
import videos from '../staticData/videos'


export default class VideoList extends Component {
  render(){
    return (
      <div>
        {
          videos.map(videoItem => {
            const className = `card-content ${this.props.selectedVideoUrl === videoItem.videoUrl ? 'myCardContent' : ''}`;
            return (
              <div className="row">
          <div className="col xl12">
            <div className="card">
              <div className="card-image">
                <img
                src={videoItem.thumbnailUrl}
                onClick={() => this.props.onClick(videoItem)}
                />


              </div>
              <div className={className} onClick={() => this.props.onClick(videoItem)}>

              <span className="card-title">{videoItem.title}</span>

          </div>

            </div>
          </div>
        </div>

            )
          })
        }
      </div>
    );
  }
}
