const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'embed',
    aliases: ['em'],
    usage: `embed <Text>`,
    description: 'Embeds Your Given Text',
    timeout: '',
    category: 'utility',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('EMBED_LINKS') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Embed Links\` Permission!`).then(m => m.delete({ timeout: 5000 }))
        if (!message.member.permissions.has('EMBED_LINKS')) return message.reply(`${client.emotes.failed} | You Don't Have \`Embed Links\` Permission!`).then(m => m.delete({ timeout: 5000 }))
        if (!args[0]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}embed <Text>\``)
        let msg = args.join(" ")
        let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(msg)
            .setTimestamp()
        message.channel.send(embed)
    }
}