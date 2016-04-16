import commandLineArgs from 'command-line-args';
import fs from 'fs';
import path from 'path';

import * as cliOptions from './cli-options.js';
import config from './config.js';
import api from './api.js';

const WORKING_DIR = process.cwd();

const cli = commandLineArgs(cliOptions.optionDefinitions);

const options = cli.parse();

if (!config.API_TOKEN) {
  console.log('set KKSK_TOKEN in environment variables');
  process.exit(1);
}

if (options.rooms.rooms) {
  if (options.rooms.list) {
    api.listRooms
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }
  if (!!options.rooms.create) {
    api.createRooms(options.rooms.create)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }
} else if (options.messages.messages) {
  if (!!options.messages.upload) {
    const messages = JSON.parse(fs.readFileSync(path.join(WORKING_DIR, options.messages.upload)));

    if (!!options.messages.room) {
      for (const message of messages) {
        message.roomId = options.messages.room;
      }
    }

    api.uploadMessages(messages)
      .then((response) => {
        console.log(response);
        const responseMessages = response;
        if (options.messages.output) {
          fs.writeFileSync(path.join(WORKING_DIR, options.messages.output), responseMessages);
        }
        console.log(responseMessages);
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }
} else if (options.splits.splits) {
  if (options.splits.list) {
    api.listSplits
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }
  if (options.splits.show) {
    api.showSplits(options.splits.show)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }
  if (!!options.splits.create) {
    const messages = JSON.parse(fs.readFileSync(path.join(WORKING_DIR, options.splits.create)));
    const data = {
      roomId: options.splits.room,
      language: options.splits.lang,
      messages,
    };
    api.createSplits(data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }
} else if (options.topics.topics) {
  if (options.topics.list) {
    api.listTopics(options.topics.room)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }
} else {
  console.log(cli.getUsage(cliOptions.options));
  process.exit(0);
}
