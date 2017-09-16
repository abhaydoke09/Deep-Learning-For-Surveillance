'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://www.youtube.com/iframe_api';
var SDK_GLOBAL = 'YT';
var SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady';
var MATCH_URL = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
var BLANK_VIDEO_URL = 'https://www.youtube.com/watch?v=GlCmAC4MHek';

var YouTube = function (_Base) {
  _inherits(YouTube, _Base);

  function YouTube() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, YouTube);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YouTube.__proto__ || Object.getPrototypeOf(YouTube)).call.apply(_ref, [this].concat(args))), _this), _this.onStateChange = function (_ref2) {
      var data = _ref2.data;
      var _this$props = _this.props,
          onPause = _this$props.onPause,
          onBuffer = _this$props.onBuffer;
      var _window$SDK_GLOBAL$Pl = window[SDK_GLOBAL].PlayerState,
          PLAYING = _window$SDK_GLOBAL$Pl.PLAYING,
          PAUSED = _window$SDK_GLOBAL$Pl.PAUSED,
          BUFFERING = _window$SDK_GLOBAL$Pl.BUFFERING,
          ENDED = _window$SDK_GLOBAL$Pl.ENDED,
          CUED = _window$SDK_GLOBAL$Pl.CUED;

      if (data === PLAYING) _this.onPlay();
      if (data === PAUSED) onPause();
      if (data === BUFFERING) onBuffer();
      if (data === ENDED) _this.onEnded();
      if (data === CUED) _this.onReady();
    }, _this.onEnded = function () {
      var _this$props2 = _this.props,
          loop = _this$props2.loop,
          onEnded = _this$props2.onEnded;

      if (loop) {
        _this.seekTo(0);
      }
      onEnded();
    }, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YouTube, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          url = _props.url,
          config = _props.config;

      if (!url && config.youtube.preload) {
        this.preloading = true;
        this.load(BLANK_VIDEO_URL);
      }
      _get(YouTube.prototype.__proto__ || Object.getPrototypeOf(YouTube.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var _props2 = this.props,
          playsinline = _props2.playsinline,
          controls = _props2.controls,
          config = _props2.config,
          _onError = _props2.onError;

      var id = url && url.match(MATCH_URL)[1];
      if (this.isReady) {
        this.player.cueVideoById({
          videoId: id,
          startSeconds: (0, _utils.parseStartTime)(url)
        });
        return;
      }
      if (this.loadingSDK) {
        this.loadOnReady = url;
        return;
      }
      this.loadingSDK = true;
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, function (YT) {
        return YT.loaded;
      }).then(function (YT) {
        _this2.player = new YT.Player(_this2.container, {
          width: '100%',
          height: '100%',
          videoId: id,
          playerVars: _extends({
            controls: controls ? 1 : 0,
            start: (0, _utils.parseStartTime)(url),
            origin: window.location.origin,
            playsinline: playsinline
          }, config.youtube.playerVars),
          events: {
            onReady: _this2.onReady,
            onStateChange: _this2.onStateChange,
            onError: function onError(event) {
              return _onError(event.data);
            }
          }
        });
      }, _onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('playVideo');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pauseVideo');
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.preloading) return;
      if (!document.body.contains(this.callPlayer('getIframe'))) return;
      this.callPlayer('stopVideo');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      var seconds = _get(YouTube.prototype.__proto__ || Object.getPrototypeOf(YouTube.prototype), 'seekTo', this).call(this, amount);
      this.callPlayer('seekTo', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction * 100);
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      this.callPlayer('setPlaybackRate', rate);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.callPlayer('getDuration');
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.callPlayer('getCurrentTime');
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.callPlayer('getVideoLoadedFraction') * this.getDuration();
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%',
        display: this.props.url ? 'block' : 'none'
      };
      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement('div', { ref: this.ref })
      );
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  return YouTube;
}(_Base3['default']);

YouTube.displayName = 'YouTube';
exports['default'] = YouTube;