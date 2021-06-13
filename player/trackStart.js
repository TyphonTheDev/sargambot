module.exports = (client, message, track) => {
    message.channel.send(`${client.emotes.success} | Now Playing ${track.title}!`);
};