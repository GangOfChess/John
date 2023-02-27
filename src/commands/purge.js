const { Client, CommandInteraction, SlashCommandBuilder } = require("discord.js")

module.exports = {
    admin: true,
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        interaction.channel.bulkDelete(interaction.options.get("amount", true).value)
        .then(() => {
            interaction.reply({
                ephemeral: true,
                content: "Deleted messages :white_check_mark:"
            })
        })
        .catch(err => {
            interaction.reply({
                ephemeral: true,
                content: "Failed to delete :x:"
            })
        })
    },
    info: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purges a channel of messages")
    .addIntegerOption(r => r.setName("amount").setDescription("Amount of messages to purge").setRequired(true))
}