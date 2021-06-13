module.exports = {
    name: 'purge',
    aliases: ['clean', 'clear'],
    usage: `purge [Type] <Messages>`,
    description: 'Deletes Given Number Of Messages',
    timeout: '10000',
    category: 'moderation',
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES") | !message.guild.me.permissionsIn(message.channel)) return message.reply(`${client.emotes.failed} | I Don't Have \`Manage Messages\` Permission!`).then(m => m.delete({ timeout: 5000 }));
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply(`${client.emotes.failed} | You Don't Have \`Manage Messages\` Permission!`).then(m => m.delete({ timeout: 5000 }));

        if (!args[0]) return message.reply(`${client.emotes.failed} | Invalid Arguments!`)
        if (message.mentions.users.size > 0) {
            let amountToDelete = args[1]
            if (!args[1]) amountToDelete = 50;
            if (parseInt(amountToDelete) > 100) return message.reply(`${client.emotes.failed} | Invalid Argument!`)
            let userMessages = await message.channel.messages.fetch({ limit: parseInt(amountToDelete) })
            let userFilter = userMessages.filter(obj => obj.author.id === message.mentions.users.first().id)
            let menpinned = userFilter.filter(message => !message.pinned)

            message.channel.bulkDelete(menpinned, true)
            message.channel.send(`${client.emotes.success} | Deleted **` + menpinned.size + `** Messages!`).then(m => m.delete({ timeout: 5000 }))
        }

        else if (args[0].toLowerCase().includes(`bot`)) {
            let awaitBotMessages = await message.channel.messages.fetch({ limit: 100 })
            let botFilter = awaitBotMessages.filter(obj => obj.author.bot)
            let botpinned = botFilter.filter(message => !message.pinned)

            message.channel.bulkDelete(botpinned, true)
            message.channel.send(`${client.emotes.success} | Deleted **` + botpinned.size + `** Messages!`).then(m => m.delete({ timeout: 5000 }))
        }

        else if (args[0].toLowerCase().includes(`image`)) {
            let awaitImageMessages = await message.channel.messages.fetch({ limit: 100 })
            let imageFilter = awaitImageMessages.filter(obj => obj.attachments.size > 0)
            let imgpinned = imageFilter.filter(message => !message.pinned)

            message.channel.bulkDelete(imgpinned, true)
            message.channel.send(`${client.emotes.success} | Deleted **` + imgpinned.size + `** Messages!`).then(m => m.delete({ timeout: 5000 }))
        }

        else if (args[0].toLowerCase().includes(`all`)) {
            let messages = 0;
            let i = true;

            while (i) {
                let deleteAble = await message.channel.messages.fetch({ limit: 100 })
                let allpinned = deleteAble.filter(message => !message.pinned)
                if (allpinned.size < 100) {
                    await message.channel.bulkDelete(allpinned)
                    messages += allpinned.size;
                    i = false;
                    message.channel.send(`${client.emotes.success} | Deleted **` + messages + `** Messages!`).then(m => m.delete({ timeout: 5000 }))
                    messages = 0;
                }

                await message.channel.bulkDelete(allpinned, true)
                messages += allpinned.size
            }
        }

        else if (typeof (parseInt(args[0])) == "number") {
            if (parseInt(args[0]) > 100) return message.reply(`${client.emotes.failed} | Enter Valid Number Between 0-100!`)
            let messages = await message.channel.messages.fetch({ limit: parseInt(args[0]) })
            let numpinned = messages.filter(message => !message.pinned)

            message.channel.bulkDelete(numpinned, true).then(m => {
                message.channel.send(`${client.emotes.success} | Deleted **` + m.size + `** Messages!`).then(m => setTimeout(() => { m.delete(); }, 4000))
            })
        }
    }
}