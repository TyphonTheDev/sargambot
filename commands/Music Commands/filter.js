module.exports = {
    name: 'filter',
    aliases: [],
    usage: `filter <Filter Name>`,
    description: `Adds a Filter to Current Song/Queue`,
    timeout: '',
    category: 'music',
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(`${client.emotes.failed} | You're Not In A Voice Channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.failed} | You're Not In The Same Voice Channel!`);

        if (!client.player.getQueue(message)) return message.reply(`${client.emotes.failed} | No Music Currently Playing!`);
        if (!args[0]) return message.reply(`${client.emotes.failed} | Please Specify A Valid Filter To Enable Or Disable!`);

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());
        if (!filterToUpdate) return message.reply(`${client.emotes.failed} | This Filter Doesn't Exist!`);

        const filtersUpdated = {};
        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;
        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`${client.emotes.success} | Adding Filter To Music, Please Wait!`);
        else message.channel.send(`${client.emotes.success} | Disabling Filter To Music, Please Wait!`);
    },
};