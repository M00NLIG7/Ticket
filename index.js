// ALTER TABLE Customers ADD ID Int(255);
const { Client, Collection, MessageEmbed, Intents } = require("discord.js");
const fs = require("fs");

const client = new Client({
    intents: 32767,
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./Structures/config.json");

require('./Structures/Handlers')(client);

client.login(client.config.token);

// vRoEu48SysspHZ6f