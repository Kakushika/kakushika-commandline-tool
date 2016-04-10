import fetch from 'node-fetch';
import config from './config.js';

/**
 * Calling the API
 * @param  {string} path    [API path]
 * @param  {Object} method  [HTTP method]
 * @param  {Object} body    [POST body]
 * @param  {Object} headers [overwrite default headers]
 * @return {Promise}
 */
const callAPI = async(path, method, body, headers) => {
  try {
    const options = Object.assign({
      headers: config.API_CALL_HEADERS,
    }, method, body, headers);
    const request = await fetch(`${config.API_ROOT}${path}`, options);
    if (!request.ok) {
      throw request.statusText;
    }
    return request;
  } catch (error) {
    throw error;
  }
};

const api = {
  listRooms: callAPI('/rooms'),
  createRooms: (roomName) => {
    callAPI('/rooms', {
      method: 'POST',
    }, {
      body: JSON.stringify({
        name: roomName,
      }),
    });
  },
  uploadMessages: (message) => {  // text
    callAPI('/messages', {
      method: 'POST',
    }, {
      body: JSON.stringify(message),
    });
  },
  listSplits: callAPI('/splitrequests'),
  showSplits: (roomId) => {
    callAPI(`/splitrequests/${roomId}`);
  },
  createSplits: ({
    roomId,
    language,
    messages,
  }) => {
    callAPI('/splitrequests', {
      method: 'POST',
    }, {
      body: JSON.stringify({
        roomId,
        language,
        messages,
      }),
    });
  },
  listTopics: (roomId) => {
    callAPI(`/topics?room=${roomId}`);
  },
};

export default api;
