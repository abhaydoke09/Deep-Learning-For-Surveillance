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

var SDK_URL = '//fast.wistia.com/assets/external/E-v1.js';
var SDK_GLOBAL = 'Wistia';
var MATCH_URL = /^https?:\/\/(.+)?(wistia.com|wi.st)\/(medias|embed)\/(.*)$/;

var Wistia = function (_Base) {
  _inherits(Wistia, _Base);

  function Wistia() {
    _classCallCheck(this, Wistia);

    return _possibleConstructorReturn(this, (Wistia.__proto__ || Object.getPrototypeOf(Wistia)).apply(this, arguments));
  }

  _createClass(Wistia, [{
    key: 'getID',
    value: function getID(url) {
      return url && url.match(MATCH_URL)[4];
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var _props = this.props,
          controls = _props.controls,
          onStart = _props.onStart,
          onPause = _props.onPause,
          onSeek = _props.onSeek,
          onEnded = _props.onEnded,
          config = _props.config;

      this.loadingSDK = true;
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function () {
        window._wq = window._wq || [];
        window._wq.push({
          id: _this2.getID(url),
          options: _extends({
            controlsVisibleOnLoad: controls
          }, config.wistia.options),
          onReady: function onReady(player) {
            _this2.player = player;
            _this2.player.bind('start', onStart);
            _this2.player.bind('play', _this2.onPlay);
            _this2.player.bind('pause', onPause);
            _this2.player.bind('seek', onSeek);
            _this2.player.bind('end', onEnded);
            _this2.onReady();
          }
        });
      });
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.callPlayer('remove');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      var seconds = _get(Wistia.prototype.__proto__ || Object.getPrototypeOf(Wistia.prototype), 'seekTo', this).call(this, amount);
      this.callPlayer('time', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('volume', fraction);
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      this.callPlayer('playbackRate', rate);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.callPlayer('duration');
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.callPlayer('time');
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var id = this.getID(this.props.url);
      var className = 'wistia_embed wistia_async_' + id;
      var style = {
        width: '100%',
        height: '100%',
        display: this.props.url ? 'block' : 'none'
      };
      return _react2['default'].createElement('div', { key: id, className: className, style: style });
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  return Wistia;
}(_Base3['default']);

Wistia.displayName = 'Wistia';
exports['default'] = Wistia;