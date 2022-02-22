const { Message, Client } = require("discord.js")

module.exports = {
    name: "clear",
    aliases: ['c'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      try {
        if(message.member.permissions.has('ADMINISTRATOR')) message.channel.bulkDelete(args[0]);
      } catch (err) {
        console.log(err);
      }
    },
};
