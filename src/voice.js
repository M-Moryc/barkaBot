const ytdl = require('ytdl-core');
let connection = null;

async function play(message, song){
    console.log(message);
    const channel = message.member.voice.channel;
    if(channel === null){
        message.reply("join a voice channel first");
        message.delete();
        return;
    }
    connection = await channel.join();
    const dispatcher = connection.play(ytdl(song, { filter: 'audioonly' }));
    dispatcher.on('finish', () => {
        connection = null;
        channel.leave();
      });
    message.delete();
}

async function stop(message){
   if(connection === null){
       message.reply("no playback is on");
       return;
   }
   connection.disconnect();

}

module.exports = {play, stop};