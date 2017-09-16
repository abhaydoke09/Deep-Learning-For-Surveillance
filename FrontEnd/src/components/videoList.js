import React, { Component } from 'react';
import thumbler from 'video-thumb';
import './videoList.css';



function importAll(r) {
  let images = [];
  r.keys().map((item, index) => { images.push(r(item)); });
  return images;
}

const images = importAll(require.context('../data', false, /\.(png)$/));
const videos = importAll(require.context('../data', false, /\.(mp4)$/));

class videoList extends Component {

  renderImages(imgArray){

    return imgArray.map((item,index) => {
      const fileName = videos[index].split("/");

      const className = `row video ${this.props.selected === fileName[fileName.length-1] ? 'active-video' : ''}`;

      return (
        <div className={className} key={item}>
          <div className="col-lg-12">

            <img className="middle" src={item} onClick={event => this.props.selectVid(videos[index])}/>
            <p>{fileName[fileName.length-1]}</p>

          </div>
        </div>
      );


    });

  }

  render(){
    console.log(videos);
    return (
      <div>
      {this.renderImages(images)}
      </div>
    );
  }

}

export default videoList;

//get all videos from folder

//update state on click
