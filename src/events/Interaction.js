const { Client, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    /**
     * @param {Client} client 
     * @param {import("discord.js").Interaction} interaction 
     */
    run: async (client, interaction) => {
        if (interaction.isCommand()) {
            const cmd = client.commands.get(interaction.commandName);

            if (cmd?.admin && !interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                return interaction.reply({
                    ephemeral: true,
                    content: "Only members with the administrator permission can perform this action or command :x:"
                });
            }

            cmd?.run(client, interaction);
        }
    }
}