var commandLineArgs = require('command-line-args'),
    fetch = require('node-fetch'),
    fs = require('fs'),
    path = require('path');
var URIROOT = "https://api.kksk.io/v1",
    TOKEN = process.env.KKSK_TOKEN,
    HEADERS = { "Ocp-Apim-Subscription-Key": TOKEN, "Content-Type": "application/json" },
    WORKING_DIR = process.cwd() + "/";
    
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

function check(response){
  return new Promise(function(resolve, reject){
    if(response.status == 200 || response.status == 201)
      resolve(response);
    else
      reject(response);
  })
}

if(!TOKEN)
  console.log("set KKSK_TOKEN in environment variables");
  
if(options.rooms.rooms){
  if(options.rooms.list){
    fetch(URIROOT + "/rooms", {
      headers: HEADERS
    }).then(check).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    }).catch(function(err){
      console.log(err);
    });
  }
  if(!!options.rooms.create){
    fetch(URIROOT + "/rooms", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ name: options.rooms.create })
    }).then(check).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    }).catch(function(err){
      console.log(err);
    });
  }
} 

else if(options.messages.messages){
  if(!!options.messages.upload){
    var json = fs.readFileSync(path.join(WORKING_DIR + options.messages.upload)).toString();
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
    }).then(check).then(function(response){
      return response.text();
    }).then(function(json) {
      if(options.messages.output)
        fs.writeFileSync(path.join(WORKING_DIR + options.messages.output), json);
      console.log(json);
    }).catch(function(err){
      console.log(err);
    });
  }
}

else if(options.splits.splits){
  if(options.splits.list){
    fetch(URIROOT + "/splitrequests", {
      headers: HEADERS
    }).then(check).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    }).catch(function(err){
      console.log(err);
    });
  }
  if(options.splits.show){
    fetch(URIROOT + "/splitrequests/" + options.splits.show, {
      headers: HEADERS
    }).then(check).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    }).catch(function(err){
      console.log(err);
    });
  }
  if(!!options.splits.create){
    var messages = fs.readFileSync(path.join(WORKING_DIR + options.splits.create)).toString();
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
    }).then(check).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    }).catch(function(err){
      console.log(err);
    });
  }
}

else if(options.topics.topics){
  if(options.topics.list){
    fetch(URIROOT + "/topics?room="+options.topics.room, {
      headers: HEADERS
    }).then(check).then(function(response){
      return response.json();
    }).then(function(json) {
      console.log(json);
    }).catch(function(err){
      console.log(err);
    });
  }
}
else 
  console.log(cli.getUsage());