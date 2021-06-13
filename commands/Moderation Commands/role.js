module.exports = {
    name: 'role',
    aliases: ['r'],
    usage: `role Create/Delete`,
    description: 'Creates A New Role In The Server',
    timeout: '',
    category: 'moderation',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('MANAGE_ROLES') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Manage Roles\` Permission!`).then(m => m.delete({ timeout: 5000 }))
        if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply(`${client.emotes.failed} | You Don't Have \`Manage Roles\` Permission!`).then(m => m.delete({ timeout: 5000 }));

        if (!args[0]) return message.reply(`\n${client.emotes.failed} | Usage: \`${client.prefix}role create <Name> <#HexCode>\`\n${client.emotes.failed} | Usage: \`${client.prefix}role delete <Role>\``)
        if (args[0].toLowerCase() === 'create') {
            let rolename = message.content.split(`${client.prefix}role create `).join("")
            let rolecolor;
            args.forEach(arg => {
                if (arg.startsWith("#")) {
                    rolecolor = arg
                }
            })
            if (!rolename || !rolecolor) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}role create <Name> <#HexCode>\``)
            if (rolecolor >= 16777215 || rolecolor <= 0) return message.reply(`${client.emotes.failed} | Invalid Hex Code!`)
            rolename = rolename.replace(`${rolecolor}`, ``)
            let rolenew = await message.guild.roles.create({
                data: {
                    name: rolename,
                    color: rolecolor,
                }
            })
            message.channel.send(`${client.emotes.success} | Role Created : ${rolename}, Hex Color : ${rolecolor}!`)
        }
        else if (args[0].toLowerCase() === 'delete') {
            let roledelete = message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name == args[1])
            if (!roledelete) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}role delete <Role>\``)
            roledelete.delete();
            message.channel.send(`${client.emotes.success} | Role Deleted : ${roledelete.name}, Hex Color : ${roledelete.color}!`)
        }
        else return;
    }
}