const timeTable = require('./data/timetable.json');
const {getUserRoles} = require('./roles');

function returnTimeTable(day, message, full){
    const userRoles = getUserRoles(message);
    let activeArray = [];
      timeTable.map((_class =>{
        const date = new Date();
        date.setDate(date.getDate() + (getDayNumber(day) - date.getDay()));
        //console.log(date);
        _class.pierwszyDzien = new Date(_class.pierwszyDzien);
        if(_class.ostatniDzien == null){
            _class.ostatniDzien = new Date(2021, 5, 1);
        }
        else{
            _class.ostatniDzien = new Date(_class.ostatniDzien);
            _class.ostatniDzien.setDate(_class.ostatniDzien.getDate()+1);
        }
        _class.dzienTygodnia = _class.dzienTygodnia.toLocaleLowerCase();
        if(date.getTime() > _class.pierwszyDzien.getTime() && date.getTime() < _class.ostatniDzien.getTime() && _class.dzienTygodnia == day.toLocaleLowerCase()
            && (full || _class.typ=="Wykład" || (userRoles.includes((_class.tytul).trim() + _class.grupa)))
        )
          activeArray.push(_class);
      }));
      const filteredArray = [];
      activeArray.forEach(_class =>{
        let push = true;
        filteredArray.forEach((__class)=>{
            if(push && _class.tytul == __class.tytul && _class.poczatek == __class.poczatek)
                push=false;
        })
        if(push)
            filteredArray.push(_class);
      });
    filteredArray.sort((a, b)=>{
        return parseFloat(a.poczatek) - parseFloat(b.poczatek);
    });
    return filteredArray;
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
function getDayNumber(day){
    switch(day){
        case 'pn': return 1;
        case 'wt': return 2;
        case 'śr': return 3;
        case 'cz': return 4;
        case 'pt': return 5;
    }
}


function stringifyClasses(classesArray){
    let responseMessage = "";
    classesArray.map(_class =>{
        const responseMessageLine = `${_class.poczatek}-${_class.koniec} ${_class.tytul} gr:${_class.grupa} ${_class.typ}\n`;
        responseMessage += responseMessageLine;
    });
    return responseMessage;
}



module.exports = {returnTimeTable, getDay, stringifyClasses};