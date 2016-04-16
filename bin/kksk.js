'use strict';

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cliOptions = require('./cli-options.js');

var cliOptions = _interopRequireWildcard(_cliOptions);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _api = require('./api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WORKING_DIR = process.cwd();

const cli = (0, _commandLineArgs2.default)(cliOptions.optionDefinitions);

const options = cli.parse();

if (!_config2.default.API_TOKEN) {
  console.log('set KKSK_TOKEN in environment variables');
  process.exit(1);
}

if (options.rooms.rooms) {
  if (options.rooms.list) {
    _api2.default.listRooms.then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
      process.exit(1);
    });
  }
  if (!!options.rooms.create) {
    _api2.default.createRooms(options.rooms.create).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
      process.exit(1);
    });
  }
} else if (options.messages.messages) {
  if (!!options.messages.upload) {
    const messages = JSON.parse(_fs2.default.readFileSync(_path2.default.join(WORKING_DIR, options.messages.upload)));

    if (!!options.messages.room) {
      for (const message of messages) {
        message.roomId = options.messages.room;
      }
    }

    _api2.default.uploadMessages(messages).then(response => {
      console.log(response);
      const responseMessages = response;
      if (options.messages.output) {
        _fs2.default.writeFileSync(_path2.default.join(WORKING_DIR, options.messages.output), responseMessages);
      }
      console.log(responseMessages);
    }).catch(error => {
      console.log(error);
      process.exit(1);
    });
  }
} else if (options.splits.splits) {
  if (options.splits.list) {
    _api2.default.listSplits.then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
      process.exit(1);
    });
  }
  if (options.splits.show) {
    _api2.default.showSplits(options.splits.show).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
      process.exit(1);
    });
  }
  if (!!options.splits.create) {
    const messages = JSON.parse(_fs2.default.readFileSync(_path2.default.join(WORKING_DIR, options.splits.create)));
    const data = {
      roomId: options.splits.room,
      language: options.splits.lang,
      messages: messages
    };
    _api2.default.createSplits(data).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
      process.exit(1);
    });
  }
} else if (options.topics.topics) {
  if (options.topics.list) {
    _api2.default.listTopics(options.topics.room).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
      process.exit(1);
    });
  }
} else {
  console.log(cli.getUsage(cliOptions.options));
  process.exit(0);
}