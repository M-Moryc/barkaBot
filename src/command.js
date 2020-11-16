const {play, stop} = require('./voice');
const schedule = require('node-schedule');

function handleCommand(message){
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
    playBarka: (message) => {play(message, "https://www.youtube.com/watch?v=0qzLRlQFFQ4");},
    play: (message) => {play(message, commandArray[2])},
    roll: (message) => {roll(message)},
    stop: (message) => {stop(message)},
    setupBarka: (message) => {schedule.scheduleJob({hour: 20, minute: 37}, () => {commands[playBarka](message)});console.log("setupdone"); message.delete();}
              
}

function roll(message){
    if(message.author.username == "Dywan"){
        message.reply(100);
    }
    else
        message.reply(Math.floor(Math.random()*6 +1));
}   



module.exports = {handleCommand};