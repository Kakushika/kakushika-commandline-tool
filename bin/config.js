'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const API_VERSION = 'v1';

const API_BASE_URI = 'https://api.kksk.io/';

const API_TOKEN = process.env.KKSK_TOKEN;

const API_CALL_HEADERS = {
  'Ocp-Apim-Subscription-Key': API_TOKEN,
  'Content-Type': 'application/json'
};

const config = {
  API_ROOT: `${ API_BASE_URI }${ API_VERSION }`,
  API_TOKEN: API_TOKEN,
  API_CALL_HEADERS: API_CALL_HEADERS
};

exports.default = config;