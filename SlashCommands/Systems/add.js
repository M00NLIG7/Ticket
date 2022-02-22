const { MessageEmbed, CommandInteraction } = require('discord.js');
const { description } = require('../../SlashCommands/Systems/add');
const DB = require('../../Structures/Schemas/Ticket');

module.exports = {
  name: 'ticket',
  aliases: ['t'],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  permission: 'ADMINISTRATOR',
  options: [
    {
      name: 'action',
      type: 'STRING',
      description: 'Add or Remove a Member from this ticket ',
      required: true,
      choices: [
        { name: 'Add', value: 'add' },
        { name: 'Remove', value: 'remove' },
      ],
    },
    {
      name: 'member',
      description: 'select a member',
      type: 'USER',
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const { guildId, options, channel } = interaction;
    const Action = options.getString('action');
    const Member = options.getMember('member');

    const Embed = new MessageEmbed();

    switch (Action) {
      case 'add':
        DB.findOne({ GuildID: guildId });
        break;
      case 'remove':
        break;
    }
  },
};
