const config = require("./config.json");
const { Client, GatewayIntentBits, ActivityType, Events } = require("discord.js");
const { GameDig } = require("gamedig");
require("dotenv").config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds
	]
});

client.config = config;

async function updateStatus() {
	try {
		const state = await GameDig.query({
			type: config.playerCountServerGame,
			host: config.playerCountServerIP,
			port: config.playerCountServerPort
		});
		client.user.setActivity(`Joueur(s): ${state.players.length}/${state.maxplayers}`, {
			type: ActivityType.Playing
		});
	} catch (error) {
		console.error("[GAMEDIG]", error.message);
		client.user.setActivity("Serveur Hors-Ligne", {
			type: ActivityType.Playing
		});
	}
}

client.once(Events.ClientReady, () => {
	console.log(`[BOT] Connecté en tant que ${client.user.tag}`);
	updateStatus();
	setInterval(updateStatus, 15000);
});

client.login(process.env.DISCORD_TOKEN);