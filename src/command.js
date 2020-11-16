const {play, stop} = require('./voice');
const schedule = require('node-schedule');
const timeTable = require('./data/timetable.json');
const _ = require("lodash");

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
    setupBarka: (message) => {schedule.scheduleJob({hour: 20, minute: 37}, () => {commands[playBarka](message)});console.log("setupdone"); message.delete();},
    plan: (message) =>{message.reply(returnTimeTable(commandArray[2] || getDay()))}
              
}

function roll(message){
    if(message.author.username == "Dywan"){
        message.reply(100);
    }
    else
        message.reply(Math.floor(Math.random()*6 +1));
} 
function returnTimeTable(day){
    let activeArray = [];
      timeTable.map((_class =>{
        const date = new Date();
        _class.pierwszyDzien = new Date(_class.pierwszyDzien);
        if(_class.ostatniDzien == null){
            _class.ostatniDzien = new Date(2021, 5, 1);
        }
        else{
            _class.ostatniDzien = new Date(_class.ostatniDzien);
            _class.ostatniDzien.setDate(_class.ostatniDzien.getDate()+1);
        }
        _class.dzienTygodnia = _class.dzienTygodnia.toLocaleLowerCase();
        if(date.getTime() > _class.pierwszyDzien.getTime() && date.getTime() < _class.ostatniDzien.getTime() && _class.dzienTygodnia == day.toLocaleLowerCase())
          activeArray.push(_class);
      }));
    activeArray.sort((a, b)=>{
        return parseFloat(a.poczatek) - parseFloat(b.poczatek);
    });
    activeArray = _.uniqWith(activeArray, _.isEqual);
    let responseMessage = "";
    activeArray.map(_class =>{
        responseMessage += `${_class.poczatek}-${_class.koniec} ${_class.tytul} gr:${_class.grupa} ${_class.typ}\n`
    });
    return responseMessage;
}
function getDay(){
    switch(new Date().getDay()){
        case 1: return "pn";
        case 2: return "wt";
        case 3: return "śr";
        case 4: return "cz";
        case 5: return "pt";
    }
}



module.exports = {handleCommand};