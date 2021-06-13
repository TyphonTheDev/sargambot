const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'announce',
    aliases: ['ann'],
    usage: `announce <Channel>`,
    description: 'Announces Your Given Message',
    timeout: '',
    category: 'premium',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('EMBED_LINKS') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Embed Links\` Permission!`).then(m => m.delete({ timeout: 5000 }));
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${client.emotes.failed} | You Don't Have \`Administrator\` Permission!`).then(m => m.delete({ timeout: 5000 }));

        let edit;
        let chan = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!chan) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}announce <Channel>\``)
        let embed = new MessageEmbed();
        let advanced = new MessageEmbed()
            .setColor('#ff7e00')
            .setTitle("What should the title of the embed be? if none then type `none`")
        let m = await message.channel.send(advanced)
        let title = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        if (title.size) {
            if (title.first().content.toLowerCase() !== "none") {
                if (title.first().length > 256)
                    return message.reply(`${client.emotes.failed} | Title Cannot Exceed 2048 Characters!`)
                        .then(m => m.delete({ timeout: 5000 }));
                embed.setTitle(title.first().content);
            }
        }
        edit = new MessageEmbed()
            .setColor('#ff7e00')
            .setTitle("What should the description of the embed be? if none then type `none`")
        m.edit(edit)
        let description = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        if (description.size) {
            if (description.first().content.toLowerCase() !== "none") {
                if (description.first().length > 2048)
                    return message.reply(`${client.emotes.failed} | Description Cannot Exceed 2048 Characters!`)
                        .then(m => m.delete({ timeout: 5000 }));
                embed.setDescription(description.first().content);
            }
        }
        edit = new MessageEmbed()
            .setColor('#ff7e00')
            .setTitle("What should the image of the embed be? if none then type `none`")
        m.edit(edit)
        let image = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        if (image.size) {
            if (image.first().content.toLowerCase() !== "none") {
                if (!/\.(jpe?g|png|gif)$/i.test(image.first().content)) {
                    return message.reply(`${client.emotes.failed} | Invalid URL!`)
                        .then(m => m.delete({ timeout: 5000 }));
                }
                embed.setImage(image.first().content);
            }
        }
        edit = new MessageEmbed()
            .setColor('#ff7e00')
            .setTitle("What should the color of the embed be, either a hex color or a normal color.")
        m.edit(edit)
        let color = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        embed.setColor(color.first().content);
        edit = new MessageEmbed()
            .setColor('#ff7e00')
            .setTitle("What should the footer of the embed be? if none then type `none`")
        m.edit(edit)
        let footer = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        if (footer.size) {
            if (footer.first().content.toLowerCase() !== "none") {
                if (footer.first().length > 2048)
                    return message.reply(`${client.emotes.failed} | Footer Cannot Exceed 2048 Characters!`)
                        .then(m => m.delete({ timeout: 5000 }));
                embed.setFooter(footer.first().content);
            }
        }
        let rea = await message.channel.send(embed)
        rea.react('✅').then(() => rea.react('❌'));
        filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        rea.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '✅') {
                    chan.send(embed);
                    rea.delete()
                    return message.reply(`${client.emotes.success} | Message Announced Successfully!`)
                }
                else {
                    message.channel.send(`${client.emotes.failed} | Command Cancelled!`);
                }
            })
            .catch(collected => {
                message.reply(`${client.emotes.failed} | Command Timed Out!`);
            });
    }
}