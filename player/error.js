module.exports = (client, error, message) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.failed} | There Is No Music Being Played On This Server!`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.failed} | You Are Not Connected In Any Voice Channel!`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.failed} | I'm Unable To Join Your Voice Channel!`);
            break;
        default:
            message.channel.send(`${client.emotes.failed} | Something Went Wrong... Error : ${error}`);
    };
};
