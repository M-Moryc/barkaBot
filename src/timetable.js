const timeTable = require('./data/timetable.json');

function returnTimeTable(day, message){
    const userRoles = getUserRoles(message);
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
        if(date.getTime() > _class.pierwszyDzien.getTime() && date.getTime() < _class.ostatniDzien.getTime() && _class.dzienTygodnia == day.toLocaleLowerCase()
            && (_class.typ=="Wykład" || (userRoles.includes((_class.tytul).trim() + _class.grupa)))
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
function getUserRoles(message){
    const userRoles = message.member.roles._roles;
    userRolesArray = [];
    userRoles.map(role =>{
        userRolesArray.push(roles[role.name]);
    });
    return userRolesArray;
}

const roles = {
    'Grupa 1 SS': "Społeczeństwo sieci1",
    'Grupa 2 SS': "Społeczeństwo sieci2",
    'Grupa 3 SS': "Społeczeństwo sieci3",
    'Filozofia 1': "Podstawy filozofii1",
    'Filozofia 2': "Podstawy filozofii2",
    'wds2': "Wstęp do socjologii2",
    'wds3': "Wstęp do socjologii3"
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