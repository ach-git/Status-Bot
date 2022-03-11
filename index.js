const config = require("./config.json");
const Discord = require("discord.js");
const gamedig = require("gamedig");
const client = new Discord.Client();

client.config = config;

client.on("ready", () => {

	console.log("[BOT] Connected to Discord.");
	
	setInterval(() => {
            gamedig.query({
		type: "garrysmod",
	    	host: config.playerCountServerIP,
	    	port: config.playerCountServerPort
	}).then((state) => {							 
		client.user.setActivity(`Joueur(s): ${state.players.length}/${state.maxplayers}`, {type: "PLAYING"});
	}).catch((error) => {
		client.user.setActivity(`:x: Serveur Hors-Ligne`, {type: "PLAYING"});
        });
      }, 15000); 	
});

client.login(config.token);
