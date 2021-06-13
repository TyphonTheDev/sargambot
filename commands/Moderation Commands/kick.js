module.exports = {
    name: 'kick',
    aliases: [],
    usage: `kick <User> <Reason>`,
    description: 'Kicks The Mentioned User',
    timeout: '',
    category: 'moderation',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('KICK_MEMBERS') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Kick Members\` Permission!`).then(m => m.delete({ timeout: 5000 }));
        if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply(`${client.emotes.failed} | You Don't Have \`Kick Members\` Permission!`).then(m => m.delete({ timeout: 5000 }))
        let target;
        let reason = args.slice(1).join(' ');
        if (message.mentions.members.first()) {
            target = message.mentions.members.first();
        }
        else {
            target = message.guild.members.cache.get(args[0])
        }
        if (!target | !reason) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}kick <User> <Reason>\``);
        if (message.guild.me.roles.highest.position <= target.roles.highest.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough to Kick The Member!`);
        if (message.member.roles.highest.position <= target.roles.highest.position) return message.reply(`Your Role Isn't High Enough to Kick The Member!`);
        if (target.id === message.guild.ownerID) return message.reply(`${client.emotes.failed} | Server Owner Cannot Be Kicked!`)
        if (target.id === message.author.id) return message.reply(`${client.emotes.failed} | You Cannot Kick Yourself!`);
        if (client.dev.includes(target.id)) return message.reply(`${client.emotes.failed} | I Cannot Kick My Owner!`);
        await target.kick(`[${message.author.username}] : ${reason}`);

        message.channel.send(`${client.emotes.success} | ${target.user.tag}(${target.id}) Has Been Kicked By ${message.author.tag} For ${reason}!`);
    }
}