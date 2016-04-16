# kksk-cli
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![wercker status](https://app.wercker.com/status/2a09575a0627a542768d0a5a9d81b500/s/master "wercker status")](https://app.wercker.com/project/bykey/2a09575a0627a542768d0a5a9d81b500)

Commandline tool for Kakushika (https://portal.kksk.io)

Split messages to topics, automatically.

By using Kakushika, simply save the message or you will be able to organize a large number of messages to the smart.

## How to Start

### Step1: Install kksk command

```npm install -g kksk-cli```

### Step2 Set token in environment variables

```set KKSK_TOKEN=**********************```

### Step3: download sample chat data
download link: ja=messages.json, en=comming soon!

### Step4: Create room

```kksk --rooms --create <name>```

### Step5: Upload chat message to room

```kksk --messages --upload ./messages.json --room <room id> --output uploaded.json```

### Step6: Create split request

```kksk --splits --create ./uploaded.json --room <room id> --lang ja```

### Step7: Wait until to be Complete

```kksk --splits --show <split id>```

<pre>{ messages: [],
  room:
   { id: ,
     userId: ,
     externalType: null,
     externalId: null,
     name: '' },
  id: ,
  roomId: ,
  start: '2016-03-30T19:31:21.927',
  end: null,
  status: 'preparing' } // preparing -> doing - > done, when it be set cancelled or faild, request has error. </pre>

### Step8: show down topics!

```kksk --topicks --list --room <room id>```

## License

MIT
