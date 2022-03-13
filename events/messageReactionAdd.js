const client = require('../index');
const id = {
  roles: {
    redTeam: '903745186188910652',
    teamOne: '903746124999954453',
    teamTwo: '903746275084730388',
    teamThree: '903746333578526731',
    teamFour: '903746382412775484',
    teamFive: '903746428092956693',
    teamSix: '903746460447834143',
    teamSeven: '903746496816615454',
    teamEight: '903746529058226226',
    teamNine: '903746559571787796',
    teamTen: '903746591435943966',
    orangeTeam: '903747864855994440',
    whiteTeam: '903747942811320380',
  },
  channels: {
    ticket: '904959531241590785',
  },
  categories: {
    ticket: '904946009963106304',
    selector: '903743840014434366',
  },
};

const roleEmojis = {
  '⚪': id.roles.whiteTeam,
  '🔴': id.roles.redTeam,
  '🟠': id.roles.orangeTeam,
  '1️⃣': id.roles.teamOne,
  '2️⃣': id.roles.teamTwo,
  '3️⃣': id.roles.teamThree,
  '4️⃣': id.roles.teamFour,
  '5️⃣': id.roles.teamFive,
  '6️⃣': id.roles.teamSix,
  '7️⃣': id.roles.teamSeven,
  '8️⃣': id.roles.teamEight,
  '9️⃣': id.roles.teamNine,
  '🔟': id.roles.teamTen,
};

client.on('messageReactionAdd', async (reaction, user) => {
  try {
    const message = !reaction.message.author
      ? await reaction.message.fetch()
      : reaction.message;

    // returns if the reaction is from the bot
    if (message.author.id === user.id) return;

    // returns if the reaction is not in specified channel or categorey
    // if (
    //   ![id.categories.ticket, id.categories.selector].includes(
    //     reaction.message.channel.parentID
    //   )
    // )
    //   return;

    // Fetches user who reacted
    const member = await reaction.message.guild.members.fetch(user.id);

    if (reaction.emoji.name in roleEmojis) {
      console.log('HHHJHJHJHJ');
      await uniqueRole(
        'add',
        reaction.message,
        user,
        roleEmojis[reaction.emoji.name]
      );
    }
    // Deletes reaction if the emoji us not one of the character role emojis
    // if (
    //   reaction.emoji.name != "⚔️" &&
    //   reaction.emoji.name != "🛡" &&
    //   reaction.emoji.name != "👼"
    // )
    //   reaction.users.remove(user.id);
  } catch (err) {
    console.log(err);
  }
});

async function uniqueRole(action, msg, user, roleID) {
  let roles = [
    id.roles.whiteTeam,
    id.roles.redTeam,
    id.roles.orangeTeam,
    id.roles.teamOne,
    id.roles.teamTwo,
    id.roles.teamThree,
    id.roles.teamFour,
    id.roles.teamFive,
    id.roles.teamSix,
    id.roles.teamSeven,
    id.roles.teamEight,
    id.roles.teamNine,
    id.roles.teamTen,
  ];

  roles.splice(roles.indexOf(roleID), 1);

  const member = await msg.guild.members.fetch(user.id);

  let hasNoRole = true;
  roles.forEach((r) => {
    if (member.roles.cache.has(r)) {
      hasNoRole = false;
      console.log('Has role');
    }
  });

  if (hasNoRole) {
    await role('add', msg, user, roleID);
    console.log('Giving role');
  }
}

// role() - ADDS or REMOVES given role to/from a specific user
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
