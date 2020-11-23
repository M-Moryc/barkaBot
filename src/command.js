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
    plan: (message) =>{plan(message)},
    purge: async (message) =>{purge(message, commandArray[2])},
    syllabus: (message) =>{message.reply('https://sylabusy.agh.edu.pl/pl/1/1/16/1/1/38/50')}
              
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
function ifFiloPlayScifi(message, plan){
    if(plan.match(/Podstawy filozofii/) && message.member.voice.channel)
        play(message, 'sci-fi');

}
function plan(message) {
    const planString = stringifyClasses(returnTimeTable(commandArray[2] || getDay(), message));
    ifFiloPlayScifi(message, planString);
    message.reply(planString);
}




module.exports = {handleCommand};
