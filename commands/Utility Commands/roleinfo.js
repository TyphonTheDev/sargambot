const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    name: 'roleinfo',
    aliases: ['rinfo'],
    usage: `roleinfo <Role>`,
    description: 'Returns Information About The Mentioned Role',
    timeout: '10000',
    category: 'utility',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('EMBED_LINKS') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Embed Links\` Permission!`).then(m => m.delete({ timeout: 5000 }))
        const role = message.guild.roles.cache.find(r => (r.name === args.toString()) || (r.id === args.toString()))
        if (!role) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}roleinfo <Role>\``)
        const perms = new Permissions(role.permissions.bitfield).toArray()
        const embed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Information For ${role.name}`)
            .setDescription(`
**ID:** ${role.id}
**Created On:** 
**Position:** ${parseInt(message.guild.roles.cache.size - role.position + 1)}
**Color:** ${role.hexColor}
**Mentionable:** ${role.mentionable}
**Hoisted:** ${role.hoist}
**Managed:** ${role.managed}
**Permissions:** \`${perms.join(', ')}\`
**Members:** ${role.members.size}
${message.guild.members.cache.filter(member => member.roles.cache.find(r => r == role)).sort().map(member => `<@` + member.user.id + `>`)}
`)
            .setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL({ dynamic: true }) + "?size=512")
        message.channel.send(embed)
    }
}