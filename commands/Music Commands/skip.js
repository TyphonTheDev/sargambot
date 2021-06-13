module.exports = {
    name: 'skip',
    aliases: ['sk'],
    usage: `skip`,
    description: `Skips the Current Song`,
    timeout: '',
    category: 'music',
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send( `${client.emotes.failed} | You're Not In A Voice Channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.failed} | You're Not In The Same Voice Channel!`);

        if (!client.player.getQueue(message)) return message.reply(`${client.emotes.failed} | No Music Currently playing!`);
        client.player.skip(message);
        message.channel.send(`${client.emotes.success} | The Current Music Has Been Skipped!`);
    },
};