module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    usage: `shuffle`,
    description: `Shuffles the Current Song Queue`,
    timeout: '',
    category: 'music',
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send( `${client.emotes.failed} | You're Not In A Voice Channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.failed} | You're Not In The Same Voice Channel!`);

        if (!client.player.getQueue(message)) return message.reply(`${client.emotes.failed} | No Music Currently playing!`);
        client.player.shuffle(message);
        return message.channel.send(`${client.emotes.success} | Queue Shuffled ${client.player.getQueue(message).tracks.length} Song(s)!`);
    },
};