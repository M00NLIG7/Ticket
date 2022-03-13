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

client.on('messageReactionRemove', async (reaction, user) => {
  try {
    // Fetches all reactions from all messages
    const message = !reaction.message.author
      ? await reaction.message.fetch()
      : reaction.message;

    // returns if the reaction is from the bot
    if (message.author.id === user.id) return;
    // returns if the reaction is not in specified channel or category
    // if (reaction.message.channel.parentID != id.categories.selector) return;

    if (reaction.emoji.name in roleEmojis) {
      await role(
        'remove',
        reaction.message,
        user,
        roleEmojis[reaction.emoji.name]
      );
    }
  } catch (err) {
    console.log(err);
  }
});

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
