const { RichPresenceAssets } = require("discord.js");

const roles = {
    'Grupa 1 SS': "Społeczeństwo sieci1",
    'Grupa 2 SS': "Społeczeństwo sieci2",
    'Grupa 3 SS': "Społeczeństwo sieci3",
    'Filozofia 1': "Podstawy filozofii1",
    'Filozofia 2': "Podstawy filozofii2",
    'wds2': "Wstęp do socjologii2",
    'wds3': "Wstęp do socjologii3"
}

function getUserRoles(message){
    const userRoles = message.member.roles._roles;
    userRolesArray = [];
    userRoles.map(role =>{
        userRolesArray.push(roles[role.name] || role.name);
    });
    return userRolesArray;
}

module.exports = {getUserRoles};