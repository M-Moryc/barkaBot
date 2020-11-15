require('dotenv').config()
const Express = require('express');
const app = Express();

const Discord = require('discord.js');
const schedule = require('node-schedule');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');

const client = new Discord.Client();
let mainChannel;
const memuchyId="755095473487872021/762744066780954695";

client.on('ready', async () => {
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
    if(message.content == "!randomMemuch"){
        lots_of_messages_getter(message.channel).then(messages => {
            console.log(`Received ${messages.size} messages`);
            filteredMessages = messages.filter(m=>{return m.attachments.size>0});
            let array = [];
            filteredMessages.forEach(element => {
                console.log(element.attachments.first());
                array.push(element.attachments.first());
            });
            var resArr = [];
            array.filter(function(item){
                var i = resArr.findIndex(x => x.name == item.name);
                if(i <= -1){
                    resArr.push({url: item.url, name: item.name});
                }
                return null
            });
            console.log(resArr);
            const file = new Discord.MessageAttachment(resArr[Math.floor(Math.random() * resArr.length)].url);
            console.log(file);
            message.channel.send({files: [file]});
          })
    }
})

async function lots_of_messages_getter(channel, limit = 1500) {
    const sum_messages = [];
    let last_id;

    while (true) {
        const options = { limit: 100 };
        if (last_id) {
            options.before = last_id;
        }

        const messages = await channel.messages.fetch(options);
        console.log(messages);
        messages.forEach(element => {
            sum_messages.push(element);
        });
        last_id = messages.last().id;

        if (messages.size != 100 || sum_messages >= limit) {
            break;
        }
    }

    return sum_messages;
}


const papiezowa = schedule.scheduleJob({hour: 20, minute: 37}, () => {playBarka(mainChannel)});


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



