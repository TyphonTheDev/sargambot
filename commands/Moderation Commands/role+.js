module.exports = {
    name: 'role+',
    aliases: ['r+'],
    usage: `Role- <Role> <User(s)>`,
    description: 'Assigns Mentioned Role To The Mentioned User(s)',
    timeout: '',
    category: 'moderation',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('MANAGE_ROLES') | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Manage Roles\` Permission!`).then(m => m.delete({ timeout: 5000 }))
        if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply(`${client.emotes.failed} | You Don't Have \`Manage Roles\` Permission!`).then(m => m.delete({ timeout: 5000 }));

        if(!args[0]) return message.reply(`${client.emotes.failed} | Invalid Arguments!`);
        switch (args[0].toLowerCase()) {
            case `bots`:
                if (!args[1]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}role+ bots <Role>\``);
                const role1 = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                let memberarray1 = message.guild.members.cache.filter(mem => !mem.roles.cache.array().includes(role1) && mem.user.bot).array()
                let membercount1 = memberarray1.length;

                if (message.guild.me.roles.highest.position <= role1.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Assign ${role1.name}!`)
                if (message.member.roles.highest.position <= role1.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Assign ${role1.name}!`)

                const m1 = await message.channel.send(`${client.emotes.success} | Adding \`${role1.name}\` To ${membercount1} Bots!`);
                for (var i = 0; i < membercount1; i++) {
                    let member = memberarray1[i];
                    member.roles.add(role1);
                    if (i <= membercount1) {
                        m1.edit(`${client.emotes.success} | Added \`${role1.name}\` To ${membercount1} Bots!`)
                    }
                }
                break;

            case `humans`:
                if (!args[1]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}role+ humans <Role>\``)
                const role2 = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                let memberarray2 = message.guild.members.cache.filter(mem => !mem.roles.cache.array().includes(role2) && !mem.user.bot).array();
                let membercount2 = memberarray2.length;

                if (message.guild.me.roles.highest.position <= role2.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Assign ${role2.name}!`)
                if (message.member.roles.highest.position <= role2.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Assign ${role2.name}!`)

                const m2 = await message.channel.send(`${client.emotes.success} | Adding \`${role2.name}\` To ${membercount2} Humans!`);
                for (var i = 0; i < membercount2; i++) {
                    let member = memberarray2[i];
                    member.roles.add(role2);
                    if (i <= membercount2) {
                        m2.edit(`${client.emotes.success} | Added \`${role2.name}\` To ${membercount2} Humans!`)
                    }
                }
                break;

            case `all`:
                if (!args[1]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}role+ all <Role>\``)
                const role3 = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                let memberarray3 = message.guild.members.cache.filter(mem => !mem.roles.cache.array().includes(role3)).array();
                let membercount3 = memberarray3.length;

                if (message.guild.me.roles.highest.position <= role3.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Assign ${role3.name}!`)
                if (message.member.roles.highest.position <= role3.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Assign ${role3.name}!`)

                const m3 = await message.channel.send(`${client.emotes.success} | Adding \`${role3.name}\` To ${membercount3} Users!`);
                for (var i = 0; i < membercount3; i++) {
                    let member = memberarray3[i];
                    member.roles.add(role3);
                    if (i <= membercount3) {
                        m3.edit(`${client.emotes.success} | Added \`${role3.name}\` To ${membercount3} Users!`)
                    }
                }
                break;

            default:
                let roleassign = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
                if (!roleassign) return message.reply(`${client.emotes.failed} | Role Not Found!`)
                let memberarray4 = message.mentions.members.array();
                let membercount4 = memberarray4.length;

                if (message.guild.me.roles.highest.position <= roleassign.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Assign ${roleassign.name}!`)
                if (message.member.roles.highest.position <= roleassign.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Assign ${roleassign.name}!`)

                const m4 = await message.channel.send(`${client.emotes.success} | Adding \`${roleassign.name}\` To ${message.mentions.members.map(member => '\`' + member.user.tag + '\`').join(", ")}!`);
                for (var i = 0; i < membercount4; i++) {
                    let member = memberarray4[i];
                    member.roles.add(roleassign);
                    if (i <= membercount4) {
                        m4.edit(`${client.emotes.success} | Added \`${roleassign.name}\` To ${message.mentions.members.map(member => '\`' + member.user.tag + '\`').join(", ")}!`)
                    }
                }
        }
    }
}