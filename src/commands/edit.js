const {
    Client,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    EmbedBuilder,
    MessageContextMenuCommandInteraction,
    ContextMenuCommandBuilder,
    Colors,
    ApplicationCommandType,
  } = require("discord.js");
module.exports = {
    admin: true,
    /**
     *
     * @param {Client} client
     * @param {MessageContextMenuCommandInteraction} interaction
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
                      value: r == "Title" ? interaction.targetMessage.embeds[0].title : interaction.targetMessage.embeds[0].description,
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

              reply.deferUpdate();
      
              interaction.targetMessage.edit({
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
    info: new ContextMenuCommandBuilder()
        .setName("edit")
        .setType(ApplicationCommandType.Message)
};
