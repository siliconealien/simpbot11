require('dotenv').config();
const token = process.env.TOKEN;
const fs = require('fs');
const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const { prefix } = require("./config.json");
const { checkServerIdentity } = require('tls');
const story = require("./story/simpforsimp.json")
const _ = require('lodash');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity(`you like a cheap whistle | !sbhelp | simping for ${client.guilds.cache.size} servers`);
});

client.on('message', message => {
	if (message.content === `${prefix}simpguilds`) {
		client.guilds.cache.forEach(guild => {
		  console.log(`${guild.name} | ${guild.id}`);
		})
	}
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
    let targetMember = message.mentions.members.first();
    if(!targetMember) return message.reply('**you must tag a user to nyaa at them!**');
    message.channel.send(`NYAA~ hewwo <@${targetMember.user.id}> >:3c\napowogies fow da rawrception X3`, { files: ["./img/nya.gif"] });
	} else if (message.content.startsWith(`${prefix}sbart`)) {
		message.channel.send("**Bastard man artist credit**\nTwitter: __@WaldosAkimbo__\nTumblr: __waldos-art__", { files: ["./img/jonah.png"] })
	};
});

client.on('message', message => {
		const responses = [
		   'Reach for a book and I *will* kill you.', 'Well, he was always going to need to fly the nest at some point.  Go out and see the world for himself.', 'It\'s always a danger.  Almost always.', '[EXTENDED SOUNDS OF BRUTAL PIPE MURDER]', 'Did it itch, just a little, when you were burying him?', 'Formal qualifications aren\'t everything, Martin.', 'Perhaps doing a bit of mindless filing will help distract you.', 'Could I speak to your Chief Inspector, please?  Tell her Elias Bouchard is calling.  Of the Magnus Institute.', 'He retrieved those bones sadly enough when the time came.  Bones that you can still find in my office, if you know where to look.', 'That\'s ...  That\'s quite nice, actually.  Tingly ... but sort of freeing.', 'Our world is made of choices, Jon, and very rarely do we truly know what any of them mean, but we make them nonetheless.', 'We thrive on ceaseless watching, on knowing too much.  What we face is the hidden, the uncanny, and the unknown.', 'Jon, what does human even mean?  I mean, *really?*  You still bleed, you can still die.  And your will is still your own, mostly.  That\'s more than can be said for a lot of the "real" humans out there.', 'I am sorry, Jon, that my powers have not yet reached the level of omniscience.  And I am sorry that I have to spend so much time trying to help you develop your own faculties, rather than explaining everything to you like a child.', 'Leitner was ... I will admit I possibly ... overreacted to his sudden re-emergence.', 'No, no, no.  No, Jon, this is good.  It\'s a promising development.', 'Melanie is on her way up here with a knife.  Could you talk to her for me?', 'Please stay away from the Unknowing, the Circus, all of it.  I don\'t believe you can help, and I don\'t know what will happen if you get involved.', 'Tell you what, why don\'t you take the rest of the day off?  I\'m sure you have a lot to process.', 'Anyway, aside from all of that, I\'d say your performance has been satisfactory.', 'Oh, that reminds me.  Make sure you keep any receipts for expenses, assuming you wish to claim them back.', 'If you die, I\'m afraid you probably won\'t be able to claim your expenses.', 'Martin.  Martin, open the door.', 'So I assume this is ... what\'s it called.  A cry for attention.', 'It\'s just the sort of half-baked scheme he\'d come up with, and I am well aware that you\'d do just about anything for him.', 'You might want to turn the tape off, Martin.', 'It\'s baffling, really.  Such loyalty to someone who really treats you very badly.', 'You want to know what she sees when she looks at you?', '*Don\'t burn any more statements.*', 'Statement of Elias Bouchard, regarding the dreams of Jonathan Sims, Head Archivist of the Magnus Institute, currently unresponsive.  Details pulled directly from subject.  *Statement begins.*', 'The Archivist does not know where he is, and in many ways that is correct, for to say that he was anywhere would be an error.', 'He tries again to scream, but he hasn\'t got the throat right, and the wheezing, half-choked gurgle that escapes would stir pity in the Archivist, if he had not heard it so many times before.', '*It hurts.*  She is shaking her head, defiant in her well-worn terror, and tries with every corner of her will to force back the rolling tide of words.  *It hurts.*  Her fingers are still, her hands raised to her mind, *trying* to think, *trying* to comprehend.  *It. Hurts.*', 'He. Is. *Whole.*', 'You\'re doing well, Jon.  I only hope you can continue your growth without my guidance.', 'I only have two eyes, after all.', 'Sometimes I\'m eating.', 'He can listen all he wants, but he\'s at a very delicate stage right now, and I fear my *presence* would be a, um, a *distraction.*', 'My relationship to the apocalypse is more ... complicated.', 'I\'ve ... I\'ve always thought that a man\'s eating habits were his own private business.', 'Exactly where they\'ve always been, Martin.  Watching over *my* Institute.', 'Can a man not watch his own death?', 'You\'ve lost, Peter, admit it.  He played you like a ... like a ... cheap whistle.', 'Suffice it to say I called you.', '*My,* you have grown.', 'To go into The Lonely willingly is as good as death.', '*Perfect.*', 'Hello, Jon.  Apologies for the deception, but I wanted to make sure you started reading, so I thought it best not to announce myself.', 'It is an awful thing to know about yourself, but the *freedom,* Jon, the freedom of it all.  I have dedicated my life to handing the world to these Dread Powers all for my own gain, and I feel ... nothing but satisfaction in that choice.', '**I am to be *king* of a ruined world, and I shall never die.**', 'All under The Eye\'s auspices, of course.  *We mustn\'t forget our roots.*', 'Because the thing about the Archivist is that—well, it\'s a bit of a misnomer ...  It might, perhaps, be better named: *The Archive.*', 'It does tickle me, that in this world of would-be occult dynasties and ageless monsters, the Chosen One is simply that—someone I chose.  It\'s not in your blood, or your soul, or your *destiny.*  It\'s just in your own, rotten luck.', 'As it was, it was *just right,* and once again, you came through with *flying colors.*', 'Poor Peter.  He really should have left well enough alone ... or just done what I\'d asked in the first place.', 'How *is* Martin, by the way?  He looks well.  You will keep an eye on him when all this is over, won\'t you?  He\'s earned *that.*', 'You are prepared.  You are ready.  You are *marked.*', 'Don\'t worry, Jon.  You\'ll get used to it here, in the world that we have made.  Now ... repeat after me.', '*You who watch and know and understand none.  You who listen and hear and will not comprehend.  You who wait and drink in all that is not yours by right.*  __**Come to us in your wholeness.**__  __***Come to us in your perfection.***__  *Bring all that is fear and all that is terror and all that is the awful dread that crawls and chokes and blinds and falls and twists and leaves and hides and weaves and burns and hunts and rips and bleeds and* ***dies!  Come to us.  I—OPEN—__THE DOOR__!***', '*—he screams his pitch is low and black as night that flows and chokes his withered throat and hacking cough that sounds like death is here for him who always knew and feared that this indecent end would carve its bitter name full deep inside his soul and burn within without a ceasing seeing moment more than screaming ones who howl and hide from fates that crawl towards on nails that scratch and creak like rotten boards might warn you of your severed pains approach to pull your skin like sodden cloth and drag it tearing from the now that is no longer even close to what the when just might have been if there was time enough to run and hide from r͖̳͍̰͎͂ͣ͂̒͑ả͚̺̰ͧ̚nͦͤ͒̓c̫̝͖͈̞͚̝͐ͬ̽̏̌̅̉id̄͑̉͒ͪͥ ̽d́͛̂ͣ͛͋̐e͎̤̊ͤa͔ͯt̠̬̩̒̇͌h͊s͔̳̹—*', 'So tell me, Elias.  What are you afraid of?', 'In the Institute we are keenly interested in the anatomy of fear.', '**Then *why* did you *heed* the *call?***'
		]
		if (message.content.startsWith(`${prefix}bastard`)) {
		   message.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
		}
});

