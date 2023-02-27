const {
  SlashCommandBuilder,
  Client,
  CommandInteraction,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
  Colors,
} = require("discord.js");

module.exports = {
  admin: true,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    interaction.showModal(
      new ModalBuilder()
        .setTitle("Create Embed")
        .setCustomId("EmbedSubmit")
        .setComponents(
          ["Title", "Description"].map((r) => {
            return new ActionRowBuilder().addComponents(
              new TextInputBuilder({
                customId: r.toUpperCase(),
                label: r,
                required: true,
                style: TextInputStyle.Paragraph,
                maxLength: 1024,
              })
            );
          })
        )
    );

    interaction
      .awaitModalSubmit({
        time: 60 * 1000 * 2,
      })
      .then((reply) => {
        const title = reply.fields.getTextInputValue("TITLE");
        const description = reply.fields.getTextInputValue("DESCRIPTION");

        reply.reply({
          ephemeral: true,
          content: "Done!",
        });

        interaction.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Blue)
              .setTitle(title)
              .setDescription(description)
              .setThumbnail(interaction.guild.iconURL()),
          ],
        });
      })
      .catch(() => {});
  },
  info: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Embeds a message"),
};
