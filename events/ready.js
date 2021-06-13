const client = require('../index.js')

client.on('ready', () => {
    console.log(client.user.tag + ' Has Logged In! ✅');
    /*client.user.setActivity('discord.gg/dkop', {
        type: "PLAYING"
    });*/
})