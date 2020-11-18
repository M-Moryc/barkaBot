const {play, stop} = require('./voice');
const schedule = require('node-schedule');
const {returnTimeTable, getDay} = require('./timetable');

function handleCommand(message){
    message.content = message.content.toLocaleLowerCase();
    commandArray = message.content.split(" ");
    if(commandArray[0] != 'b!')
        return;
    if(!commands[commandArray[1]]){
        message.reply("unknown command");
        return;
    }
    commands[commandArray[1]](message);
        
}

const commands = {
    playbarka: (message) => {play(message, "https://www.youtube.com/watch?v=0qzLRlQFFQ4");},
    play: (message) => {play(message, commandArray[2])},
    roll: (message) => {roll(message)},
    stop: (message) => {stop(message)},
    setupbarka: (message) => {schedule.scheduleJob({hour: 20, minute: 37}, () => {commands[playbarka](message)});console.log("setupdone"); message.delete();},
    plan: (message) =>{message.reply(returnTimeTable(commandArray[2] || getDay(), message))}
              
}

function roll(message){
    if(message.author.username == "Dywan"){
        message.reply(100);
    }
    else
        message.reply(Math.floor(Math.random()*6 +1));
} 


module.exports = {handleCommand};
