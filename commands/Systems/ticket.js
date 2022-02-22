const {
  MessageActionRow,
  MessageEmbed,
  CommandInteraction,
  MessageButton,
  Interaction,
} = require('discord.js');
const { OPENTICKET } = require('../../Structures/config.json');

module.exports = {
  name: 'ticket',
  aliases: ['t'],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  permission: 'ADMINISTRATOR',
  run: async (client, interaction) => {
    const { guild } = interaction;

    const Embed = new MessageEmbed()
      .setFooter({
        text: 'Ticketing System',
      })
      .setDescription('Open Ticket')
      .setColor('#36393F');

    const Buttons = new MessageActionRow();

    Buttons.addComponents(
      new MessageButton()
        .setCustomId('Support')
        .setLabel('Support Ticket')
        .setStyle('PRIMARY')
        .setEmoji('🎫')
    );

    await guild.channels.cache
      .get('904959531241590785')
      .send({ embeds: [Embed], components: [Buttons] });

    interaction.reply({ content: 'Done', ephemeral: true });
  },
};
