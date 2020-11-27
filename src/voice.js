const ytdl = require('ytdl-core-discord');
let connection = null;
let queue = [];

async function play(message, song){
    if(!isYt(song)){
        if(!songs[song])
            message.reply('unknown song');
        song = songs[song];
        console.log(song);
        
    }

    const channel = message.member.voice.channel;
    if(channel === null){
        message.reply("join a voice channel first");
        message.delete();
        return;
    }
    queue.push(song);
    if(!connection){
        connection = await channel.join();
        const dispatcher = connection
        .play(await ytdl(queue.shift()), { type: 'opus' })
        .on('finish', () => {
            console.log('song finished');
            skip(message);
        });
    }
    message.delete();
}

async function stop(message){
   if(connection === null){
       message.reply("no playback is on");
       return;
   }
   queue = [];
   connection.disconnect();

}
async function skip(message){
    if(queue.length===0){
        stop(message);
        return;
    }
    if(connection === null){
        return;
    }
    connection.play(await ytdl(queue.shift()), { type: 'opus' });
}

function isYt(song){
    if(song.match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/))
        return true
    return false;
}

const songs = {
    'sci-fi': 'https://www.youtube.com/watch?v=obQNPLG5JSY',
    barka: 'https://www.youtube.com/watch?v=0qzLRlQFFQ4'
}

module.exports = {play, stop, skip};