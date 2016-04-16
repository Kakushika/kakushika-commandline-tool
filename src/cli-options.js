const optionDefinitions = [{
  name: 'list',
  type: Boolean,
  group: ['rooms', 'groups', 'splits', 'topics'],
}, {
  name: 'create',
  type: String,
  group: ['rooms', 'splits'],
}, {
  name: 'upload',
  type: String,
  group: 'messages',
}, {
  name: 'show',
  type: String,
  group: ['splits', 'topics'],
}, {
  name: 'rooms',
  type: Boolean,
  group: 'rooms',
}, {
  name: 'messages',
  type: Boolean,
  group: 'messages',
}, {
  name: 'room',
  type: String,
  group: ['messages', 'splits', 'topics'],
}, {
  name: 'output',
  type: String,
  group: 'messages',
}, {
  name: 'splits',
  type: Boolean,
  group: 'splits',
}, {
  name: 'lang',
  type: String,
  group: 'splits',
}, {
  name: 'topics',
  type: Boolean,
  group: 'topics',
}, {
  name: 'help',
  alias: 'h',
  type: Boolean,
}];

const options = {
  title: 'kksk-cli',
  description: 'Commandline tool for Kakushika',
  footer: [
    'Project home: [underline]{https://portal.kksk.io}',
    'Git: [underline]{https://github.com/Kakushika/kksk-cli}',
  ],
};

export {
  optionDefinitions,
  options,
};
