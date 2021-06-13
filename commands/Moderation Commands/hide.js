module.exports = {
    name: 'hide',
    aliases: [],
    usage: `hide [Channel]`,
    description: 'Hides The Current/Mentioned Channels for everyone',
    timeout: '',
    category: 'moderation',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('MANAGE_CHANNELS') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Manage Channels\` Permission!`).then(m => m.delete({ timeout: 5000 }));
        if (!message.member.permissions.has('MANAGE_CHANNELS') | !message.member.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | You Don't Have \`Manage Channels\` Permission!`).then(m => m.delete({ timeout: 5000 }));

        if (message.mentions.channels.first()) {
            await message.mentions.channels.forEach(async channel => {
                await channel.updateOverwrite(channel.guild.roles.everyone, {
                    VIEW_CHANNEL: false
                });
                message.channel.send(`${client.emotes.success} | <#${channel.id}> Has Been Hidden!`)
            })
        }
        else if (!args[0]) {
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
                VIEW_CHANNEL: false
            });
            message.channel.send(`${client.emotes.success} | <#${message.channel.id}> Has Been Hidden!`)
        }
        else return;
    }
}