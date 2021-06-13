const { Collection, Client } = require('discord.js');
const fs = require('fs');

const client = new Client({ disableEveryone: true })
module.exports = client;
const config = require('./config.json')
const token = config.token
const { Player } = require('discord-player');

client.player = new Player(client);
client.dev = ['479987197844652042', '734618275446652939'];
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = require('./config.json')
client.emotes = require('./emoji.json')

client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};
client.login(token)