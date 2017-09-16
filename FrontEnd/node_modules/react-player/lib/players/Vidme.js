'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FilePlayer2 = require('./FilePlayer');

var _FilePlayer3 = _interopRequireDefault(_FilePlayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RESOLVE_URL = 'https://api.vid.me/videoByUrl/';
var MATCH_URL = /^https?:\/\/vid.me\/([a-z0-9]+)$/i;

var cache = {}; // Cache song data requests

var Vidme = function (_FilePlayer) {
  _inherits(Vidme, _FilePlayer);

  function Vidme() {
    _classCallCheck(this, Vidme);

    return _possibleConstructorReturn(this, (Vidme.__proto__ || Object.getPrototypeOf(Vidme)).apply(this, arguments));
  }

  _createClass(Vidme, [{
    key: 'getData',
    value: function getData(url) {
      var onError = this.props.onError;

      var id = url.match(MATCH_URL)[1];
      if (cache[id]) {
        return Promise.resolve(cache[id]);
      }
      return window.fetch(RESOLVE_URL + id).then(function (response) {
        if (response.status === 200) {
          cache[id] = response.json();
          return cache[id];
        } else {
          onError(new Error('Vidme track could not be resolved'));
        }
      });
    }
  }, {
    key: 'getURL',
    value: function getURL(_ref) {
      var video = _ref.video;
      var config = this.props.config;

      if (config.vidme.format && video.formats && video.formats.length !== 0) {
        var index = video.formats.findIndex(function (f) {
          return f.type === config.vidme.format;
        });
        if (index !== -1) {
          return video.formats[index].uri;
        } else {
          console.warn('Vidme format "' + config.vidme.format + '" was not found for ' + video.full_url);
        }
      }
      return video.complete_url;
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var onError = this.props.onError;

      this.stop();
      this.getData(url).then(function (data) {
        if (!_this2.mounted) return;
        _this2.player.src = _this2.getURL(data);
      }, onError);
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  return Vidme;
}(_FilePlayer3['default']);

Vidme.displayName = 'Vidme';
exports['default'] = Vidme;