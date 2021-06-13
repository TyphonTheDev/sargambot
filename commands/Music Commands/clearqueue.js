module.exports = {
    name: 'clearqueue',
    aliases: ['cq'],
    usage: `clearqueue`,
    description: `Clears the Current Song Queue`,
    timeout: '',
    category: 'music',
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(`${client.emotes.failed} | You're Not In A Voice Channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.failed} | You're Not In The Same Voice Channel!`);

        if (!client.player.getQueue(message)) return message.reply(`${client.emotes.failed} | No Music Currently Playing!`);
        if (client.player.getQueue(message).tracks.length <= 1) return message.reply(`${client.emotes.failed} |  There Is Only One Song In The Queue!`);

        client.player.clearQueue(message);
        message.channel.send(`${client.emotes.success} | The Queue Has Been Cleared!`);
    },
};