const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    aliases: ['h'],

    description: "Shows All Available Bot Commands.",
    timeout: `10000`,
    category: 'info',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('EMBED_LINKS') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Embed Links\` Permission!`).then(m => m.delete({ timeout: 5000 }))

        if (!args[0]) {
            let categories = [];
            readdirSync("./commands/").forEach((dir) => {
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);
                    if (!file.name) return "No command name.";
                    let name = file.name.replace(".js", "");
                    return `\`${name}\``;
                });

                let data = new Object();
                data = {
                    name: dir,
                    value: cmds.length === 0 ? "In progress." : cmds.join(" "),
                };
                categories.push(data);
            });

            const embed = new MessageEmbed()
                .addFields(categories)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
                .setColor(`RANDOM`);
            return message.channel.send(embed);
        }
        else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
            if (!command) return message.reply(`${client.emotes.failed} | Invalid command! Use \`${client.prefix}help\` For All Commands!`)

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .setDescription(`
                **Command Name:** \`${command.name ? `${command.name}` : "No Name For This Command!"}\`
                **Command Aliases:** \`${command.aliases ? `${command.aliases.join("` `")}` : "No Aliases For This Command!"}\`
                **Command Usage:** \`${command.usage ? `${client.prefix}${command.usage}` : `${client.prefix}${command.name}`}\`
                **Command Description:** \`${command.description ? command.description : "No Description For This Command!"}\`
                **Command CoolDown:** \`${command.cooldown ? command.cooldown : "No Cooldown For This Command!"}\`
                    `)
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(`RANDOM`);
            return message.channel.send(embed);
        }
    },
};