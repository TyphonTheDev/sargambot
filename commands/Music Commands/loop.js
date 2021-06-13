module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    usage: `loop`,
    description: 'Loops the Current Song Queue',
    timeout: '',
    category: 'music',
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(`${client.emotes.failed} | You're Not In A Voice Channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.failed} | You're Not In The Same Voice Channel!`);
        if (!client.player.getQueue(message)) return message.reply(`${client.emotes.failed} | No Music Currently Playing!`);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(`${client.emotes.success} | Repeat mode Disabled!`);
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(`${client.emotes.success} | Repeat Mode Enabled For Current Queue!`);
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(`${client.emotes.success} | Repeat Mode Disabled!`);
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(`${client.emotes.success} | Repeat Mode Enabled For Current Song!`);
            };
        };
    },
};