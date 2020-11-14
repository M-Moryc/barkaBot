require('dotenv').config()
const Express = require('express');

const app = Express();

const Discord = require('discord.js');
const schedule = require('node-schedule');
const ytdl = require('ytdl-core');

const client = new Discord.Client();
let mainChannel;


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if(message.content == "!setupBarka" && message.author.username == "Dywan"){
        mainChannel =  message.member.voice.channel;
        console.log("setupdone");
    }

    if(message.content == "!playBarka"){
        if(message.member.voice.channel != null)
            playBarka(message.member.voice.channel)
        else{
            message.reply("join a voice channel first");
        }
    }
})

const papiezowa = schedule.scheduleJob({hour: 21, minute: 37}, () => {playBarka(mainChannel)});


async function playBarka(channel){
    const connection = await channel.join();
    const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=0qzLRlQFFQ4', { filter: 'audioonly' }));
    dispatcher.on('finish', () => {
        channel.leave();
      }); 
}

client.login(process.env.DISCORD_TOKEN);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
  });