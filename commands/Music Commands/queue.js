module.exports = {
    name: 'queue',
    aliases: ['q'],
    usage: `queue`,
    description: `Returns the Current Playing Queue`,
    timeout: '',
    category: 'music',
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(`${client.emotes.failed} | You're Not In A Voice Channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.error} - You're Not In The Same Voice Channel!`);

        const queue = client.player.getQueue(message);
        if (!client.player.getQueue(message)) return message.reply(`${client.emotes.failed} | No Songs Currently Playing!`);

        message.channel.send(`**Server Queue - ${message.guild.name} ${client.player.getQueue(message).loopMode ? '(Looped)' : ''}**\n` + (queue.tracks.map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${track.author} (Requested by : ${track.requestedBy.username})`
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** Other Songs...` : `In The Playlist **${queue.tracks.length}** Song(s)...`}`));
    },
};