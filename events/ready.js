const client = require('../index');
const {
  MessageActionRow,
  MessageEmbed,
  CommandInteraction,
  MessageButton,
  Interaction,
} = require('discord.js');
// const disbut = require('discord-buttons');
// const { MessageActionRow, MessageButton } = require('discord.js');
// client.on('ready', () => {
//   // const Embed = new MessageEmbed()
//   //     .setFooter(
//   //         {
//   // 			text: "Ticketing System"
//   // 		}
//   //     )
//   //     .setDescription("Open Ticket")
//   //     .setColor("#36393F");
//   // const Buttons = new MessageActionRow();
//   // Buttons.addComponents(
//   //     new MessageButton()
//   //     .setCustomId("Support")
//   //     .setLabel("Support Ticket")
//   //     .setStyle("PRIMARY")
//   //     .setEmoji("🎫")
//   // );
//   // // await guild.channels.cache.get(OPENTICKET).send({emebeds: [Embed], components: [Buttons]})
//   // client.channels.cache.get('904959531241590785').send({embeds: [Embed], components: [Buttons]});
//   console.log(msg.guild.roles.everyone.id);
// });
client.on('ready', async () => {
  // Register for a single guild
  //   await client.guilds.cache
  //     .get('903743840014434365')
  //     .commands.set(arrayOfSlashCommands);
  //   console.log(client.guilds.cache.get('903743840014434365').roles.everyone.id);
  // Register for all the guilds the bot is in
  // await client.application.commands.set(arrayOfSlashCommands);
});
