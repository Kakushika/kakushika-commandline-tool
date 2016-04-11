'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

/**
 * Calling the API
 * @param  {string} path    [API path]
 * @param  {Object} method  [HTTP method]
 * @param  {Object} body    [POST body]
 * @param  {Object} headers [overwrite default headers]
 * @return {Promise}
 */
const callAPI = (() => {
  var ref = _asyncToGenerator(function* (path, method, body, headers) {
    try {
      const options = Object.assign({
        headers: _config2.default.API_CALL_HEADERS
      }, method, body, headers);
      const request = yield (0, _nodeFetch2.default)(`${ _config2.default.API_ROOT }${ path }`, options);
      if (!request.ok) {
        throw request.statusText;
      }
      return request;
    } catch (error) {
      throw error;
    }
  });

  return function callAPI(_x, _x2, _x3, _x4) {
    return ref.apply(this, arguments);
  };
})();

const api = {
  listRooms: callAPI('/rooms'),
  createRooms: roomName => {
    callAPI('/rooms', {
      method: 'POST'
    }, {
      body: JSON.stringify({
        name: roomName
      })
    });
  },
  uploadMessages: message => {
    // text
    callAPI('/messages', {
      method: 'POST'
    }, {
      body: JSON.stringify(message)
    });
  },
  listSplits: callAPI('/splitrequests'),
  showSplits: roomId => {
    callAPI(`/splitrequests/${ roomId }`);
  },
  createSplits: _ref => {
    let roomId = _ref.roomId;
    let language = _ref.language;
    let messages = _ref.messages;

    callAPI('/splitrequests', {
      method: 'POST'
    }, {
      body: JSON.stringify({
        roomId: roomId,
        language: language,
        messages: messages
      })
    });
  },
  listTopics: roomId => {
    callAPI(`/topics?room=${ roomId }`);
  }
};

exports.default = api;