const {play, stop} = require('./voice');
const schedule = require('node-schedule');
const {returnTimeTable, getDay, stringifyClasses} = require('./timetable');
const {setResponse} = require('./autoResponses');
const {autoRespond} = require('./autoResponses');

function handleCommand(message){
    autoRespond(message);
    message.content = message.content.toLocaleLowerCase();
    commandArray = message.content.match(/b!\s?[a-z]+/);
    message.content=message.content.replace(/b!\s?[a-z]+/, '').trim();
    if(!commandArray)
        return;
    const command = commandArray[0].replace('b!', '').trim();
    params = message.content.split(/\s+/);
    if(!commandArray){
        return;
    }
    if(params){
        params = params.map(param=>{
            return param.replace(/"/g,"");
        });
    }
    if(!commands[command]){
        message.reply("unknown command");
        return;
    }
    commands[command](message);
        
}

const commands = {
    play: (message, param=params[0]) => {play(message, param)},
    roll: (message) => {roll(message)},
    stop: (message) => {stop(message)},
    setupbarka: (message) => {schedule.scheduleJob({hour: 20, minute: 37}, () => {commands[play](message, 'barka')});console.log("setupdone"); message.delete();},
    plan: (message) =>{plan(message, params)},
    purge: async (message) =>{purge(message, params[0])},
    syllabus: (message) =>{message.reply('https://sylabusy.agh.edu.pl/pl/1/1/16/1/1/38/50')},
    ar: (message) =>{setResponse(message, params[0], params[1])}
              
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
    console.log(full);
    const planString = stringifyClasses(returnTimeTable(params[0] || getDay(), message, full));
    ifFiloPlayScifi(message, planString);
    message.reply(planString);
}




module.exports = {handleCommand};
