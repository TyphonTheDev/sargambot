module.exports = {
    name: 'mmode',
    aliases: ['mm'],
    usage: `mmode <On/Off>`,
    description: 'Enables/Disables Maintenance Mode in the Server',
    timeout: '',
    category: 'utility',
    userpermissions: ['ADMINISTRATOR'],
    botpermissions: ['MANAGE_CHANNELS'],
    run: async (client, message, args) => {
        if (!args[0]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}mmode <On/Off>\``)
        let filter;
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        switch (args[0].toLowerCase()) {
            case `on`:
                message.react('✅').then(() => message.react('❌'));
                filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
                        if (reaction.emoji.name === '✅') {
                            if (role) {
                                message.guild.channels.cache.forEach(ch => {
                                    ch.updateOverwrite(role, {
                                        VIEW_CHANNEL: false
                                    });
                                })
                            }
                            else {
                                message.guild.channels.cache.forEach(ch => {
                                    ch.updateOverwrite(ch.guild.roles.everyone, {
                                        VIEW_CHANNEL: false
                                    });
                                })
                            }
                            message.channel.send(`${client.emotes.success} | Maintenance Mode On!`)
                                .then(message.guild.channels.create("maintenance-chat", {
                                    type: "text",
                                    position: 0,
                                    permissionOverwrites: [{
                                        id: message.guild.id,
                                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                                    }]
                                }))
                                .then(message.guild.channels.create("maintenance vc", {
                                    type: "voice",
                                    position: 1,
                                    permissionOverwrites: [{
                                        id: message.guild.id,
                                        allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK']
                                    }]
                                }))
                        }
                        else {
                            message.reply(`${client.emotes.failed} | Command Cancelled!`);
                        }
                    })
                    .catch(collected => {
                        message.reply(`${client.emotes.failed} | Command Timed Out!`);
                    });
                break;

            case `off`:
                message.react('✅').then(() => message.react('❌'));
                filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '✅') {
                            if (role) {
                                message.guild.channels.cache.forEach(ch => {
                                    ch.updateOverwrite(role, {
                                        VIEW_CHANNEL: true
                                    });
                                })
                            }
                            else {
                                message.guild.channels.cache.forEach(ch => {
                                    ch.updateOverwrite(ch.guild.roles.everyone, {
                                        VIEW_CHANNEL: true
                                    });
                                })
                            }
                            message.channel.send(`${client.emotes.success} | Maintenance Mode Off!`)
                        }
                        else {
                            message.reply(`${client.emotes.failed} | Command Cancelled!`);
                        }
                    })
                    .catch(collected => {
                        message.reply(`${client.emotes.failed} | Command Timed Out!`);
                    });
                break;
            default:
                return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}mmode <On/Off>\``)
        }
    }
}