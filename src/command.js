const {play, stop} = require('./voice');
const schedule = require('node-schedule');
const {returnTimeTable, getDay, stringifyClasses} = require('./timetable');
const {setResponse} = require('./autoResponses');
const {autoRespond} = require('./autoResponses');
const { indexOf } = require('ffmpeg-static');

function handleCommand(message){
    autoRespond(message);
    message.content = message.content.toLocaleLowerCase();
    commandArray = message.content.match(/(?:[^\s"]+|"[^"]*")+/g);
    if(!commandArray){
        return;
    }
    commandArray = commandArray.map(command=>{
        return command.replace(/"/g,"");
    })
    if(commandArray[0] != 'b!')
        return;
    if(!commands[commandArray[1]]){
        message.reply("unknown command");
        return;
    }
    commands[commandArray[1]](message);
        
}

const commands = {
    play: (message, param=commandArray[2]) => {play(message, param)},
    roll: (message) => {roll(message)},
    stop: (message) => {stop(message)},
    setupbarka: (message) => {schedule.scheduleJob({hour: 20, minute: 37}, () => {commands[play](message, 'barka')});console.log("setupdone"); message.delete();},
    plan: (message) =>{plan(message, commandArray.slice(2, commandArray.size))},
    purge: async (message) =>{purge(message, commandArray[2])},
    syllabus: (message) =>{message.reply('https://sylabusy.agh.edu.pl/pl/1/1/16/1/1/38/50')},
    ar: (message) =>{setResponse(message, commandArray[2], commandArray[3])}
              
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
function plan(message, params) {
    let full=false;
    if(params.includes('full')){
        full=true;
        params.splice(params.indexOf('full'));
    }

    const planString = stringifyClasses(returnTimeTable(params[0] || getDay(), message, full));
    ifFiloPlayScifi(message, planString);
    message.reply(planString);
}




module.exports = {handleCommand};
