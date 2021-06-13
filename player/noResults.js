module.exports = (client, message, query) => {
    message.channel.send(`${client.emotes.failed} | No Results Found On YouTube For ${query}!`);
};