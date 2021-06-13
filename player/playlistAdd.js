module.exports = (client, message, queue, playlist) => {
    message.channel.send(`${client.emotes.success} | ${playlist.title} Has Been Added To The Queue (**${playlist.tracks.length}** Songs)!`);
};