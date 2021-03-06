const { glob } = require('glob');
const { promisify } = require('util');
const { Client } = require('discord.js');
const mongoose = require('mongoose');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  // Commands
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split('/');
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  });

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // Slash Commands
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);

    if (['MESSAGE', 'USER'].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });

  // mongoose
  const { mongooseConnectionString } = require('../config.json');
  if (!mongooseConnectionString) return;

  const db = mongoose
    .connect(mongooseConnectionString)
    .then(() => console.log('Connected to mongodb'));
};

async function role(action, msg, user, role) {
  try {
    const member = await msg.guild.members.fetch(user.id);
    if (action === 'remove') {
      let type = await msg.guild.roles.cache.get(role);
      await member.roles.remove(type);
    } else if (action === 'add') {
      let type = await msg.guild.roles.cache.get(role);
      await member.roles.add(type);
    }
  } catch (err) {
    console.log(err);
  }
}
