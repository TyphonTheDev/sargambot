const Discord = require("discord.js");
const db = require("old-wio.db");
const canvas = require("discord-canvas");
const client = require('../index')

client.on("guildMemberRemove", async member => {
    let Channel = await db.fetch(`Leave_${member.guild.id}_Channel`);
    if (!Channel) return;
    let Message = await db.fetch(`Leave_${member.guild.id}_Msg`);
    if (!Message) Message = `${member.user.username} Has Left The Server!`;

    if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
    if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";

    let Msg = Message.toLowerCase().replace("<servername>", member.guild.name).replace("<membername>", member.user.username).replace("<membermention>", `<@${member.user.id}>`);
    /*let Leaved = new canvas.Goodbye();
    let Image = await Leaved
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
        .setMemberCount(member.guild.memberCount)
        .setBackground("https://images.wallpaperscraft.com/image/cat_night_lights_74375_1280x720.jpg")
        .toAttachment();

    let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");*/
    return client.channels.cache.get(Channel).send(Msg
        //, Attachment
        );
});