client.on('message', message => {
  if (message.content === `${prefix}fmk`) {

    let x = [	' Adelard Dekker',
    					' Agnes Montague',
    					' Albrecht von Closen',
    					' Alfred Grifter',
    					' Alice "Daisy" Tonner (bestial)',
    					' Alice "Daisy" Tonner (human)',
    					' Annabelle Cane',
    					' Arthur Nolan',
    					' Barnabas Bennett',
    					' Basira Hussain',
    					' Benjamin Hatendi',
    					' Benoît Maçon',
    					' Breekon & Hope (single answer)',
    					' Daniel Rawlings (Not!Daniel, the taxidermist)',
    					' Danny Stoker',
    					' Diego Molina',
    					' Dr. David',
    					' Dr. Jane Doe',
    					' Dr. Jonathan Fanshawe',
    					' Dr. Lionel Elliott (bone apple teeth)',
    					' Elias Bouchard (Jonah Magnus)',
    					' Elias Bouchard (original)',
    					' Eric Delano',
    					' Evan Lukas',
    					' Father Burroughs',
    					' Fiona Law',
    					' Georgie Barker',
    					' Gerard Keay (alive)',
    					' Gerard Keay (deceased—do you burn the page?)',
    					' Gertrude Robinson',
    					' Graham Folger (original)',
    					' Gregor Orsinov',
    					' Helen (the Distortion)',
    					' Helen Richardson (human)',
    					' Hezekiah Wakely',
    					' Jack Barnabas',
    					' James Wright (Jonah Magnus)',
    					' Jan Kilbride',
    					' Jane Prentiss',
    					' Jared Hopworth',
    					' John Amherst',
    					' Jonah/Elias as the post-Change static-spewing dark entity',
    					' Jonah Magnus (circa 1800s)',
    					' Jonathan Sims (season 1)',
    					' Jonathan Sims (season 2)',
    					' Jonathan Sims (season 3)',
    					' Jonathan Sims (season 4)',
    					' Jonathan Sims (season 5)',
    					' Jordan Kennedy',
    					' Joshua Gillespie',
    					' Jude Perry',
    					' Julia Montauk',
    					' Jurgen Leitner',
    					' Karolina Górka (took a nice nap on the tube)',
    					' Manuela Dominguez',
    					' Martin Blackwood',
    					' Martin\'s mother',
    					' Mary Keay',
    					' Maxwell Rayner (black goo form)',
    					' Maxwell Rayner (human-shaped)',
    					' Melanie King',
    					' Michael (the Distortion)',
    					' Michael Crew',
    					' Michael Shelley (human)',
    					' Mikaele Salesa',
    					' Monster Pig',
    					' Mordechai Lukas',
    					' Natalie Ennis',
    					' Nathaniel Lukas',
    					' Neil Lagorio',
    					' Not!Graham Folger',
    					' Not!Sasha',
    					' Oliver Banks',
    					' Peter Lukas',
    					' Raymond Fielding',
    					' Robert Montauk',
    					' Robert Smirke',
    					' Rosie Zampano',
    					' Sarah Baldwin (Not!Sarah)',
    					' Sasha James (original)',
    					' Sebastian Skinner (unobservant plumber)',
    					' Sergey Ushanka (post-uploading)',
    					' Simon Fairchild',
    					' Stranger!Danny',
    					' Stranger!Tim',
    					' Timothy Stoker',
    					' Toby Carlisle',
    					' "Tom" (Not!Sasha\'s totally real boyfriend)',
    					' Tom Haan',
    					' Trevor Herbert',
    					' Zhang Xiaoling',
    					' a wholeass Lukas family gangbang',
    					' the Anatomy Class',
    					' the Angler Fish'];

    let result = _.sampleSize(x, 3);

  	message.channel.send(`**Fuck, Marry, Kill:**${result}`);
  }
});

