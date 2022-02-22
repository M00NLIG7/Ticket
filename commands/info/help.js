const { Message, Client } = require("discord.js")

module.exports = {
    name: "help",
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send({
            embeds: [{
                color: 'ORANGE',
                author: { name: 'Help pannel' },
                footer: { text: 'Made by M00NL1G7' },
                fields: [
                    { name: 'Bot', value: '`ping`' },
                    { name: 'Bot Maker', value: '`play`, `pause`, `resume`, `queue`, `clear-queue`, `shuffle`, `np`, `loop`, `volume`, `skip`, `stop`' },
                ],
                timestamp: new Date(),
                description: `Help`,
            }],
        });
    },
};
