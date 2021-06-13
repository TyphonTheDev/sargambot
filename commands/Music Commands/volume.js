module.exports = {
    name: 'volume',
    aliases: ['vol'],
    usage: `volume [1-100]`,
    description: `Sets Music Volume`,
    timeout: '',
    category: 'music',
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send( `${client.emotes.failed} | You're Not In A Voice Channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.failed} | You're Not In The Same Voice Channel!`);

        if (!client.player.getQueue(message)) return message.reply(`${client.emotes.failed} | No Music Currently playing!`);
        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`${client.emotes.failed} | Please Enter A Valid Number!`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.reply(`${client.emotes.failed} | Please Enter A Valid Number (Between 1 & 100)!`);
        client.player.setVolume(message, parseInt(args[0]));
        message.channel.send(`${client.emotes.success} | Volume Set To ${parseInt(args[0])}%!`);
    },
};