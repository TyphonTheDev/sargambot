module.exports = {
    name: 'resume',
    aliases: ['res'],
    usage: `resume`,
    description: `Resumes the Paused Song`,
    timeout: '',
    category: 'music',
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send( `${client.emotes.failed} | You're Not In A Voice Channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.failed} | You're Not In The Same Voice Channel!`);

        if (!client.player.getQueue(message)) return message.reply(`${client.emotes.failed} | No Music Currently playing!`);
        if (!client.player.getQueue(message).paused) return message.reply(`${client.emotes.failed} | The Music Is Already Playing!`);

        client.player.resume(message);
        message.channel.send(`${client.emotes.success} | Song ${client.player.getQueue(message).playing.title} Resumed!`);
    },
};