client.on('message', message => {
  if (message.content === `${prefix}sbgive`) {
    const embed = new MessageEmbed()
		.setColor('#32cd32')
		.setTitle('Charities Simp-bot simps for')
		.setDescription('Hosting a bot is not free.\n\nBut instead of giving us money, why don\'t you check out a few of our favorite causes?')
		.addFields(
			{ name: 'International Dark-Sky Association', value: '[darksky.org](https://www.darksky.org/)', inline: true },
			{ name: 'Save Our Cemeteries', value: '[saveourcemeteries.org](https://www.saveourcemeteries.org/)', inline: true },
		)
		.addField('Organization for Transformative Works', '[transformativeworks.org](https://www.transformativeworks.org)', true)
		.setTimestamp()
		.setFooter('Thank you for all your support!', 'https://i.imgur.com/jySxwK6.png');
    message.channel.send(embed);
  }
});

client.on('message', async message => {
  if (!message.guild) return;
  if (message.content === `${prefix}big`) {
  if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const dispatcher = connection.play('bigboy.mp3');
      dispatcher.on('finish', () => message.member.voice.channel.leave());
    } else {
      message.reply('you need to join a voice channel first!');
    }
  }
});

client.on('message', message => {
  if (message.content === `${prefix}sbserver`) {
    const embed = new MessageEmbed()
		.setColor('#32cd32')
		.setTitle('Simp-bot Discord')
    .setURL('https://discord.gg/uNtymmvXCd')
		.setDescription('You found a secret command to unlock a problematic server invite!');
    message.channel.send(embed);
  }
});

client.login(process.env.TOKEN);
