const Discord = require('discord.js');
const { parse } = require("twemoji-parser");

module.exports = {
    name: 'addemoji',
    aliases: ['add', 'steal'],
    usage: `addemoji <Emoji> [Name]`,
    description: 'Adds Given Emoji To Server',
    timeout: '',
    category: 'utility',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('MANAGE_EMOJIS') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Manage Emojis\` Permission!`).then(m => m.delete({ timeout: 5000 }));
        if (!message.member.permissions.has(`MANAGE_EMOJIS`)) return message.reply(`${client.emotes.failed} | You Don't Have \`Manage Emojis\` Permission!`).then(m => m.delete({ timeout: 5000 }));
        const emoji = args[0];
        if (!emoji) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}addemoji <Emoji> [Name]\``);

        let customemoji = Discord.Util.parseEmoji(emoji);
        if (customemoji.id) {

            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"
                }`;

            const name = args.slice(1).join(" ");
            const emocreate = message.guild.emojis.create(
                `${Link}`,
                `${name || `${customemoji.name}`}`
            )
            if (!emocreate) message.reply(`${client.emotes.failed} | Failed To Add Emoji!`)

            const Added = new Discord.MessageEmbed()
                .setTitle(`${client.emotes.success} | Emoji Added!`)
                .setColor(`RANDOM`)
                .setDescription(
                    `Emoji Has Been Added! | Name : ${name ||
                    `${customemoji.name}`} | Preview : [Click Me](${Link})`
                );
            return message.channel.send(Added);
        }
        else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0]) return message.reply(`${client.emotes.failed} | Please Give Me A Valid Emoji!`);
            message.reply(`${client.emotes.failed} | You Can Use Normal Emoji Without Adding In Server!`);
        }
    }
}