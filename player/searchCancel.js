module.exports = (client, message, query, tracks) => {
    message.channel.send(`${client.emotes.failed} | You Did Not Provide A valid Response! Please Use The Command Again!`);
};