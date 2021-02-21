const story = require("../story/simpforsimp.json");
let jsoning = require('jsoning');
let database = new jsoning("../../../database/simpforsimp.json");

module.exports = {
    name: 's4splay',
    description: 's4splay',
    execute: async function(message, args) {
        let description = "`                                `\n`   () o                    |  | `\n`   /\u005C     _  _  _     _    |__|_`\n`  /  \u005C|  / |/ |/ |  |/ \u005C_     | `\n` /(__/|_/  |  |  |_/|__/      | `\n`   () o            /|           `\n`   /\u005C     _  _  _  \u005C| _         `\n`  /  \u005C|  / |/ |/ |  |/ \u005C_       `\n` /(__/|_/  |  |  |_/|__/        `\n`                   /|           `\n`                   \u005C|           `\n\n`Version 2.0`\n`by SiliconeAlien`\n`& ItsTheCheat`\n\n*An Interactive Text-Based Jonah Magnus Smut Adventure*\n\n`* N * S * F * W *`\n\n`==============================`\n\n\n Pick 🅰️ to start over or pick 🅱️ to continue from where you've left."
        const msg = await message.author.send(description).catch(() => console.log("User has DMs off"))
        const emojis = ['🅰️', '🅱️']
        for (const emoji of emojis) msg.react(emoji)


                    msg.awaitReactions(  (reaction , user) => !user.bot && (reaction.emoji.name == '🅰️' || reaction.emoji.name == '🅱️'),
                            { max: 1, time: 300000 }).then(async collected => {

                            	var where = await database.get(message.author.id);

                                    if (collected.first().emoji.name == '🅰️') {
                                            playstory("beginning" , msg, message.author.id) 
                                    }
                                    else if (collected.first().emoji.name == '🅱️' && where) { 
                                            playstory( where , msg, message.author.id )
                                    }
                                    else {
                                    	playstory("beginning" , msg, message.author.id)
                                    }
                            }).catch((err) => { x = message.author; console.log(err)
                                    if(err.toString().match("time"))
                                    	x.send('No reaction after 5 minutes, operation canceled');
                                    else {
                                    	x.send(err)
                                    }
                            });

    },
};



async function playstory(name , message, id){

	var n;

	switch (name) {
		case "x00mordechaiintro": n = story.x00mordechaiintro; break;
		case "mllonelystart": n = story.mllonelystart; break;
		case "mlrescued": n = story.mlrescued; break;
		case "x00barnabasintro": n = story.x00barnabasintro; break;
		case "bbaskaboutparty": n = story.bbaskaboutparty; break;
		case "bbseduce": n = story.bbseduce; break;
		case "bbwatch": n = story.bbwatch; break;
		case "x00fanshaweintro": n = story.x00fanshaweintro; break;
		case "jfquestionsstart": n = story.jfquestionsstart; break;
		case "jflightenup": n = story.jflightenup; break;
		case "jfseduce": n = story.jfseduce; break;
		case "jfcaughtbyjonah": n = story.jfcaughtbyjonah; break;
		case "jmapologizeforjon": n = story.jmapologizeforjon; break;
		case "jfmatchmaker": n = story.jfmatchmaker; break;
		case "jfgiveprivacy": n = story.jfgiveprivacy; break;
		case "jmsupernatural": n = story.jmsupernatural; break;
		case "x00jonahintro": n = story.x00jonahintro; break;
		case "mlmarry": n = story.mlmarry; break;
		case "mlkillsyou": n = story.mlkillsyou; break;
		case "bbjonahbas": n = story.bbjonahbas; break;
		case "bbjonahwatches": n = story.bbjonahwatches; break;
		case "jmarchivist": n = story.jmarchivist; break;
		case "jmkillsyou": n = story.jmkillsyou; break;
		case "jfdemandanswers": n = story.jfdemandanswers; break;
		case "jmbalcony": n = story.jmbalcony; break;
		case "jmmagshawe": n = story.jmmagshawe; break;
		case "jfbarnshawe": n = story.jfbarnshawe; break;
		default : n = story.beginning; break;
	}



	var msg = await message.channel.send(n.text);

	if (n.text == "end")
		return;

	        const emojis = ['🅰️', '🅱️']
        for (const emoji of emojis) msg.react(emoji)

	 msg.awaitReactions((reaction , user) => !user.bot && (reaction.emoji.name == '🅰️' || reaction.emoji.name == '🅱️'),
                            { max: 1, time: 300000 }).then(collected => {

                                    if (collected.first().emoji.name == '🅰️') {
                                            playstory(n.optionA , msg, id);
                                            database.set(id , n.optionA);
                                            
                                    }
                                    else if (collected.first().emoji.name == '🅱️') {
                                            playstory(n.optionB , msg, id);
                                            database.set(id , n.optionB);
                                            
                                    }

                            }).catch((err) => { var x = msg.client.users.cache.get(id)

                                    	x.send('No reaction after 5 minutes, operation canceled');

                            });

}