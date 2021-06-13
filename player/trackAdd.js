module.exports = (client, message, queue, track) => {
    message.channel.send(`${client.emotes.success} | ${track.title} Has Been Added To The Queue!`);
};