module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.failed} | Music Stopped As I Have Been Disconnected From The Channel!`);
};