module.exports = {
    name: 'voicekick',
    aliases: ['vkick', 'vk'],
    usage: `voicekick <User>`,
    description: 'Kicks Mentioned User From Voice Channel',
    timeout: '',
    category: 'moderation',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('MOVE_MEMBERS') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Move Members\` Permission!`).then(m => m.delete({ timeout: 5000 }));
        if (!message.member.permissions.has('MOVE_MEMBERS')) return message.reply(`${client.emotes.failed} | You Don't Have \`Move Members\` Permission!`).then(m => m.delete({ timeout: 5000 }));

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}voicekick <User>\``);

        let { channel } = target.voice;
        if (!channel) return message.reply(`${client.emotes.failed} | User Is Not In Any Voice Channel!`);
        if (client.dev.includes(target.id)) return message.reply(`${client.emotes.failed} | I Cannot Voicekick My Owner!`);
        target.voice.kick();

        message.channel.send(`${client.emotes.success} | User Has Been Kicked From Voice Channel!`)
    }
}