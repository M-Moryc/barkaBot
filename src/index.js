require('dotenv').config()
require('./expressBullshit');

const Discord = require('discord.js');
const { handleCommand } = require('./command');


const client = new Discord.Client();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', message => {
    
   handleCommand(message);
    
});


client.login(process.env.DISCORD_TOKEN);




