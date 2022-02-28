const config = require("./config.json");
const Discord = require("discord.js");
const gamedig = require("gamedig");

const client = new Discord.Client();

client.config = config;

var nb = 1000

const updateActivity = async () => {		
	const stats = await gamedig.query({
        type: "garrysmod",
	    host: config.playerCountServerIP,
	    port: config.playerCountServerPort
	});
		
	if (stats.raw.numplayers != nb) {
		client.user.setActivity(`Joueur(s) : ${stats.raw.numplayers}`, { type: 'PLAYING' });
    }
};

client.on("ready", () => {

	console.log("[BOT] Connected to Discord.");
	
	updateActivity();
	setInterval(updateActivity, 60000*0.05);
	
});

client.login(config.token);
