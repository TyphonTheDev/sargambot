const Discord = require("discord.js");
const db = require("old-wio.db");
const canvas = require("discord-canvas");
const client = require('../index')

client.on("guildMemberAdd", async member => {
    let Channel = await db.fetch(`Welcome_${member.guild.id}_Channel`);
    if (!Channel) return;
    let Message = await db.fetch(`Welcome_${member.guild.id}_Msg`);
    if (!Message) Message = `<@${member.user.id}> Welcome To The Server!`;

    if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
    if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";

    let Msg = Message.toLowerCase().replace("<servername>", member.guild.name).replace("<membername>", member.user.username).replace("<membermention>", `<@${member.user.id}>`);
    /*let Welcomed = new canvas.Welcome();
    let Image = await Welcomed
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
        .setMemberCount(member.guild.memberCount)
        .setBackground("https://images.wallpaperscraft.com/image/landscape_art_road_127350_1280x720.jpg")
        .toAttachment();*/

    let Attachment = new Discord.MessageAttachment("https://media.discordapp.net/attachments/831976801113997382/862696208748380170/ezgif.com-gif-maker_1.gif?width=259&height=259");
    member.send(`**Thankyou for joining SARGAM. Please do follow my Instagram :\nhttps://www.instagram.com/satyam_classicshadaj/ **`).catch((err) => {
        console.log(err)
    })
    return client.channels.cache.get(Channel).send(Msg
        , Attachment
    )

});