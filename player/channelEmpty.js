module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.failed} | Music stopped As There Is No More Members In The Voice Channel!`);
};