module.exports = {
    name: 'search',
    aliases: ['sr'],
    usage: `search <Name/URL>`,
    description: `Returns Top Results for Given Song`,
    timeout: '',
    category: 'music',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('EMBED_LINKS') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Embed Links\` Permission!`).then(m => m.delete({ timeout: 5000 }));
        if (!message.member.voice.channel) return message.reply(`${client.emotes.failed} | You're Not In A Voice Channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.failed} | You're Not In The Same Voice Channel!`);

        if (!args[0]) return message.reply(`${client.emotes.failed} | Please Indicate The Title Of A Song!`);
        client.player.play(message, args.join(" "));
    },
};