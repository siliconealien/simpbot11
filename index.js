require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content.startsWith(config.prefix + "s4splay")) {
		message.author.send('`                                `\n`   () o                    |  | `\n`   /\u005C     _  _  _     _    |__|_`\n`  /  \u005C|  / |/ |/ |  |/ \u005C_     | `\n` /(__/|_/  |  |  |_/|__/      | `\n`   () o            /|           `\n`   /\u005C     _  _  _  \u005C| _         `\n`  /  \u005C|  / |/ |/ |  |/ \u005C_       `\n` /(__/|_/  |  |  |_/|__/        `\n`                   /|           `\n`                   \u005C|           `\n\n`version 2.0 ~*~ by siliconealien`\n`& itsthecheat`\n\n*An Interactive Text-Based Jonah Magnus Smut Adventure*\n\n`* N * S * F * W *`\n\n`==============================`\n\n**Welcome to the Magnus Estate!**\n\n`It is the spring of 1824, when you arrive at Jonah Magnus\’s gorgeous 25-room home overlooking an idyllic lake surrounded by wild heather.  The time is the blue hour, and dusk is descending rapidly on the land as diamond stars wink into view.`\n\n`You are at a party as the personal guest of Mr. Magnus himself.  Much to your amazement, he invited you here after you gave your statement of a supernatural occurrence directly to him at his Institute in Edinburgh.  He finds you immediately after you enter, brazenly breaking etiquette by slinging one arm around your shoulder, and hands you a glass of champagne.`\n\n`"Thank you for welcoming me so warmly into your delightful home, Mr. Magnus," you say primly.`\n\n`He leans into your ear, making you shiver when he says, "Please, my dear, you must call me Jonah."  He flashes a sharp smile.  "And the pleasure of having you is all mine, I\’m sure.  Come," he continues, leading you to a lavish ballroom filled with people, "there\’s a group of gentlemen here who I wish for you to meet.”`\n\n`As he says this, you spot a pale, muscular man with near-white hair and a beard.  He stands out to you because he is alone in the crowd, sipping his drink as he peers out a window.`\n\n`* Select` :a: `to enquire about the strange man.`\n`* Select` :b: `to stay with Jonah.`');
	} else if (message.content.startsWith(config.prefix + "beholdme")) {
    message.channel.send('`    _....,_         _,...._    `\n`_.-\' _,..,_\'.     .\'_,..,_ \'-._`\n` _,-\'/ o \u005C \'.     .\' / o \u005C\'-,_ `\n`  \'-.\u005C___/.-\'     \'-.\u005C___/.-\'  `');
  } else if (message.content.startsWith(config.prefix + "nyaa")) {
	  message.channel.send('Hewwo Jon >:3c');
	} else if (message.content.startsWith(config.prefix + "s4shelp")) {
		message.channel.send('Use `!s4splay` to start a game of Simp 4 Simp!\n**My dear Jonah ...**\n(Or, "What does this button do??")\n`!beholdme`\n`!nyaa`');
	} else if (message.content.includes('Jurgen Leitner')) {
	  message.react('714387828913733643');
}
});

client.login(process.env.TOKEN);
