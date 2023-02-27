const { Client } = require("discord.js");

module.exports = {
    name: 'ready',
    /**
     * @param {Client} client 
     */
    run: async (client) => {
        console.log("Logged in as " + client.user.tag);

        client.guilds.cache.forEach(guild => {
            guild.commands.set(client.commands.map(r => {
                return r.info
            }));
        })
    }
}