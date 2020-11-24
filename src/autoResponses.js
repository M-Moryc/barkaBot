const { getUserRoles } = require('./roles');
const {storage} = require('./storage');

async function setResponse(message, responseTrigger, responseReply){
    const {getUserRoles} = require('./roles');
    const userRoles = getUserRoles(message);
    console.log(responseTrigger, responseReply);
    if(!userRoles.includes('Moderacja')){
        message.reply('nie masz uprawnien :/');
        return;
    }
    const responsesArray = await storage.getItem('responses') || [];
    responsesArray.push({trigger: responseTrigger, reply: responseReply});
    storage.setItem('responses', responsesArray);
    console.log(await storage.getItem('responses'));
}

async function autoRespond(message){
    const found = [];
    const storageArray = await storage.getItem('responses');
    if(!storageArray){
        return;
    }
    storageArray.map(item =>{
        if(message.content.includes(item.trigger))
            found.push(item);
    });
    found.map(item=>{
        message.channel.send(item.reply);
    })
}

module.exports = {setResponse, autoRespond};