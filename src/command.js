const {play, stop} = require('./voice');
const schedule = require('node-schedule');
const {returnTimeTable, getDay, stringifyClasses} = require('./timetable');

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
    play: (message) => {play(message, commandArray[2])},
    roll: (message) => {roll(message)},
    stop: (message) => {stop(message)},
    setupbarka: (message) => {schedule.scheduleJob({hour: 20, minute: 37}, () => {commands[play](message, 'barka')});console.log("setupdone"); message.delete();},
    plan: (message) =>{message.reply(stringifyClasses(returnTimeTable(commandArray[2] || getDay(), message)))},
    purge: async (message) =>{purge(message, commandArray[2])}
              
}

function roll(message){
    if(message.author.username == "Dywan"){
        message.reply(100);
    }
    else
        message.reply(Math.floor(Math.random()*6 +1));
}
async function purge(message, limit){
    const messages = await message.channel.messages.fetch({limit: limit});
    messages.forEach(m => {
        m.delete();
    });
}


module.exports = {handleCommand};
