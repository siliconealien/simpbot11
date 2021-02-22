const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require("./config.json");
const { checkServerIdentity } = require('tls');
const story = require("./story/simpforsimp.json")

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
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
		console.log(args)
	} catch (error) {
		console.error(error);
		message.reply('Error!');
	}
});

client.on('message', message => {
	if (message.content.startsWith(`${prefix}nyaa`)) {
		message.channel.send('Hewwo Jon >:3c');
	} else if (message.content.includes('Jurgen Leitner')) {
		message.react('714387828913733643');
	} else if (message.content.includes('jurgen leitner')) {
		message.react('714387828913733643');
	} else if (message.content.startsWith(`${prefix}sbicon`)) {
		message.channel.send("**Bastard man artist cred**\nTwitter: __@WaldosAkimbo__\nTumblr: __waldos-art__", { files: ["./img/jonah.png"] })
	};
});

client.login(process.env.TOKEN);
