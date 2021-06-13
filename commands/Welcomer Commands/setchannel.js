const db = require("old-wio.db");

module.exports = {
    name: "setchannel",
    aliases: ["setch", "sc"],
    category: "Config",
    description: "Set The Welcome Or Leave Message Channel!",
    usage: "Setchannel <Mention Channel> <Type>",
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${client.emotes.failed} | You Don't Have \`Administrator\` Permission!`);

        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!Channel || Channel.type === "voice") return message.reply(`${client.emotes.success} | Enter Valid Text Channel!`);

        let Type = args[1];
        let Welcome = ["welcome", "wel", "join"];
        let leave = ["leave", "left"];
        let Types = [];
        Welcome.forEach(wel => Types.push(wel));
        leave.forEach(leav => Types.push(leav));

        if (!Type || !Types.find(T => T === Type.toLowerCase())) return message.reply(`${client.emotes.failed} | Enter Valid Type - Welcome/Left!`);
        Type = Type.toLowerCase();

        async function GetType(Type) {
            if (Welcome.find(W => W === Type)) {
                return "Welcome";
            } else {
                return "Leave";
            };
        };

        let Current = await GetType(Type);
        await db.set(`${Current === "Welcome" ? "Welcome" : "Leave"}_${message.guild.id}_Channel`, Channel.id);

        try {
            return message.channel.send(`${client.emotes.success} | ${Current === "Welcome" ? "Welcome" : "Leave"} Channel Has Been Setted - <#${Channel.id}>`);
        } catch (error) {
            return message.channel.send(`${client.emotes.success} | ${Current === "Welcome" ? "Welcome" : "Leave"} Message Has Been Setted - <#${Channel}>`);
        };

    }
};