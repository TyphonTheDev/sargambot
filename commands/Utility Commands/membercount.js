const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'membercount',
    aliases: [],
    usage: `membercount`,
    description: 'Returns Total Number Of Members In The Server',
    timeout: '10000',
    category: 'utility',
    run: async (client, message, args) => {
        const serverEmbed = new MessageEmbed()
            .setTitle(`${message.guild.name}`)
            .setColor("RANDOM")
            .addField(`Members`, `${message.guild.members.cache.size}`, true)
            .setTimestamp()
        message.channel.send(serverEmbed);
    }
}