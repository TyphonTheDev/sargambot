module.exports = {
    name: 'ping',
    
    
    description: 'Returns latency and API ping',
    timeout: `10000`,
    category: 'info',
    run: async (client, message, args) => { 
        const msg = await message.channel.send(`${client.emotes.success} | Looking For Ping!`)
        msg.edit(`${client.emotes.success} | WebSocket Ping Is \`${client.ws.ping}Ms\`! | Message Edit Ping Is \`${Math.floor(msg.createdAt - message.createdAt)}Ms\`!`)
    }
}