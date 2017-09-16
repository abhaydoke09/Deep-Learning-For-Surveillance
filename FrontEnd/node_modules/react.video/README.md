# react.video

[![Build Status](https://travis-ci.org/React-Components-Organization/react.video.svg?branch=master)](https://travis-ci.org/React-Components-Organization/react.video)
[![npm version](https://badge.fury.io/js/react.video.svg)](https://badge.fury.io/js/react.video)
[![npm](https://img.shields.io/npm/dt/react.video.svg)](https://www.npmjs.com/package/react.video)

A react video component, built with ES2015.

## Installation

Install the module directly from npm:

```
npm install react.video --save
```

## Usage

A basic usage of ReactVideo and how to call public methods available through this.refs['your-ref'];

```js
import React from 'react';
import ReactVideo from 'react.video';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.onClickPlay = this.onClickPlay.bind(this);
    this.state = {
      muted: false,
      source: [
        {
          src: 'http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4',
          type: 'video/mp4'
        }
      ]
    };
  }

  // play() method is called via refs.
  onClickPlay () {
    this.refs.VideoComp.play();
  }

  render () {
    // a basic style object
    const VideoStyle = {
        backgroundColor: 'green'
    };

    return (
      <ReactVideo
        ref={'VideoComp'}
        cls={'custom-video'} 
        height={500} width={'100%'}
        style={VideoStyle}
        muted={this.state.muted}
        src={'http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4'}
        source={this.state.source}>
      </ReactVideo>

      <div>
        <div onClick={this.onClickPlay}>Play</div>
      </div>
    );
  }
};

export default App;
```

### Properties

#### cls {string}

>**NOTE:** The CSS class to add to this component's element, in addition to the baseCls 'container'.

```js
<ReactVideo cls={'custom-video'} />
```

#### autoPlay {boolean}

>**NOTE:** Will automatically start playing the media when the video is activated.
Defaults to: false

#### src {string}

>**NOTE:** Location of the video to play. This should be in H.264 format and in a .mov file format.
Defaults to: empty string

#### source {array}

>**NOTE:** The <source> tag is used to specify multiple media resources for media elements.
Defaults to: empty array

```js
const sourceArray: [
  {
    src: 'http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4',
    type: 'video/mp4'
  }
];

<ReactVideo
  source={sourceArray}>
</ReactVideo>
```

#### controls {boolean}

>**NOTE:** Determines if native controls should be shown for this video player.
Defaults to: true

```js
<ReactVideo
  controls={true}>
</ReactVideo>
```

#### loop {boolean}

>**NOTE:** Will loop the media forever.
Defaults to: false

```js
<ReactVideo
  loop={true}>
</ReactVideo>
```

#### muted {boolean}

>**NOTE:** Whether or not the media is muted. This will also set the volume to zero.
Defaults to: false

```js
<ReactVideo
  muted={true}>
</ReactVideo>
```

#### posterUrl {string}

>**NOTE:** Location of a poster image to be shown before showing the video.
Default to: empty string

```js
<ReactVideo
  posterUrl={'my-url-to-my-poster'}>
</ReactVideo>
```

#### preload {boolean}

>**NOTE:** Will begin preloading the media immediately.
Default to: true

```js
<ReactVideo
  preload={true}>
</ReactVideo>
```

#### width {number/string}

>**NOTE:** The width of this Component; must be a valid CSS length value, e.g: 300, 100px, 30%, etc. By default, if this is not explicitly set, this Component's element will simply have its own natural size. If set to auto, it will set the width to null meaning it will have its own natural size.

#### height {number/string}

>**NOTE:** The height of this Component; must be a valid CSS length value, e.g: 300, 100px, 30%, etc. By default, if this is not explicitly set, this Component's element will simply have its own natural size. If set to auto, it will set the height to null meaning it will have its own natural size.

#### notSupportedMessage {string}

>**NOTE:** The message to display in case the browser cannot play the media.
Default to: 'Sorry your browser does not support HTML5 video.'

#### style {string/object}

>**NOTE:** Optional CSS styles that will be rendered into an inline style attribute when the Component is rendered.

You can pass an object:

```
style: {
    background: 'red'
}
```

### Api

>**NOTE:** All listed methods are available through the refs attribute. example 'this.refs['MyReactComponent'].isEnded()'

#### canPlayType(format)

>**NOTE:** The canPlayType() method checks if the browser can play the specified audio/video type.

* @param {string} format, common values (video/mp4, video/webm, audio/mpeg, audio/ogg, audio/mp4).
* @return {string} format, common values, including codecs.

#### isPlaying()

>**NOTE:** return if the media is currently playing.

* @return {Boolean} playing, return the playback playing status.

#### isEnded()

>**NOTE:** get whenever the media playback has ended.

* @return {Boolean} ended, return the playback ended status.

#### load()

>**NOTE:** Will begin loading the media immediately.

#### play()

>**NOTE:** Starts or resumes media playback.

#### pause()

>**NOTE:** Pauses media playback.

#### stop()

>**NOTE:** Stops media playback and returns to the beginning.

#### getDuration()

>**NOTE:** The duration property returns the length of the current audio/video, in seconds.

* @return {number} duration, A Number representing the length of the video, in seconds. If no video is set, "NaN" (Not-a-Number) is returned.

#### getCurrentTime()

>**NOTE:** Returns the current time of the media, in seconds.

* @return {Number} return a value between 0 to 1.

#### getBuffered()

>**NOTE:** The TimeRanges object represents the user's buffered ranges of the video.

* @return {object} TimeRanges Object.
  * length - get the number of buffered ranges in the audio/video
  * start(index) - get the start position of a buffered range
  * end(index) - get the end position of a buffered range

#### getUrl()

>**NOTE:** Returns the value of url.

* @return {string} return the src value of the video.

#### getVolume()

>**NOTE:** Retun the current volume of the video.

* @return {number} Must be a number between 0.0 and 1.0.

#### setCurrentTime()

>**NOTE:** Set the current time of the media.

* @param {Number} time The time, in seconds.
* @return {Number} return time in seconds.

#### setPlaybackRate()

>**NOTE:** Set video to play in slow motion.

* The playbackRate property sets the current playback speed of the video.
* @param {number} rate, Indicates the current playback speed of the video.
* @example
  * 1.0 is normal speed
  * 0.5 is half speed (slower)
  * 2.0 is double speed (faster)
  * -1.0 is backwards, normal speed
  * -0.5 is backwards, half speed

#### setVolume()

>**NOTE:** Set the current volume of the media.

* @param {number} volume, Specifies the current volume of the audio/video. Must be a number between 0.0 and 1.0. 

#### toggle()

>**NOTE:** Toggles the media playback state.

## Stats

[![NPM](https://nodei.co/npm-dl/react.video.png?months=1)](https://nodei.co/npm/react.video/)

[![NPM](https://nodei.co/npm-dl/react.video.png?downloads=true)](https://nodei.co/npm/react.video/)

## License

The MIT License (MIT)

Copyright (c) 2016 React-Components-Organization

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

