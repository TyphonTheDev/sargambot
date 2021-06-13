const Discord = require('discord.js');
const { util } = require('discord.js-commando')

module.exports = {
    name: 'members',
    aliases: ['mem', 'dump'],
    usage: `members <Role>`,
    description: 'Check All The Members With The Mentioned Role',
    timeout: '15000',
    category: 'utility',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('EMBED_LINKS') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Embed Links\` Permission!`).then(m => m.delete({ timeout: 5000 }))
        if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply(`${client.emotes.failed} | I Don't Have \`Manage Roles\` Permission!`).then(m => m.delete({ timeout: 5000 }))
        if (!args[0]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}members <Role>\``)
        let reactuser = message.author;
        let roleName;
        let memberCount;
        let membersWithRole;
        let page = 1;
        let paginated;
        if (message.mentions.roles.first()) {
            roleName = message.mentions.roles.first();
            memberCount = roleName.members.size;
            membersWithRole = message.guild.members.cache.filter(member => member.roles.cache.find(role => role === roleName)).sort().map(member => member);
        }

        else {
            roleName = args[0];
            memberCount = message.guild.roles.cache.get(roleName).members.size;
            membersWithRole = message.guild.members.cache.filter(member => member.roles.cache.find(role => role.id === roleName)).sort().map(member => member);
        }

        paginated = util.paginate(membersWithRole, page, 20);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(paginated.items.map(member => member.user.username + `(${member.user.id})`))
            .setFooter(`Members With ${roleName} Role [${memberCount}]`)
        let m = await message.channel.send(embed)

        await m.react("◀️");
        await m.react("▶️");
        await m.react("❌");

        const filter = (reaction, user) => (reaction.emoji.name === "◀️" && user.id === message.author.id) || (reaction.emoji.name === "▶️" && user.id === message.author.id) || (reaction.emoji.name === "❌" && user.id === message.author.id);

        let reactionChoice = await m.createReactionCollector(filter, {
            time: 500000
        });

        reactionChoice.on("collect", async r => {
            if (r.emoji.name === "◀️") {
                page--;
                paginated = util.paginate(membersWithRole, page, 20);
                let edit = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(paginated.items.map(member => member.user.username + `(${member.user.id})`))
                    .setFooter(`Members With ${roleName} Role [${memberCount}]`)
                m.edit(edit);
            }

            else if (r.emoji.name === "▶️") {
                page++;
                paginated = util.paginate(membersWithRole, page, 20);
                let edit = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(paginated.items.map(member => member.user.username + `(${member.user.id})`))
                    .setFooter(`Members With ${roleName} Role [${memberCount}]`)
                m.edit(edit);
            }

            if (r.emoji.name === "❌") {
                m.delete();
                return;
            }
            r.users.remove(reactuser.id)
        })
    }
}