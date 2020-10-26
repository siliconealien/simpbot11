require('dotenv').config()
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require("./config.json");
const { checkServerIdentity } = require('tls');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command)
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('you like a cheap whistle - !sbhelp');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	
	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args);
		console.log(command)
	} catch (error) {
		console.error(error);
		message.reply('Error!');
	}
});

// client.on('message', message => {
// 	if (message.content.startsWith(`${prefix}s4splay`)) {
// 		client.commands.get()
// 	} else if (message.content.startsWith(`${prefix}beholdme`)) {
//     message.channel.send('`    _....,_         _,...._    `\n`_.-\' _,..,_\'.     .\'_,..,_ \'-._`\n` _,-\'/ o \u005C \'.     .\' / o \u005C\'-,_ `\n`  \'-.\u005C___/.-\'     \'-.\u005C___/.-\'  `');
//   } else if (message.content.startsWith(`${prefix}nyaa`)) {
// 	  message.channel.send('Hewwo Jon >:3c');
// 	} else if (message.content.startsWith(`${prefix}sbhelp`)) {
// 		message.channel.send('Use `!s4splay` to start a game of Simp 4 Simp!\n\n**My dear Jonah ...**\n(Or, "What does this button do??")\n`!beholdme`\n`!nyaa`\n`!pipeme`\n\n`!sbfaq` - more info\n`!sbicon` - icon artist credit\n\n:eye: *Please follow @simpbot11 on Twitter!* :eye:');
// 	} else if (message.content.startsWith(`${prefix}sbfaq`)) {
// 		message.channel.send('Simp-bot\nVersion 2.0\n\n**What is this?**\nSimp-bot is a Discord bot for fans of The Magnus Archives (podcast)!  2.0 is the first version to be available 24/7 in any server that invites him!  Its primary purpose is to host Simp 4 Simp, a NSFW interactive text-based adventure game where you play a party guest at the Magnus Estate in 1824.\n\n**Will I get shot down if I try to seduce [x character]?  That doesn\'t sound like a good time to me :/**\nIf you try to seduce a character in the game, you will always succeed.  Also, the game is not points-based, so just explore however you see fit!  There are ways to die, though.  Because it\'s TMA.\n\n**Who\'s responsible for this?**\nThe bot was conceived and designed by siliconealien, and most of the dev work (or teaching Alien how to program) was done by itsthecheat.\n\n:eye: *Please follow @simpbot11 on Twitter!* :eye:\n\n-siliconealien (siliconealien#6767)\n-itsthecheat (whats_her_face#4335)');
// 	} else if (message.content.includes('Jurgen Leitner')) {
// 	  message.react('714387828913733643');
// 	} else if (message.content.includes('jurgen leitner')) {
// 		message.react('714387828913733643');
// }
// });

// client.on('message', message => {
// 	if (message.content.startsWith (`${prefix}pipeme`)) {
// 	message.channel.send ("You want the pipe?", {files: ["./img/pipe.jpg"]})
// }
// });

// client.on('message', message => {
// 	if (message.content.startsWith (`${prefix}sbicon`)) {
// 	message.channel.send ("**Bastard man artist cred**\nTwitter: __@WaldosAkimbo__\nTumblr: __waldos-art__", {files: ["./img/jonah.png"]})
// }
// });

client.login(process.env.TOKEN);
