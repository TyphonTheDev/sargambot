const Discord = require("discord.js");
const db = require("old-wio.db");

module.exports = {
    name: "setmessage",
    aliases: ["setmsg", "sm"],
    category: "Config",
    description: "Set The Welcome Or Leave Message When Someone Joins Or Leave!",
    usage: "Setmessage <Type> <Message>",
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${client.emotes.failed} | You Don't Have \`Administrator\` Permission!`)

        let Type = args[0];
        let Welcome = ["welcome", "wel", "join"];
        let leave = ["leave", "left"];
        let Types = [];
        Welcome.forEach(wel => Types.push(wel));
        leave.forEach(leav => Types.push(leav));

        if (!Type || !Types.find(T => T === Type.toLowerCase())) return message.reply(`${client.emotes.failed} | Please Give A Valid Type - Welcome/Left!`);
        Type = Type.toLowerCase();
        let Msg = args.slice(1).join(" ");
        if (!Msg) return message.reply(`${client.emotes.failed} | Please Give Message\n\nCustom:\n<ServerName> => Server Name\n<MemberName> => Member Name\n<MemberMention> => Member Mention`);
        if (Msg.length > 1000) return message.reply(`${client.emotes.failed} | Too Long Message - Limit 1000!`);

        async function GetType(Type) {
            if (Welcome.find(W => W === Type)) {
                return "Welcome";
            } else {
                return "Leave";
            };
        };

        let Current = await GetType(Type);
        await db.set(`${Current === "Welcome" ? "Welcome" : "Leave"}_${message.guild.id}_Msg`, Msg);

        try {
            return message.channel.send(`${client.emotes.success} | ${Current === "Welcome" ? "Welcome" : "Leave"} Message Has Been Setted -\n${Msg}`);
        } catch (error) {
            return message.channel.send(`${client.emotes.success} | ${Current === "Welcome" ? "Welcome" : "Leave"} Message Has Been Setted -\n${Msg}`);
        };

    }
};