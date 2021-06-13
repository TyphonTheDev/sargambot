module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.failed} | Music Stopped As There Is No More Music In The Queue!`);
};