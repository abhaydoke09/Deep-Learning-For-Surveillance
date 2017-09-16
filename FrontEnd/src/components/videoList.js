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
      return (
        <div className="row" key={item}>
          <div className="col-lg-12">

            <img className="img-thumbnail middle" src={item} onClick={event => this.props.selectVid(videos[index])}/>

            <hr />
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
