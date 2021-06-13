module.exports = {
    name: 'play',
    aliases: ['p'],
    usage: `play <Song/YT URL>`,
    description: `Plays the Given Song/URL`,
    timeout: '',
    category: 'music',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('CONNECT') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Connect\` Permission!`).then(m => m.delete({ timeout: 5000 }));

        if (!message.member.voice.channel) return message.reply(`${client.emotes.failed} | You're Not In A Voice Channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.failed} | You Are Not In The Same Voice Channel!`);
        
        const queue = client.player.getQueue(message);
        if (!args[0]) return message.reply(`${client.emotes.failed} | Please Indicate The Title Of A Song!`);
        client.player.play(message, args.join(" "), { firstResult: true });
   },
};