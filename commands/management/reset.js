const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'reset',
  aliases: ['r'],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, msg, args) => {
    msg.delete();
    if (!msg.member.permissions.has('ADMINISTRATOR')) return;

    const roleChannelID = '903743840014434367';

    embed = new MessageEmbed();
    const Embed = new MessageEmbed()
      .setFooter({
        text: 'Roles System',
      })
      .setTitle('React with one of the emojis to get your role')
      .setColor('BLUE')
      .setDescription(
        '🔴 - Red Team\n 🟠 - Orange Team\n 1️⃣ - Blue Team 1\n 2️⃣ - Blue Team 2\n \
		3️⃣ - Blue Team 3\n 4️⃣ - Blue Team 4\n 5️⃣ - Blue Team 5\n 6️⃣ - Blue Team 6\n \
		7️⃣ - Blue Team 7\n 8️⃣ - Blue Team 8\n 9️⃣ - Blue Team 9\n 🔟 - Blue Team 10\n'
      );

    try {
      const channel = await client.channels.cache.get(roleChannelID);

      const ticketHandler = await channel.send({ embeds: [Embed] });
      await ticketHandler.react('🔴');
      await ticketHandler.react('🟠');
      await ticketHandler.react('1️⃣');
      await ticketHandler.react('2️⃣');
      await ticketHandler.react('3️⃣');
      await ticketHandler.react('4️⃣');
      await ticketHandler.react('5️⃣');
      await ticketHandler.react('6️⃣');
      await ticketHandler.react('7️⃣');
      await ticketHandler.react('8️⃣');
      await ticketHandler.react('9️⃣');
      await ticketHandler.react('🔟');
    } catch (err) {
      console.log(err);
    }
  },
};
