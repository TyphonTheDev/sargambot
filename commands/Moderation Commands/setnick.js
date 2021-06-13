module.exports = {
    name: 'setnick',
    aliases: ['nick'],
    usage: `setnick <User> <Nickname>`,
    description: 'Sets Mentioned Nickname To Mentioned User',
    timeout: '',
    category: 'moderation',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has("MANAGE_NICKNAMES") | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Embed Links\` Permission!`).then(m => m.delete({ timeout: 5000 }))
        if (!message.member.permissions.has('MANAGE_NICKNAMES')) return message.reply(`${client.emotes.failed} | You Don't Have \`Embed Links\` Permission!`).then(m => m.delete({ timeout: 5000 }))
        let member;
        if (message.mentions.members.first()) {
            member = message.mentions.members.first();
        }
        else {
            member = message.guild.members.cache.get(args[0])
        }
        if (!member) return;
        if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough to Change ${member} Nickname!`)
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough to Change ${member} Nickname!`)
        if (member.id === message.guild.ownerID) return message.reply(`${client.emotes.failed} | Server Owner's Nickname Cannot Be Changed!`)
        if (!member) return message.channel.send(`${client.emotes.failed} | Usage: \`${client.prefix}setnick <User> <Nickname>\``)
        if (!args[1]) {
            member.setNickname(member.user.username);
            message.channel.send(`${client.emotes.success} | Reset Nickname to ${member.user.username}!`);
        }
        else {
            const nick = args.join(" ").slice(22);
            member.setNickname(nick);
            message.channel.send(`${client.emotes.success} | Changed Nickname to ${nick}!`);
        }
    }
}