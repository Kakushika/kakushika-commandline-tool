var commandLineArgs = require('command-line-args'),
    fetch = require('node-fetch'),
    fs = require('fs');
var URIROOT = "https://api.kksk.io/v1",
    TOKEN = process.env.KKSK_TOKEN,
    HEADERS = { "Ocp-Apim-Subscription-Key": TOKEN, "Content-Type": "application/json" };

var cli = commandLineArgs([
  { name: 'list', type: Boolean, group: ["rooms", "groups", "splits", "topics"] },
  { name: 'create', type: String, group: ["rooms", "splits"] },
  { name: 'upload', type: String, group: "messages" },  
  { name: 'show', type: String, group: ["splits", "topics"] },
  
  { name: 'rooms', type: Boolean, group: "rooms"},
  { name: 'messages', type: Boolean, group: "messages" },
  { name: 'room', type: Number, group: ["messages", "splits", "topics"] },
  { name: 'output', type: String, group: "messages" },  
  { name: 'splits', type: Boolean, group: "splits" },
  { name: 'lang', type: String, group: "splits" },
  { name: 'topics', type: Boolean, group: "topics" },
  
  { name: 'help', alias: 'h', type: Boolean }  
])

var options = cli.parse();

if(!TOKEN)
  console.log("set KKSK_TOKEN in environment variables");
  
if(options.rooms.rooms){
  if(options.rooms.list){
    fetch(URIROOT + "/rooms", {
      headers: HEADERS
    }).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    });
  }
  if(!!options.rooms.create){
    fetch(URIROOT + "/rooms", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ name: options.rooms.create })
    }).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    });
  }
} 

else if(options.messages.messages){
  if(!!options.messages.upload){
    var json = fs.readFileSync(options.messages.create).toString();
    if(!!options.messages.room){
    var messages = JSON.parse(json);
      messages.forEach(function(m){
        m.roomId = options.messages.room;
      })
      json = JSON.stringify(messages);
    }
    fetch(URIROOT + "/messages", {
      method: "POST",
      headers: HEADERS,
      body: json
    }).then(function(response){
      return response.json();
    }).then(function(json) {
      if(options.messages.output)
        fs.writeFileSync(options.messages.output, json);
      console.log(json);
    });
  }
}

else if(options.splits.splits){
  if(options.splits.list){
    fetch(URIROOT + "/splitrequests", {
      headers: HEADERS
    }).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    });
  }
  if(options.splits.show){
    fetch(URIROOT + "/splitrequests/" + options.splits.show, {
      headers: HEADERS
    }).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    });
  }
  if(!!options.splits.create){
    var messages = fs.readFileSync(options.splits.create).toString();
    messages = JSON.parse(messages);
    var data = {
      roomId: options.splits.room,
      language: options.splits.lang,
      messages: messages
    }
    fetch(URIROOT + "/splitrequests", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(data)
    }).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    });
  }
}

else if(options.topics.topics){
  if(options.topics.list){
    fetch(URIROOT + "/topics", {
      headers: HEADERS
    }).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    });
  }
  if(options.topics.show){
    fetch(URIROOT + "/splitrequests/" + options.topics.show, {
      headers: HEADERS
    }).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    });
  }
}
else 
  console.log(cli.getUsage());