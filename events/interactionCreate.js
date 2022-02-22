const client = require('../index');
const {
  ButtonInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Interaction,
} = require('discord.js');
// const Math = require(Math);
const { createTranscript } = require('discord-html-transcripts');
const DB = require('../Structures/Schemas/Ticket');
const { ParentID, EveryoneID } = require('../Structures/config.json');
const { channels } = require('../index');
// const { execute } = require('../interactionCreate');

client.on('interactionCreate', async (interaction) => {
  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: 'An error has occured ' });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === 'SUB_COMMAND') {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    cmd.run(client, interaction, args);
  }

  // Context Menu Handling
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }

  if (interaction.isButton()) {
    const { guild, member, customId, channel } = interaction;
    // if (!['Support', 'Close', 'Lock', 'Unlock'].includes(customId)) return;
    if (['Close', 'Lock', 'Unlock'].includes(customId)) {
      const Embed = new MessageEmbed().setColor('BLUE');
      DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
        if (err) throw err;
        if (!docs)
          return interaction.reply({
            content: 'No data was found related to this ticket',
            ephemeral: true,
          });
        switch (customId) {
          case 'Lock':
            if (docs.Locked)
              return interaction.reply({
                content: 'The ticket is already locked',
                ephemeral: true,
              });
            await DB.updateOne({ ChannelID: channel.id }, { Locked: true });
            Embed.setDescription('This ticket is now locked for review');
            channel.permissionOverwrites.edit(docs.MemberID, {
              SEND_MESSAGES: false,
            });
            interaction.reply({ embeds: [Embed] });
            break;
          case 'Unlock':
            if (docs.Locked == false)
              return interaction.reply({
                content: 'The ticket is already unlocked',
                ephemeral: true,
              });
            await DB.updateOne({ ChannelID: channel.id }, { Locked: false });
            Embed.setDescription('This ticket is now unlocked');
            channel.permissionOverwrites.edit(docs.MemberID, {
              SEND_MESSAGES: true,
            });
            interaction.reply({ embeds: [Embed] });
            break;
          case 'Close':
            if (docs.Closed)
              return interaction.reply({
                content:
                  'Ticket is already closed, please wait for it to get deleted',
                ephemeral: true,
              });
            const attatchment = await createTranscript(channel, {
              limit: -1,
              returnBuffer: false,
              fileName: `${docs.Type} - ${docs.TicketID}.html`,
            });
            await DB.updateOne({ ChannelID: channel.id }, { Closed: true });

            const MEMBER = guild.members.cache.get(docs.MemberID);

            const Message = await guild.channels.cache
              .get('943246557619298314')
              .send({
                embeds: [
                  Embed.setFooter({
                    text: MEMBER.user.tag,
                    iconURL: MEMBER.user.displayAvatarURL({ dynamic: true }),
                  }).setTitle(
                    `Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`
                  ),
                ],
                files: [attatchment],
              });

            interaction.reply({
              embeds: [
                Embed.setDescription(
                  `The transcript is now saved [TRANSCRIPT](${Message.url})`
                ),
              ],
            });

            setTimeout(() => {
              channel.delete();
            }, 10000);
            break;
        }
      });
    } else {
      handleSelection(guild, member, customId, interaction);
    }
  }
});

async function handleSelection(guild, member, customId, interaction) {
  const ID = Math.floor(Math.random() * 90000) + 10000;
  await guild.channels
    .create(`${member.user.username + '-' + ID}`, {
      type: 'GUILD_TEXT',
      parent: ParentID,
      permissionOverwrites: [
        {
          id: member.id,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
        },
        {
          id: '903743840014434365',
          deny: ['VIEW_CHANNEL'],
        },
      ],
    })
    .then(async (channel) => {
      await DB.create({
        GuildID: guild.id,
        Username: member.user.username,
        MemberID: member.id,
        TicketID: ID,
        ChannelID: channel.id,
        Closed: false,
        Locked: false,
        Type: customId,
      }).then(() => {
        console.log('New doc created');
      });

      const Embed = new MessageEmbed()
        .setFooter({
          text: guild.name,
          iconURL: guild.iconURL({ dynamic: true }),
        })
        .setDescription('Please wait for an assistant');

      const Buttons = new MessageActionRow();
      Buttons.addComponents(
        new MessageButton()
          .setCustomId('Close')
          .setLabel('Save & Close Ticket')
          .setStyle('PRIMARY')
          .setEmoji('❌'),
        new MessageButton()
          .setCustomId('Lock')
          .setLabel('Lock Ticket')
          .setStyle('PRIMARY')
          .setEmoji('🔒'),
        new MessageButton()
          .setCustomId('Unlock')
          .setLabel('Unlock Ticket')
          .setStyle('PRIMARY')
          .setEmoji('🔓')
      );

      channel.send({
        embeds: [Embed],
        components: [Buttons],
      });

      await channel
        .send({ content: `${member} here is your ticket` })
        .then((msg) => {
          setTimeout(() => {
            try {
              msg.delete();
            } catch (err) {
              console.log(err);
            }
          }, 5000);
        });
      await interaction.reply({
        content: `${member} your ticket has been created: ${channel}`,
      })

      let interaction_channel = client.channels.cache.get('904959531241590785');

      interaction_channel.messages
        .fetch({ limit: 1 })
        .then((messages) => {
          let lastMessage = messages.first()
          setTimeout(() => lastMessage.delete(), 5000);
          // console.log(lastMessage)
        }).catch(console.error);
    });
}
// const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

// module.exports = {
//     name: "interactionCreate",
//      /**
//      * @param {Client} client
//      * @param {CommandInteraction} interaction
//      */
//     async execute(client, interaction) {
//         if (interaction.isCommand()) {
//             const command = client.commands.get(interaction.commandName);

//             if (!command) return interaction.reply({embeds: [
//                 new MessageEmbed()
//                 .setDescription("⛔ An error occured while trying to execute this command.")
//                 .setColor("RED")
//             ]}) && client.commands.delete(interaction.commandName);

//             command.execute(client, interaction);
//         }
//     }
// }
